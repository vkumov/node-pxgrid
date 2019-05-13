"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PxConfigError = exports.PxConfig = exports.VERIFY_ALL = exports.VERIFY_CA = exports.VERIFY_NONE = exports.PX_INET6 = exports.PX_INET64 = exports.PX_INET46 = exports.PX_INET4 = void 0;

var _logging = require("./utils/logging");

var _net = require("./utils/net");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const tls = require('tls');

const winston = require('winston');

const {
  format
} = winston;
const PX_INET4 = 1;
exports.PX_INET4 = PX_INET4;
const PX_INET46 = 2;
exports.PX_INET46 = PX_INET46;
const PX_INET64 = 3;
exports.PX_INET64 = PX_INET64;
const PX_INET6 = 4;
exports.PX_INET6 = PX_INET6;
const VERIFY_NONE = 'VERIFY_NONE';
exports.VERIFY_NONE = VERIFY_NONE;
const VERIFY_CA = 'VERIFY_CA';
exports.VERIFY_CA = VERIFY_CA;
const VERIFY_ALL = 'VERIFY_ALL';
exports.VERIFY_ALL = VERIFY_ALL;

function matchRule(str, rule) {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}

class PxConfig {
  constructor(_options = {}) {
    _defineProperty(this, "getHostName", (idx = 0) => {
      return this._hosts[idx].host;
    });

    _defineProperty(this, "getHostId", (name, zeroIfNotFound = true) => {
      name = name.toLowerCase();

      let r = this._hosts.findIndex(h => h.host === name);

      if (r < 0) {
        this.logger.debug(`${name} not found in hosts`);
      }

      return r < 0 && zeroIfNotFound ? 0 : r;
    });

    _defineProperty(this, "forEachHost", cb => {
      this._hosts.forEach((h, idx) => {
        cb(h, idx);
      });
    });

    _defineProperty(this, "addHost", (options, checkIfAdded = true) => {
      if (!options) {
        throw new PxConfigError('NO_OPTIONS', 'No options for new host');
      }

      if (!options.hasOwnProperty('host')) {
        throw new PxConfigError('NO_OPTIONS_HOST', 'No host name provided');
      }

      if (!options.hasOwnProperty('ca')) {
        throw new PxConfigError('NO_OPTIONS_CA', 'No ca data for new host provided');
      }

      if (checkIfAdded && this._hosts.findIndex(h => h.host === options.host) >= 0) {
        return;
      }

      this._hosts.push({
        host: options.host.toLowerCase(),
        ca: options.ca
      });
    });

    _defineProperty(this, "setClientcert", (cert, key, keyPassword) => {
      this._clientcert = cert;
      this._clientkey = key;
      this._clientkeypassword = keyPassword;
    });

    _defineProperty(this, "getHttpsOptions", (hostIdx = 0) => {
      return {
        ca: this._hosts[hostIdx].ca,
        cert: Array.isArray(this._clientcert) ? this._clientcert.join("\n") : this._clientcert,
        key: this._clientkey,
        passphrase: this._clientkeypassword,
        rejectUnauthorized: this.verify === VERIFY_NONE ? false : true,
        checkServerIdentity: this.checkServerIdentity // ciphers: 'AES256-GCM-SHA384,AES128-SHA256'

      };
    });

    _defineProperty(this, "checkServerIdentity", (servername, cert) => {
      if (this.verify !== VERIFY_ALL) {
        return undefined;
      }

      return tls.checkServerIdentity(servername, cert);
    });

    _defineProperty(this, "_isDebug", component => {
      let idx = this.debugs.findIndex(d => {
        return matchRule(component, d);
      });
      return idx >= 0;
    });

    _defineProperty(this, "_addLogger", component => {
      winston.loggers.add(component, {
        format: format.combine(format.label({
          label: component
        }), format.json()),
        level: this._isDebug(component) ? 'debug' : 'info',
        transports: this.transports
      });
      this.loggers.push({
        component,
        logger: winston.loggers.get(component)
      });
      console.log(winston.loggers.get(component));
      return this.loggers[this.loggers.length - 1].logger;
    });

    _defineProperty(this, "getLogger", component => {
      let result = this.loggers.findIndex(l => {
        return l.component === component;
      });

      if (result >= 0) {
        return this.loggers[result].logger;
      }

      return this._addLogger(component);
    });

    this.nodename = typeof _options.nodename !== 'undefined' ? _options.nodename : '';
    this.username = typeof _options.username !== 'undefined' ? _options.username : this.nodename;
    this.password = typeof _options.password !== 'undefined' ? _options.password : '';
    this.description = typeof _options.description !== 'undefined' ? _options.description : '';
    this.verify = typeof _options.verify !== 'undefined' ? _options.verify : VERIFY_ALL;
    this.dns = _options.dns || [];
    this.inetFamily = typeof _options.inetFamily !== 'undefined' ? _options.inetFamily : PX_INET46;
    this._hosts = [];
    _options.hosts = typeof _options.hosts !== 'undefined' && Array.isArray(_options.hosts) ? _options.hosts : [];

    _options.hosts.forEach(h => this.addHost(h));

    this._clientcert = typeof _options.clientcert !== 'undefined' ? _options.clientcert : '';
    this._clientkey = typeof _options.clientkey !== 'undefined' ? _options.clientkey : '';
    this._clientkeypassword = typeof _options.clientkeypassword !== 'undefined' ? _options.clientkeypassword : '';
    this.debugs = (typeof _options.debugs !== 'undefined' ? _options.debugs : process.env.DEBUG || '').split(',');
    this.loggers = [];

    if (_options.defaultTransport) {
      if (_options.transports) {
        this.transports = [..._options.transports, ..._logging.transports];
      } else {
        this.transports = _options.transports || _logging.transports;
      }
    } else {
      this.transports = _options.transports || _logging.transports;
    }

    this.logger = this.getLogger('pxgrid:config');
    (0, _net.setUtilsLogger)(this.getLogger);
  }

  get dns() {
    return this._dns;
  }

  set dns(new_dns) {
    if (new_dns && !Array.isArray(new_dns)) {
      throw new TypeError('Must be an array of new DNS servers');
    }

    this._dns = new_dns;
  }

  get inetFamily() {
    return this._inetFamily;
  }

  set inetFamily(nv) {
    if (![PX_INET4, PX_INET46, PX_INET64, PX_INET6].includes(nv)) {
      throw new PxConfigError('WRONG_INET_FAMILY', "Wrong internet family");
    }

    this._inetFamily = nv;
  }

  get hostsLength() {
    return this._hosts.length;
  }

}

exports.PxConfig = PxConfig;

class PxConfigError extends Error {
  /**
   * Internal service error.
   */
  constructor(code, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PxConfigError);
    }

    this.code = code;
  }

}

exports.PxConfigError = PxConfigError;