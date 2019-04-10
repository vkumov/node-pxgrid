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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PxConsumer = function PxConsumer(config) {
  var _this = this;

  _classCallCheck(this, PxConsumer);

  _defineProperty(this, "sendRestRequest",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(url, payload) {
      var authz,
          headers,
          o,
          ip,
          passwd,
          b64,
          response,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              authz = _args.length > 2 && _args[2] !== undefined ? _args[2] : true;

              if (typeof payload !== 'string') {
                payload = JSON.stringify(payload);
              }

              _this.logger.debug("About to send REST request");

              _this.logger.debug("pxGrid url = ".concat(url));

              _this.logger.debug("--- Request = ".concat(payload));

              headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              };
              o = new _url.URL(url);
              o.port = o.port || 8910;
              _context.next = 10;
              return _this.getNodeIp(o);

            case 10:
              ip = _context.sent;

              if (ip) {
                _context.next = 13;
                break;
              }

              throw new PxConsumerError("NO_NODES", "Could not find any reachable address");

            case 13:
              if (authz || typeof authz === 'string') {
                passwd = typeof authz === 'string' ? authz : _this.config.password;
                b64 = new Buffer("".concat(_this.config.username, ":").concat(passwd), 'ascii').toString('base64');
                headers.Authorization = "Basic ".concat(b64);
              }

              _context.prev = 14;
              _context.next = 17;
              return utils.postRequest(url, ip, payload, headers, _this.sslOptions(o));

            case 17:
              response = _context.sent;

              _this.logger.debug('--- Response');

              _this.logger.debug("".concat(response.status, " ").concat(response.statusText));

              _this.logger.debug(JSON.stringify(response.headers));

              _this.logger.debug(JSON.stringify(response.data));

              if (response.data) {
                try {
                  response.data = JSON.parse(response.data);
                } catch (e) {
                  _this.logger.debug(e.message);
                }
              }

              return _context.abrupt("return", new PxRestResponse(response.status, response.data));

            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](14);

              if (!_context.t0.response) {
                _context.next = 32;
                break;
              }

              return _context.abrupt("return", new PxRestResponse(_context.t0.response.status, _context.t0.response.data));

            case 32:
              throw _context.t0;

            case 33:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[14, 26]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "sendControlRest",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(url_suffix, payload) {
      var authz,
          i,
          host,
          url,
          _args2 = arguments;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              authz = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : true;
              i = 0;

            case 2:
              if (!(i < _this.config.hostsLength)) {
                _context2.next = 20;
                break;
              }

              host = void 0;
              _context2.prev = 4;
              host = _this.config.getHostName(i);
              url = "https://".concat(host, ":8910/pxgrid/control/").concat(url_suffix);
              _context2.next = 9;
              return _this.sendRestRequest(url, payload, authz);

            case 9:
              return _context2.abrupt("return", _context2.sent);

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](4);

              _this.logger.debug(_context2.t0);

              _this.logger.warn("Control REST to ".concat(host, " failed, trying next"));

              return _context2.abrupt("continue", 17);

            case 17:
              i++;
              _context2.next = 2;
              break;

            case 20:
              throw new PxConsumerError('CONTROL_REST_FAILED', "None of hosts responded to ".concat(url_suffix));

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[4, 12]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "accountCreate",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var updateConfig,
        payload,
        response,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            updateConfig = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : true;

            _this.logger.debug("Doing AccountCreate");

            payload = {
              'nodeName': _this.config.nodename
            };
            _context3.next = 5;
            return _this.sendControlRest('AccountCreate', payload, false);

          case 5:
            response = _context3.sent;

            if (!(response.code == 503)) {
              _context3.next = 8;
              break;
            }

            throw new PxConsumerError('CREATE_FAIL_FORBIDDEN', "Got 503 Service Unavailable, looks like password pased authentications are not allowed");

          case 8:
            if (!(response.code == 409)) {
              _context3.next = 10;
              break;
            }

            throw new PxConsumerError('CREATE_FAIL_CONFLICT', "Got 409 Conflict, looks like such account already exists");

          case 10:
            if (response.code == 200 && updateConfig) {
              _this.config.password = response.content['password'];
              _this.config.nodename = response.content['nodeName'];
              _this.config.username = response.content['nodeName'];
            }

            return _context3.abrupt("return", response);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));

  _defineProperty(this, "accountActivate",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var payload, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _this.logger.debug("Doing AccountActivate");

            payload = {};

            if (_this.config.description) {
              payload['description'] = _this.config.description;
            }

            _context4.next = 5;
            return _this.sendControlRest('AccountActivate', payload);

          case 5:
            response = _context4.sent;

            if (!(response.code == 401)) {
              _context4.next = 8;
              break;
            }

            throw new PxConsumerError('ACTIVATE_FAIL_UNAUTHORIZED', "Got 401 Unauthorized, looks like such account wasn't created or incorrect password");

          case 8:
            return _context4.abrupt("return", response);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  })));

  _defineProperty(this, "serviceLookup",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(serviceName) {
      var payload;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _this.logger.debug("Doing ServiceLookup");

              payload = {
                'name': serviceName
              };
              _context5.next = 4;
              return _this.sendControlRest('ServiceLookup', payload);

            case 4:
              return _context5.abrupt("return", _context5.sent);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "accessSecret",
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(peerNodeName) {
      var payload;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _this.logger.debug("Doing AccessSecret");

              payload = {
                peerNodeName: peerNodeName
              };
              _context6.next = 4;
              return _this.sendControlRest('AccessSecret', payload);

            case 4:
              return _context6.abrupt("return", _context6.sent);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getLogger", function (name) {
    return _this.config.getLogger(name);
  });

  _defineProperty(this, "getNodeIp",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(url) {
      var fams, ips, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, f;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              /**
               * Retrieves IP from URL based on configuration (DNS servers, Inet Family preferences)
               */
              if (typeof 'url' === 'string') {
                url = new _url.URL(url);
                url.port = url.port || 8910;
              }

              if (!_net.default.isIP(url.hostname)) {
                _context7.next = 5;
                break;
              }

              _context7.next = 4;
              return _this.getFirstOpen([ip], port);

            case 4:
              return _context7.abrupt("return", _context7.sent);

            case 5:
              _context7.t0 = _this.config.inetFamily;
              _context7.next = _context7.t0 === _px_config.PxConfig.PX_INET4 ? 8 : _context7.t0 === _px_config.PxConfig.PX_INET46 ? 10 : _context7.t0 === _px_config.PxConfig.PX_INET64 ? 12 : 14;
              break;

            case 8:
              fams = ['AAAA'];
              return _context7.abrupt("break", 16);

            case 10:
              fams = ['A', 'AAAA'];
              return _context7.abrupt("break", 16);

            case 12:
              fams = ['AAAA', 'A'];
              return _context7.abrupt("break", 16);

            case 14:
              fams = ['A'];
              return _context7.abrupt("break", 16);

            case 16:
              ips = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context7.prev = 20;
              _iterator = fams[Symbol.iterator]();

            case 22:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context7.next = 32;
                break;
              }

              f = _step.value;
              _context7.next = 26;
              return _this.dnsLookup(url.hostname, f);

            case 26:
              ips = _context7.sent;

              if (!ips.length) {
                _context7.next = 29;
                break;
              }

              return _context7.abrupt("break", 32);

            case 29:
              _iteratorNormalCompletion = true;
              _context7.next = 22;
              break;

            case 32:
              _context7.next = 38;
              break;

            case 34:
              _context7.prev = 34;
              _context7.t1 = _context7["catch"](20);
              _didIteratorError = true;
              _iteratorError = _context7.t1;

            case 38:
              _context7.prev = 38;
              _context7.prev = 39;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 41:
              _context7.prev = 41;

              if (!_didIteratorError) {
                _context7.next = 44;
                break;
              }

              throw _iteratorError;

            case 44:
              return _context7.finish(41);

            case 45:
              return _context7.finish(38);

            case 46:
              _context7.next = 48;
              return _this.getFirstOpen(ips, url.port);

            case 48:
              return _context7.abrupt("return", _context7.sent);

            case 49:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this, [[20, 34, 38, 46], [39,, 41, 45]]);
    }));

    return function (_x7) {
      return _ref7.apply(this, arguments);
    };
  }());

  _defineProperty(this, "dnsLookup",
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(hostname, recordtype) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return utils.dnsLookup(hostname, _this.config.dns, recordtype);

            case 3:
              return _context8.abrupt("return", _context8.sent);

            case 6:
              _context8.prev = 6;
              _context8.t0 = _context8["catch"](0);

              _this.logger.debug(_context8.t0.message);

              return _context8.abrupt("return", []);

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this, [[0, 6]]);
    }));

    return function (_x8, _x9) {
      return _ref8.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getFirstOpen",
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(ips, port) {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _ip;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context9.prev = 3;
              _iterator2 = ips[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context9.next = 15;
                break;
              }

              _ip = _step2.value;
              _context9.next = 9;
              return utils.isPortOpen(_ip, port);

            case 9:
              if (!_context9.sent) {
                _context9.next = 11;
                break;
              }

              return _context9.abrupt("return", _ip);

            case 11:
              _this.logger.debug("".concat(_ip, ":").concat(port, " is not reacheable"));

            case 12:
              _iteratorNormalCompletion2 = true;
              _context9.next = 5;
              break;

            case 15:
              _context9.next = 21;
              break;

            case 17:
              _context9.prev = 17;
              _context9.t0 = _context9["catch"](3);
              _didIteratorError2 = true;
              _iteratorError2 = _context9.t0;

            case 21:
              _context9.prev = 21;
              _context9.prev = 22;

              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }

            case 24:
              _context9.prev = 24;

              if (!_didIteratorError2) {
                _context9.next = 27;
                break;
              }

              throw _iteratorError2;

            case 27:
              return _context9.finish(24);

            case 28:
              return _context9.finish(21);

            case 29:
              return _context9.abrupt("return", undefined);

            case 30:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this, [[3, 17, 21, 29], [22,, 24, 28]]);
    }));

    return function (_x10, _x11) {
      return _ref9.apply(this, arguments);
    };
  }());

  _defineProperty(this, "sslOptions", function (host) {
    if (typeof host === 'string') {
      host = new _url.URL(host);
    }

    return _this.config.getHttpsOptions(_this.config.getHostId(host.hostname));
  });

  _defineProperty(this, "credentials", function () {
    var _this$config = _this.config,
        username = _this$config.username,
        password = _this$config.password;
    return {
      username: username,
      password: password
    };
  });

  if (!config) {
    throw new PxConsumerError('NO_CONFIG', 'No config provided');
  }

  this.config = config;
  this.logger = config.getLogger('pxgrid:consumer');
  this.services = new _services_container.default(this);
};

exports.default = PxConsumer;

var PxConsumerError =
/*#__PURE__*/
function (_Error) {
  _inherits(PxConsumerError, _Error);

  /**
   * Internal consumer error.
   */
  function PxConsumerError(code) {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, PxConsumerError);

    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PxConsumerError)).call.apply(_getPrototypeOf2, [this].concat(params)));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_assertThisInitialized(_this2)), PxConsumerError);
    }

    _this2.code = code;
    return _this2;
  }

  return PxConsumerError;
}(_wrapNativeSuper(Error));

var PxRestResponse = function PxRestResponse(code, content) {
  _classCallCheck(this, PxRestResponse);

  this.code = parseInt(code);
  this.content = content;
};