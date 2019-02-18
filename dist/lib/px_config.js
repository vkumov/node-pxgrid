"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PxConfigError = exports.PxConfig = exports.PX_INET6 = exports.PX_INET64 = exports.PX_INET46 = exports.PX_INET4 = void 0;

var _logging = require("./utils/logging");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var winston = require('winston');

var format = winston.format;
var PX_INET4 = 1;
exports.PX_INET4 = PX_INET4;
var PX_INET46 = 2;
exports.PX_INET46 = PX_INET46;
var PX_INET64 = 3;
exports.PX_INET64 = PX_INET64;
var PX_INET6 = 4;
exports.PX_INET6 = PX_INET6;

function matchRule(str, rule) {
  return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}

var PxConfig =
/*#__PURE__*/
function () {
  function PxConfig() {
    var _this = this;

    var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, PxConfig);

    _defineProperty(this, "getHostName", function () {
      var idx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return _this._hosts[idx].host;
    });

    _defineProperty(this, "getHostId", function (name) {
      var zeroIfNotFound = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      name = name.toLowerCase();

      var r = _this._hosts.findIndex(function (h) {
        return h.host === name;
      });

      if (r < 0) {
        _this.logger.debug("".concat(name, " not found in hosts"));
      }

      return r < 0 && zeroIfNotFound ? 0 : r;
    });

    _defineProperty(this, "forEachHost", function (cb) {
      _this._hosts.forEach(function (h, idx) {
        cb(h, idx);
      });
    });

    _defineProperty(this, "addHost", function (options) {
      var checkIfAdded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!options) {
        throw new PxConfigError('NO_OPTIONS', 'No options for new host');
      }

      if (!options.hasOwnProperty('host')) {
        throw new PxConfigError('NO_OPTIONS_HOST', 'No host name provided');
      }

      if (!options.hasOwnProperty('ca')) {
        throw new PxConfigError('NO_OPTIONS_CA', 'No ca data for new host provided');
      }

      if (checkIfAdded && _this._hosts.findIndex(function (h) {
        return h.host === options.host;
      }) >= 0) {
        return;
      }

      _this._hosts.push({
        host: options.host.toLowerCase(),
        ca: options.ca
      });
    });

    _defineProperty(this, "setClientcert", function (cert, key, keyPassword) {
      _this._clientcert = cert;
      _this._clientkey = key;
      _this._clientkeypassword = keyPassword;
    });

    _defineProperty(this, "getHttpsOptions", function () {
      var hostIdx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return {
        ca: _this._hosts[hostIdx].ca,
        cert: _this._clientcert,
        key: _this._clientkey,
        passphrase: _this._clientkeypassword,
        rejectUnauthorized: _this.rejectUnauthorized // servername: this._hosts[hostIdx].host,

      };
    });

    _defineProperty(this, "_isDebug", function (component) {
      var idx = _this.debugs.findIndex(function (d) {
        return matchRule(component, d);
      });

      return idx >= 0;
    });

    _defineProperty(this, "_addLogger", function (component) {
      winston.loggers.add(component, {
        format: format.combine(format.label({
          label: component
        }), format.json()),
        level: _this._isDebug(component) ? 'debug' : 'info',
        transports: _logging.transports
      });

      _this.loggers.push({
        component: component,
        logger: winston.loggers.get(component)
      });

      return _this.loggers[_this.loggers.length - 1].logger;
    });

    _defineProperty(this, "getLogger", function (component) {
      var result = _this.loggers.findIndex(function (l) {
        return l.component === component;
      });

      if (result >= 0) {
        return _this.loggers[result].logger;
      }

      return _this._addLogger(component);
    });

    this.nodename = typeof _options.nodename !== 'undefined' ? _options.nodename : '';
    this.username = typeof _options.username !== 'undefined' ? _options.username : this.nodename;
    this.password = typeof _options.password !== 'undefined' ? _options.password : '';
    this.description = typeof _options.description !== 'undefined' ? _options.description : '';
    this.rejectUnauthorized = typeof _options.rejectUnauthorized !== 'undefined' ? _options.rejectUnauthorized : true;
    this.dns = _options.dns || [];
    this.inetFamily = typeof _options.inetFamily !== 'undefined' ? _options.inetFamily : PX_INET46;
    _options.hosts = typeof _options.hosts !== 'undefined' && Array.isArray(_options.hosts) ? _options.hosts : [];

    _options.hosts.forEach(function (h) {
      return _this.addHost(h);
    });

    this._clientcert = typeof _options.clientcert !== 'undefined' ? _options.clientcert : '';
    this._clientkey = typeof _options.clientkey !== 'undefined' ? _options.clientkey : '';
    this._clientkeypassword = typeof _options.clientkeypassword !== 'undefined' ? _options.clientkeypassword : '';
    this.debugs = (this.debugs || process.env.DEBUG || '').split(',');
    this.loggers = [];
    this.logger = this.getLogger('pxgrid:config');
  }

  _createClass(PxConfig, [{
    key: "dns",
    get: function get() {
      return this._dns;
    },
    set: function set(new_dns) {
      if (new_dns && !Array.isArray(new_dns)) {
        throw new TypeError('Must be an array of new DNS servers');
      }

      this._dns = dns;
    }
  }, {
    key: "inetFamily",
    get: function get() {
      return this._inetFamily;
    },
    set: function set(nv) {
      if (![PX_INET4, PX_INET46, PX_INET64, PX_INET6].includes(nv)) {
        throw new PxConfigError('WRONG_INET_FAMILY', "Wrong internet family");
      }

      this._inetFamily = nv;
    }
  }, {
    key: "hostsLength",
    get: function get() {
      return this._hosts.length;
    }
  }]);

  return PxConfig;
}();

exports.PxConfig = PxConfig;

var PxConfigError =
/*#__PURE__*/
function (_Error) {
  _inherits(PxConfigError, _Error);

  /**
   * Internal service error.
   */
  function PxConfigError(code) {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, PxConfigError);

    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PxConfigError)).call.apply(_getPrototypeOf2, [this].concat(params)));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_assertThisInitialized(_this2)), PxConfigError);
    }

    _this2.code = code;
    return _this2;
  }

  return PxConfigError;
}(_wrapNativeSuper(Error));

exports.PxConfigError = PxConfigError;