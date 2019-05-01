"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ws = _interopRequireDefault(require("ws"));

var _url = require("url");

var _stompjs = require("@stomp/stompjs");

var _service = require("./service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Srv extends _service.PxService {
  constructor(owner) {
    super(owner);

    _defineProperty(this, "connect", async (node = -1) => {
      if (this.client && this.client.connected) {
        return true;
      }

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

        let url = new _url.URL(node.properties['wsUrl']);
        let httpsOptions = this.owner.sslOptions(url);
        let host = url.hostname;
        url.hostname = await this.owner.getNodeIp(url);
        let creds = this.owner.credentials();

        if (!node.secret) {
          await this.secret(node);
        }

        creds = { ...creds,
          password: node.secret
        };
        url.username = creds.username;
        url.password = creds.password;

        try {
          this.logger.debug(`Trying node ${node.node_name} on url '${url.href} with creds ${JSON.stringify(creds)}`);
          this.client = await this._tryConnection({
            url: url.href,
            login: creds.username,
            passcode: '',
            //creds.password,
            host,
            httpsOptions
          });
        } catch (e) {
          console.log(e);
          continue;
        }

        this.client.onStompError = frame => {
          if (typeof this.onStompError === 'function') {
            this.onStompError(frame);
          }
        };

        this.client.onWebSocketError = event => {
          if (typeof this.onWebSocketError === 'function') {
            this.onWebSocketError(event);
          }
        };

        this.client.onWebSocketClose = event => {
          this.node = null;
          this.logger.info(`WebSocket closed with code ${event.code} and reason "${event.reason}"`);

          if (typeof this.onWebSocketClose === 'function') {
            this.onWebSocketClose(event);
          }
        };

        this.logger.info(`WebSocket connected to ${node.node_name} with STOPM ${this.client.connectedVersion}`);
        this.node = node;
        return true;
      }

      throw new _service.ServiceError('PUBSUB_UNAVAIL', "PubSub service appears to be unavailable");
    });

    _defineProperty(this, "disconnect", () => {
      if (this.client && this.client.connected) {
        this.client.deactivate();
      }

      return;
    });

    _defineProperty(this, "_tryConnection", (options = {}) => {
      return new Promise((resolve, reject) => {
        const client = new _stompjs.Client({
          connectHeaders: {
            login: options.login,
            passcode: options.password,
            host: options.host
          },
          debug: str => {
            this.logger.debug(str);
          },
          forceBinaryWSFrames: true,
          reconnectDelay: 0,
          heartbeatIncoming: typeof options.heartbeatIncoming !== 'undefined' ? options.heartbeatIncoming : 4000,
          heartbeatOutgoing: typeof options.heartbeatOutgoing !== 'undefined' ? options.heartbeatOutgoing : 4000,
          webSocketFactory: () => {
            return new _ws.default(options.url, {
              timeout: typeof options.timeout !== 'undefined' ? options.timeout : 10000,
              ...options.httpsOptions
            });
          },
          onConnect: frame => {
            this.logger.debug('WebSocket connected');
            resolve(client);
          },
          onStompError: frame => {
            this.logger.error('Broker reported error: ' + frame.headers['message']);
            this.logger.debug('Additional details: ' + frame.body);
            reject();
          },
          onWebSocketError: event => {
            this.logger.error('WebSocket error: ' + JSON.stringify(event));
            reject(event);
          }
        });
        client.activate();
      });
    });

    _defineProperty(this, "_reSubscribe", () => {
      this.subscribtions.forEach(s => this.subscribe(s.topic));
    });

    _defineProperty(this, "unsubscribe", async topic => {
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
    });

    _defineProperty(this, "subscribe", async (topic, cb) => {
      await this.connect();
      this.logger.debug(`Subscribing for ${topic}`);
      let idx = this.subscribtions.findIndex(v => v.topic === topic);

      if (idx < 0) {
        this.subscribtions.push({
          topic
        });
        idx = this.subscribtions.length - 1;
      }

      this.subscribtions[idx].subscription = this.client.subscribe(topic, message => {
        this.logger.debug(`Got STOMP message on ${topic}: ${JSON.stringify(message)}`);
        this.logger.debug(`Body: ${JSON.stringify(message.body)}`);
        this.emit('stompMessage', topic, message);

        if (typeof cb === 'function') {
          cb(message);
        }
      });
      this.logger.info(`Subscribed for ${topic}`);
      return true;
    });

    _defineProperty(this, "onStompError", frame => {
      this.logger.error('Broker reported error: ' + frame.headers['message']);
      this.logger.debug('Additional details: ' + frame.body);
    });

    _defineProperty(this, "onWebSocketError", event => {
      this.logger.error('WebSocket error: ' + JSON.stringify(event)); // TODO: reconnect here
    });

    this.service = "com.cisco.ise.pubsub";
    this.logger = owner.getLogger('pxgrid:service:pubsub');
    this.subscribtions = [];
    this.node = '';
  }

  get connectionInfo() {
    const result = {
      connected: false,
      to: ''
    };

    if (this.client && this.client.connected) {
      result.connected = true;
      result.to = this.node.node_name;
    }

    return result;
  }

}

exports.default = Srv;