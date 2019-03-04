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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Srv =
/*#__PURE__*/
function (_PxService) {
  _inherits(Srv, _PxService);

  function Srv(owner) {
    var _this;

    _classCallCheck(this, Srv);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Srv).call(this, owner));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "connect",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, node, url, httpsOptions, host, creds;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.logger.debug('Connecting to PubSub');

              _context.next = 3;
              return _this.checkNodes();

            case 3:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 6;
              _iterator = _this.nodes[Symbol.iterator]();

            case 8:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 36;
                break;
              }

              node = _step.value;

              _this.logger.debug("About to try node ".concat(node.node_name));

              if (node.properties.hasOwnProperty('wsUrl')) {
                _context.next = 14;
                break;
              }

              _this.logger.warn("Node ".concat(node.node_name, " of ").concat(node.service, " doesn't have wsUrl property"));

              return _context.abrupt("continue", 33);

            case 14:
              url = new _url.URL(node.properties['wsUrl']);
              httpsOptions = _this.owner.sslOptions(url);
              host = utl.hostname;
              _context.next = 19;
              return _this.owner.getNodeIp(url);

            case 19:
              url.hostname = _context.sent;
              creds = _this.owner.credentials();
              _context.prev = 21;

              _this.logger.debug("Trying node ".concat(node.node_name, " on url '").concat(url.href, " with creds ").concat(JSON.stringify(creds)));

              _context.next = 25;
              return _this._tryConnection({
                url: url.href,
                login: creds.username,
                passcode: creds.password,
                host: host,
                httpsOptions: httpsOptions
              });

            case 25:
              _this.client = _context.sent;
              _context.next = 31;
              break;

            case 28:
              _context.prev = 28;
              _context.t0 = _context["catch"](21);
              return _context.abrupt("continue", 33);

            case 31:
              _this.client.onStompError = function (frame) {
                return _this.onStompError(frame);
              };

              _this.client.onWebSocketError = function (event) {
                return _this.onWebSocketError(event);
              };

            case 33:
              _iteratorNormalCompletion = true;
              _context.next = 8;
              break;

            case 36:
              _context.next = 42;
              break;

            case 38:
              _context.prev = 38;
              _context.t1 = _context["catch"](6);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 42:
              _context.prev = 42;
              _context.prev = 43;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 45:
              _context.prev = 45;

              if (!_didIteratorError) {
                _context.next = 48;
                break;
              }

              throw _iteratorError;

            case 48:
              return _context.finish(45);

            case 49:
              return _context.finish(42);

            case 50:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[6, 38, 42, 50], [21, 28], [43,, 45, 49]]);
    })));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_tryConnection", function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Promise(function (resolve, reject) {
        client = new _stompjs.Client({
          connectHeaders: {
            login: options.login,
            passcode: options.password,
            host: options.host
          },
          debug: function debug(str) {
            _this.logger.debug(str);
          },
          forceBinaryWSFrames: true,
          reconnectDelay: 0,
          heartbeatIncoming: typeof options.heartbeatIncoming !== 'undefined' ? options.heartbeatIncoming : 4000,
          heartbeatOutgoing: typeof options.heartbeatOutgoing !== 'undefined' ? options.heartbeatOutgoing : 4000,
          webSocketFactory: function webSocketFactory() {
            return new _ws.default(options.url, _objectSpread({
              timeout: typeof options.timeout !== 'undefined' ? options.timeout : 30000
            }, options.httpsOptions));
          }
        });

        client.onConnect = function (frame) {
          resolve(client);
        };

        client.onStompError = function (frame) {
          _this.logger.error('Broker reported error: ' + frame.headers['message']);

          _this.logger.debug('Additional details: ' + frame.body);

          reject();
        };

        client.onWebSocketError = function (event) {
          _this.logger.error('WebSocket error: ' + JSON.stringify(event));

          reject(event);
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_reSubscribe", function () {
      _this.subscribtions.forEach(function (s) {
        return _this.subscribe(s.topic);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "unsubscribe", function (topic) {
      _this.logger.debug("Unsubscribe from ".concat(topic));

      var idx = _this.subscribtions.findIndex(function (v) {
        return v.topic === topic;
      });

      if (idx < 0) {
        return;
      }

      if (!_this.subscribtions[idx].hasOwnProperty('subscription')) {
        return;
      }

      _this.subscribtions[idx].subscription.unsubscribe();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "subscribe", function (topic, cb) {
      _this.logger.debug("Subscribing for ".concat(topic));

      var idx = _this.subscribtions.findIndex(function (v) {
        return v.topic === topic;
      });

      if (idx < 0) {
        _this.subscribtions.push({
          topic: topic
        });

        idx = _this.subscribtions.length - 1;
      }

      _this.subscribtions[idx].subscription = _this.client.subscribe(s.topic, function (message) {
        _this.logger.debug("Got STOMP message on ".concat(topic, ": ").concat(JSON.stringify(message)));

        _this.emit('stompMessage', s, message);

        if (typeof cb === 'function') {
          cb(message);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onStompError", function (frame) {
      _this.logger.error('Broker reported error: ' + frame.headers['message']);

      _this.logger.debug('Additional details: ' + frame.body);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onWebSocketError", function (event) {
      _this.logger.error('WebSocket error: ' + JSON.stringify(event)); // TODO: reconnect here

    });

    _this.service = "com.cisco.ise.pubsub";
    _this.logger = owner.getLogger('pxgrid:service:pubsub');
    _this.subscribtions = [];
    return _this;
  }

  return Srv;
}(_service.PxService);

exports.default = Srv;