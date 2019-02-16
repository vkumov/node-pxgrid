"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(require("url"));

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

              _this.logger.debug("About to send REST request");

              _this.logger.debug("pxGrid url = ".concat(url));

              payload = JSON.stringify(payload);

              _this.logger.debug("  request = ".concat(payload));

              headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              };
              _context.next = 8;
              return _this.getNodeIp(url);

            case 8:
              ip = _context.sent;

              if (ip) {
                _context.next = 11;
                break;
              }

              throw new PxConsumerError("NO_NODES", "Could not find any reachable address");

            case 11:
              if (authz || typeof authz === 'string') {
                passwd = typeof authz === 'string' ? authz : _this.config.password;
                b64 = new Buffer("".concat(_this.config.username, ":").concat(passwd), 'ascii').toString('base64');
                headers.Authorization = "Basic ".concat(b64);
              }

              _context.next = 14;
              return utils.postRequest(url, ip, payload, headers, _this.config.getHttpsOptions());

            case 14:
              response = _context.sent;

              _this.logger.debug('Got response');

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

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "sendControlRest", function (url_suffix, payload) {
    var authz = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var url = "https://".concat(_this.config.getHostName(_this.host_id), ":8910/pxgrid/control/").concat(url_suffix);
    return _this.sendRestRequest(url, payload, authz);
  });

  _defineProperty(this, "accountCreate",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var updateConfig,
        payload,
        response,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            updateConfig = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : true;

            _this.logger.debug("Doing AccountCreate");

            payload = {
              'nodeName': _this.config.nodename
            };
            _context2.next = 5;
            return _this.sendControlRest('AccountCreate', payload, false);

          case 5:
            response = _context2.sent;

            if (!(response.code == 503)) {
              _context2.next = 8;
              break;
            }

            throw new PxConsumerError('CREATE_FAIL_FORBIDDEN', "Got 503 Service Unavailable, looks like password pased authentications are not allowed");

          case 8:
            if (!(response.code == 409)) {
              _context2.next = 10;
              break;
            }

            throw new PxConsumerError('CREATE_FAIL_CONFLICT', "Got 409 Conflict, looks like such account already exists");

          case 10:
            if (response.code == 200 && updateConfig) {
              _this.config.password = response.content['password'];
              _this.config.nodename = response.content['nodeName'];
              _this.config.username = response.content['userName'];
            }

            return _context2.abrupt("return", response);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));

  _defineProperty(this, "accountActivate",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var payload, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _this.logger.debug("Doing AccountActivate");

            payload = {};

            if (_this.config.description) {
              payload['description'] = _this.config.description;
            }

            _context3.next = 5;
            return _this.sendControlRest('AccountActivate', payload);

          case 5:
            response = _context3.sent;

            if (!(response.code == 401)) {
              _context3.next = 8;
              break;
            }

            throw new PxConsumerError('ACTIVATE_FAIL_UNAUTHORIZED', "Got 401 Unauthorized, looks like such account wasn't created or incorrect password");

          case 8:
            return _context3.abrupt("return", response);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));

  _defineProperty(this, "serviceLookup", function (serviceName) {
    _this.logger.debug("Doing ServiceLookup");

    var payload = {
      'name': serviceName
    };
    return _this.sendControlRest('ServiceLookup', payload);
  });

  _defineProperty(this, "accessSecret", function (peerNodeName) {
    _this.logger.debug("Doing AccessSecret");

    var payload = {
      peerNodeName: peerNodeName
    };
    return _this.sendControlRest('AccessSecret', payload);
  });

  _defineProperty(this, "getLogger", function (name) {
    return _this.config.getLogger(name);
  });

  _defineProperty(this, "getNodeIp",
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(url) {
      var o, port, fams, ips, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, f;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              /**
               * Retrieves IP from URL based on configuration (DNS servers, Inet Family preferences)
               */
              o = new _url.default(url);
              port = o.port || 8910;

              if (!_net.default.isIP(o.hostname)) {
                _context4.next = 6;
                break;
              }

              _context4.next = 5;
              return _this.getFirstOpen([ip], port);

            case 5:
              return _context4.abrupt("return", _context4.sent);

            case 6:
              _context4.t0 = _this.config.inetFamily;
              _context4.next = _context4.t0 === _px_config.PxConfig.PX_INET4 ? 9 : _context4.t0 === _px_config.PxConfig.PX_INET46 ? 11 : _context4.t0 === _px_config.PxConfig.PX_INET64 ? 13 : 15;
              break;

            case 9:
              fams = ['AAAA'];
              return _context4.abrupt("break", 17);

            case 11:
              fams = ['A', 'AAAA'];
              return _context4.abrupt("break", 17);

            case 13:
              fams = ['AAAA', 'A'];
              return _context4.abrupt("break", 17);

            case 15:
              fams = ['A'];
              return _context4.abrupt("break", 17);

            case 17:
              ips = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context4.prev = 21;
              _iterator = fams[Symbol.iterator]();

            case 23:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context4.next = 33;
                break;
              }

              f = _step.value;
              _context4.next = 27;
              return _this.dnsLookup(o.hostname, f);

            case 27:
              ips = _context4.sent;

              if (!ips.length) {
                _context4.next = 30;
                break;
              }

              return _context4.abrupt("break", 33);

            case 30:
              _iteratorNormalCompletion = true;
              _context4.next = 23;
              break;

            case 33:
              _context4.next = 39;
              break;

            case 35:
              _context4.prev = 35;
              _context4.t1 = _context4["catch"](21);
              _didIteratorError = true;
              _iteratorError = _context4.t1;

            case 39:
              _context4.prev = 39;
              _context4.prev = 40;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 42:
              _context4.prev = 42;

              if (!_didIteratorError) {
                _context4.next = 45;
                break;
              }

              throw _iteratorError;

            case 45:
              return _context4.finish(42);

            case 46:
              return _context4.finish(39);

            case 47:
              _context4.next = 49;
              return _this.getFirstOpen(ips, port);

            case 49:
              return _context4.abrupt("return", _context4.sent);

            case 50:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[21, 35, 39, 47], [40,, 42, 46]]);
    }));

    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }());

  _defineProperty(this, "dnsLookup",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(hostname, recordtype) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return utils.dnsLookup(hostname, _this.config.dns, recordtype);

            case 3:
              return _context5.abrupt("return", _context5.sent);

            case 6:
              _context5.prev = 6;
              _context5.t0 = _context5["catch"](0);

              _this.logger.debug(_context5.t0.message);

              return _context5.abrupt("return", []);

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 6]]);
    }));

    return function (_x4, _x5) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "getFirstOpen",
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(ips, port) {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _ip;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context6.prev = 3;
              _iterator2 = ips[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context6.next = 15;
                break;
              }

              _ip = _step2.value;
              _context6.next = 9;
              return utils.isPortOpen(_ip, port);

            case 9:
              if (!_context6.sent) {
                _context6.next = 11;
                break;
              }

              return _context6.abrupt("return", _ip);

            case 11:
              _this.logger.debug("".concat(_ip, ":").concat(port, " is not reacheable"));

            case 12:
              _iteratorNormalCompletion2 = true;
              _context6.next = 5;
              break;

            case 15:
              _context6.next = 21;
              break;

            case 17:
              _context6.prev = 17;
              _context6.t0 = _context6["catch"](3);
              _didIteratorError2 = true;
              _iteratorError2 = _context6.t0;

            case 21:
              _context6.prev = 21;
              _context6.prev = 22;

              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }

            case 24:
              _context6.prev = 24;

              if (!_didIteratorError2) {
                _context6.next = 27;
                break;
              }

              throw _iteratorError2;

            case 27:
              return _context6.finish(24);

            case 28:
              return _context6.finish(21);

            case 29:
              return _context6.abrupt("return", undefined);

            case 30:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this, [[3, 17, 21, 29], [22,, 24, 28]]);
    }));

    return function (_x6, _x7) {
      return _ref6.apply(this, arguments);
    };
  }());

  if (!config) {
    throw new PxConsumerError('NO_CONFIG', 'No config provided');
  }

  this.config = config;
  this.logger = config.getLogger('pxgrid:consumer');
  this.services = new _services_container.default(this);
  this.host_id = 0;
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