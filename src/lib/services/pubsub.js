"use strict";

import WebSocket from 'ws';
import { URL } from 'url';
import { Client } from '@stomp/stompjs';
import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor(owner) {
        super(owner);
        this.service = "com.cisco.ise.pubsub";
        this.logger = owner.getLogger('pxgrid:service:pubsub');
        this.subscribtions = [];
        this.node = '';
    }

    connect = async (node = -1) => {
        if (this.client && this.client.connected) { return true; }

        this.logger.debug('Connecting to PubSub');
        await this.checkNodes();

        let ns = this.nodes.node(node);
        this.logger.debug(`Nodes: ${JSON.stringify(ns)}`);

        if (!Array.isArray(ns)) {
            ns = [ns];
        }

        for (const node of ns) {
            this.logger.debug(`About to try node ${node.node_name}`);
            if (!node.properties.hasOwnProperty('wsUrl')) {
                this.logger.warn(`Node ${node.node_name} of ${node.service} doesn't have wsUrl property`);
                continue;
            }

            let url = new URL(node.properties['wsUrl']);
            let httpsOptions = this.owner.sslOptions(url);
            let host = url.hostname;
            url.hostname = await this.owner.getNodeIp(url);
            let creds = this.owner.credentials();

            if (!node.secret) {
                await this.secret(node);
            }

            creds = { ...creds, password: node.secret };
            url.username = creds.username;
            url.password = creds.password;

            try {
                this.logger.debug(`Trying node ${node.node_name} on url '${url.href} with creds ${JSON.stringify(creds)}`);
                this.client = await this._tryConnection({
                    url: url.href,
                    login: creds.username,
                    passcode: '',//creds.password,
                    host,
                    httpsOptions,
                });
            } catch (e) {
                console.log(e)
                continue;
            }

            this.client.onStompError = (frame) => {
                if (typeof this.onStompError === 'function') { this.onStompError(frame); }
            };
            this.client.onWebSocketError = (event) => {
                if (typeof this.onWebSocketError === 'function') { this.onWebSocketError(event); }
            };
            this.client.onWebSocketClose = (event) => {
                this.subscribtions = [];
                this.node = null;
                this.logger.info(`WebSocket closed with code ${event.code} and reason "${event.reason}"`);
                if (typeof this.onWebSocketClose === 'function') { this.onWebSocketClose(event); }
            };

            this.logger.info(`WebSocket connected to ${node.node_name} with STOPM ${this.client.connectedVersion}`);
            this.node = node;
            return true;
        }

        throw new ServiceError('PUBSUB_UNAVAIL', "PubSub service appears to be unavailable");
    }

    get connectionInfo() {
        const result = { connected: false, to: '' };
        if (this.client && this.client.connected) {
            result.connected = true;
            result.to = this.node.node_name;
        }
        return result;
    }

    disconnect = async () => {
        if (this.client && this.client.connected) {
            if (this.subscribtions.length) {
                await Promise.all(this.subscribtions.map(async s => await s.subscription.unsubscribe()));
                this.subscribtions = [];
            }
            this.client.deactivate();
        }
        return;
    }

    _tryConnection = (options = {}) => {
        return new Promise((resolve, reject) => {
            const client = new Client({
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
                        {
                            timeout: typeof options.timeout !== 'undefined' ? options.timeout : 10000,
                            ...options.httpsOptions
                        }
                    );
                },
                onConnect: (frame) => {
                    this.logger.debug('WebSocket connected');
                    resolve(client);
                },
                onStompError: (frame) => {
                    this.logger.error('Broker reported error: ' + frame.headers['message']);
                    this.logger.debug('Additional details: ' + frame.body);
                    reject();
                },
                onWebSocketError: (event) => {
                    this.logger.error('WebSocket error: ' + JSON.stringify(event));
                    reject(event);
                },
            });

            client.activate();
        })
    }

    _reSubscribe = () => {
        this.subscribtions.forEach(s => this.subscribe(s.topic));
    }

    unsubscribe = async (topic) => {
        await this.connect();

        this.logger.debug(`Unsubscribe from ${topic}`);
        let idx = this.subscribtions.findIndex(v => v.topic === topic);
        if (idx < 0) {
            return;
        }
        if (!this.subscribtions[idx].hasOwnProperty('subscription')) {
            return;
        }
        this.subscribtions[idx].subscription.unsubscribe();
        this.logger.info(`Unsubscribed from ${topic}`);
    }

    subscribe = async (topic, cb) => {
        await this.connect();

        this.logger.debug(`Subscribing for ${topic}`);
        let idx = this.subscribtions.findIndex(v => v.topic === topic);
        if (idx < 0) {
            this.subscribtions.push({ topic });
            idx = this.subscribtions.length - 1;
        }

        this.subscribtions[idx].subscription = this.client.subscribe(topic, message => {
            this.logger.debug(`Got STOMP message on ${topic}: ${JSON.stringify(message)}`);
            this.logger.debug(`Body: ${JSON.stringify(message.body)}`);
            this.emit('stompMessage', topic, message);
            if (typeof cb === 'function') { cb(message); }
        });

        this.logger.info(`Subscribed for ${topic}`);
        return true;
    }

    publish = async (topic, body, headers = undefined) => {
        await this.connect();

        this.logger.debug(`Sending to ${topic}: ${body}`);
        await this.client.publish({ destination: topic, body, headers });

        return true;
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