"use strict";

import WebSocket from 'ws';
import { URL } from 'url';
import {
    Client,
    Message
} from '@stomp/stompjs';
import {
    PxService,
    ServiceError
} from './service';

export default class Srv extends PxService {
    constructor(owner) {
        super(owner);
        this.service = "com.cisco.ise.pubsub";
        this.logger = owner.getLogger('pxgrid:service:pubsub');
        this.subscribtions = [];
    }

    connect = async () => {
        this.logger.debug('Connecting to PubSub');
        await this.checkNodes();

        for (const node of this.nodes) {
            this.logger.debug(`About to try node ${node.node_name}`);
            if (!node.properties.hasOwnProperty('wsUrl')) {
                this.logger.warn(`Node ${node.node_name} of ${node.service} doesn't have wsUrl property`);
                continue;
            }

            let url = new URL(node.properties['wsUrl']);
            let httpsOptions = this.owner.sslOptions(url);
            let host = utl.hostname;
            url.hostname = await this.owner.getNodeIp(url);
            let creds = this.owner.credentials();

            try {
                this.logger.debug(`Trying node ${node.node_name} on url '${url.href} with creds ${JSON.stringify(creds)}`);
                this.client = await this._tryConnection({
                    url: url.href,
                    login: creds.username,
                    passcode: creds.password,
                    host,
                    httpsOptions,
                });
            } catch (e) {
                continue;
            }

            this.client.onStompError = (frame) => this.onStompError(frame);
            this.client.onWebSocketError = (event) => this.onWebSocketError(event);
        }
    }

    _tryConnection = (options = {}) => {
        return new Promise((resolve, reject) => { 
            client = new Client({
                connectHeaders: {
                    login: options.login,
                    passcode: options.password,
                    host: options.host
                },
                debug: (str) => {
                    this.logger.debug(str);
                },
                forceBinaryWSFrames: true,
                reconnectDelay: 0,
                heartbeatIncoming: typeof options.heartbeatIncoming !== 'undefined' ? options.heartbeatIncoming : 4000,
                heartbeatOutgoing: typeof options.heartbeatOutgoing !== 'undefined' ? options.heartbeatOutgoing : 4000,
                webSocketFactory: () => {
                    return new WebSocket(
                        options.url,
                        Object.assign(
                            {
                                timeout: typeof options.timeout !== 'undefined' ? options.timeout : 30000,
                            },
                            options.httpsOptions
                        )
                    );
                }
            });

            client.onConnect = (frame) => {
                resolve(client);
            };

            client.onStompError = (frame) => {
                this.logger.error('Broker reported error: ' + frame.headers['message']);
                this.logger.debug('Additional details: ' + frame.body);
                reject();
            };

            client.onWebSocketError = (event) => {
                this.logger.error('WebSocket error: ' + JSON.stringify(event));
                reject(event);
            }
        })
    }

    _reSubscribe = () => {
        this.subscribtions.forEach(s => this.subscribe(s.topic));
    }

    unsubscribe = (topic) => {
        this.logger.debug(`Unsubscribe from ${topic}`);
        let idx = this.subscribtions.findIndex(v => v.topic === topic);
        if (idx < 0) {
            return;
        }
        if (!this.subscribtions[idx].hasOwnProperty('subscription')) {
            return;
        }
        this.subscribtions[idx].subscription.unsubscribe();
    }

    subscribe = (topic, cb) => {
        this.logger.debug(`Subscribing for ${topic}`);
        let idx = this.subscribtions.findIndex(v => v.topic === topic);
        if (idx < 0) {
            this.subscribtions.push({ topic });
            idx = this.subscribtions.length - 1;
        }

        this.subscribtions[idx].subscription = this.client.subscribe(s.topic, message => {
            this.logger.debug(`Got STOMP message on ${topic}: ${JSON.stringify(message)}`);
            this.emit('stompMessage', s, message);
            if (typeof cb === 'function') { cb(message); }
        });
    }

    onStompError = (frame) => {
        this.logger.error('Broker reported error: ' + frame.headers['message']);
        this.logger.debug('Additional details: ' + frame.body);
    }

    onWebSocketError = (event) => {
        this.logger.error('WebSocket error: ' + JSON.stringify(event));
        // TODO: reconnect here
    }
}