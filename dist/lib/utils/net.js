"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dnsLookup = exports.isPortOpen = exports.postRequest = exports.setUtilsLogger = void 0;

var _net = _interopRequireDefault(require("net"));

var _dns = _interopRequireDefault(require("dns"));

var _url = require("url");

var _axios = _interopRequireDefault(require("axios"));

var _https = _interopRequireDefault(require("https"));

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let logger;

const setUtilsLogger = cb => {
  logger = cb('pxgrid:utils:net');
};

exports.setUtilsLogger = setUtilsLogger;

const postRequest = async (url, ip, payload, headers, httpsOptions) => {
  /**
   * Send HTTPS POST request over SSL socket.
   * 
   * @param {string} url          full url.
   * @param {string} ip           ip of the server.
   * @param {object} payload      payload to send.
   * @param {object} headers      additional headers.
   * @param {object} httpsOptions options for HTTPS Agent.
   * 
   * @return {object} axios response
   */
  if (typeof payload !== 'string') {
    payload = JSON.stringify(payload);
  }

  let o = new _url.URL(url);
  headers.Host = o.hostname;
  o.hostname = ip;
  o.port = o.port || 8910;
  httpsOptions.keepAlive = typeof httpsOptions.keepAlive === 'undefined' ? false : httpsOptions.keepAlive;
  logger.debug(`URL: ${o.href}`);
  logger.debug(`Payload: ${JSON.stringify(payload)}`);
  logger.debug(`Headers: ${JSON.stringify(headers)}`);
  logger.debug(`HTTPS: ${JSON.stringify(httpsOptions)}`);
  const httpsAgent = new _https.default.Agent(httpsOptions);
  const result = await _axios.default.post(o.href, payload, {
    headers,
    httpsAgent
  });
  return result;
};

exports.postRequest = postRequest;

const isPortOpen = async (ip, port) => {
  try {
    return await new Promise(resolve => {
      const socket = new _net.default.Socket();

      const onError = () => {
        socket.destroy();
        resolve(false);
      };

      socket.setTimeout(2000);
      socket.on('error', onError);
      socket.on('timeout', onError);
      socket.connect(port, ip, () => {
        socket.end();
        resolve(true);
      });
    });
  } catch (e) {
    return false;
  }
};

exports.isPortOpen = isPortOpen;

const dnsLookup = (domainName, servers = undefined, recordtype = undefined) => {
  return new Promise(function (resolve, reject) {
    let oldServers = _dns.default.getServers();

    if (servers) {
      _dns.default.setServers(servers);
    }

    if (_net.default.isIP(domainName)) {
      resolve([domainName]);
    }

    recordtype = recordtype ? recordtype : 'A';

    _dns.default.resolve(domainName, recordtype, (err, address) => {
      _dns.default.setServers(oldServers);

      if (err) {
        reject(err);
      }

      try {
        logger.debug(`${domainName} resolved in ${address}`);
      } catch (e) {}

      resolve(address);
    });
  });
};

exports.dnsLookup = dnsLookup;