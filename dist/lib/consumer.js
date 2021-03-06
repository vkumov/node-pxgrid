"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = require("url");

var _net = _interopRequireDefault(require("net"));

var utils = _interopRequireWildcard(require("./utils/net"));

var _services_container = _interopRequireDefault(require("./services/services_container"));

var _px_config = require("./px_config");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PxConsumer {
  constructor(config) {
    _defineProperty(this, "sendRestRequest", async (url, payload, authz = true) => {
      if (typeof payload !== 'string') {
        payload = JSON.stringify(payload);
      }

      this.logger.debug("About to send REST request");
      this.logger.debug(`pxGrid url = ${url}`);
      this.logger.debug(`--- Request = ${payload}`);
      let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      let o = new _url.URL(url);
      o.port = o.port || 8910;
      let ip = await this.getNodeIp(o);

      if (!ip) {
        throw new PxConsumerError("NO_NODES", "Could not find any reachable address");
      }

      if (authz || typeof authz === 'string') {
        let passwd = typeof authz === 'string' ? authz : this.config.password;
        let b64 = Buffer.from(`${this.config.username}:${passwd}`, 'ascii').toString('base64');
        headers.Authorization = `Basic ${b64}`;
      }

      try {
        let response = await utils.postRequest(url, ip, payload, headers, this.sslOptions(o));
        this.logger.debug('--- Response');
        this.logger.debug(`${response.status} ${response.statusText}`);
        this.logger.debug(JSON.stringify(response.headers));
        this.logger.debug(JSON.stringify(response.data));

        if (response.data) {
          try {
            response.data = JSON.parse(response.data);
          } catch (e) {
            this.logger.debug(e.message);
          }
        }

        return new PxRestResponse(response.status, response.data);
      } catch (e) {
        if (e.response) {
          return new PxRestResponse(e.response.status, e.response.data);
        } else {
          throw e;
        }
      }
    });

    _defineProperty(this, "sendControlRest", async (url_suffix, payload, authz = true) => {
      for (let i = 0; i < this.config.hostsLength; i++) {
        let host;

        try {
          host = this.config.getHostName(i);
          let url = `https://${host}:8910/pxgrid/control/${url_suffix}`;
          return await this.sendRestRequest(url, payload, authz);
        } catch (e) {
          this.logger.debug(e);
          this.logger.warn(`Control REST to ${host} failed, trying next`);
          continue;
        }
      }

      throw new PxConsumerError('CONTROL_REST_FAILED', `None of hosts responded to ${url_suffix}`);
    });

    _defineProperty(this, "accountCreate", async (updateConfig = true) => {
      this.logger.debug("Doing AccountCreate");
      let payload = {
        'nodeName': this.config.nodename
      };
      let response = await this.sendControlRest('AccountCreate', payload, false);

      if (response.code == 503) {
        throw new PxConsumerError('CREATE_FAIL_FORBIDDEN', "Got 503 Service Unavailable, looks like password pased authentications are not allowed");
      }

      if (response.code == 409) {
        throw new PxConsumerError('CREATE_FAIL_CONFLICT', "Got 409 Conflict, looks like such account already exists");
      }

      if (response.code == 200 && updateConfig) {
        this.config.password = response.content['password'];
        this.config.nodename = response.content['nodeName'];
        this.config.username = response.content['nodeName'];
      }

      return response;
    });

    _defineProperty(this, "accountActivate", async () => {
      this.logger.debug("Doing AccountActivate");
      let payload = {};

      if (this.config.description) {
        payload['description'] = this.config.description;
      }

      let response = await this.sendControlRest('AccountActivate', payload);

      if (response.code == 401) {
        throw new PxConsumerError('ACTIVATE_FAIL_UNAUTHORIZED', "Got 401 Unauthorized, looks like such account wasn't created or incorrect password");
      }

      return response;
    });

    _defineProperty(this, "serviceLookup", async serviceName => {
      this.logger.debug("Doing ServiceLookup");
      let payload = {
        'name': serviceName
      };
      return await this.sendControlRest('ServiceLookup', payload);
    });

    _defineProperty(this, "accessSecret", async peerNodeName => {
      this.logger.debug("Doing AccessSecret");
      let payload = {
        peerNodeName
      };
      return await this.sendControlRest('AccessSecret', payload);
    });

    _defineProperty(this, "getLogger", name => {
      return this.config.getLogger(name);
    });

    _defineProperty(this, "getNodeIp", async url => {
      /**
       * Retrieves IP from URL based on configuration (DNS servers, Inet Family preferences)
       */
      if (typeof 'url' === 'string') {
        url = new _url.URL(url);
        url.port = url.port || 8910;
      }

      if (_net.default.isIP(url.hostname)) {
        return await this.getFirstOpen([ip], port);
      }

      let fams;

      switch (this.config.inetFamily) {
        case _px_config.PxConfig.PX_INET4:
          fams = ['AAAA'];
          break;

        case _px_config.PxConfig.PX_INET46:
          fams = ['A', 'AAAA'];
          break;

        case _px_config.PxConfig.PX_INET64:
          fams = ['AAAA', 'A'];
          break;

        default:
          fams = ['A'];
          break;
      }

      let ips = [];

      for (const f of fams) {
        ips = await this.dnsLookup(url.hostname, f);

        if (ips.length) {
          break;
        }
      }

      return await this.getFirstOpen(ips, url.port);
    });

    _defineProperty(this, "dnsLookup", async (hostname, recordtype) => {
      try {
        return await utils.dnsLookup(hostname, this.config.dns, recordtype);
      } catch (ex) {
        this.logger.debug(ex.message);
        return [];
      }
    });

    _defineProperty(this, "getFirstOpen", async (ips, port) => {
      for (const ip of ips) {
        if (await utils.isPortOpen(ip, port)) {
          return ip;
        }

        this.logger.debug(`${ip}:${port} is not reacheable`);
      }

      return undefined;
    });

    _defineProperty(this, "sslOptions", host => {
      if (typeof host === 'string') {
        host = new _url.URL(host);
      }

      return this.config.getHttpsOptions(this.config.getHostId(host.hostname));
    });

    _defineProperty(this, "credentials", () => {
      let {
        username,
        password
      } = this.config;
      return {
        username,
        password
      };
    });

    if (!config) {
      throw new PxConsumerError('NO_CONFIG', 'No config provided');
    }

    this.config = config;
    this.logger = config.getLogger('pxgrid:consumer');
    this.services = new _services_container.default(this);
  }

}

exports.default = PxConsumer;

class PxConsumerError extends Error {
  /**
   * Internal consumer error.
   */
  constructor(code, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PxConsumerError);
    }

    this.code = code;
  }

}

class PxRestResponse {
  constructor(code, content) {
    this.code = parseInt(code);
    this.content = content;
  }

}