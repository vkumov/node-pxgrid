"use strict";

import WebSocket from 'ws';
import { Client, Message } from '@stomp/stompjs';
import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor(owner) {
        super(owner);
        self.service = "com.cisco.ise.pubsub";
        self.logger = owner.getLogger('pxgrid:service:pubsub');
    }

    connectTo = (options = {}) => {
        this.client = new Client({
            connectHeaders: {
                login: options.login,
                passcode: options.password,
                host: options.host
            },
            debug: (str) => {
              this.logger.debug(str);
            },
            // reconnectDelay: 5000,
            // heartbeatIncoming: 4000,
            // heartbeatOutgoing: 4000,
            webSocketFactory = () => {
                return new WebSocket(options.url, options.httpsOptions);
            }
          });
    }
}