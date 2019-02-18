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
              _context.next = 2;
              return _this.checkNodes();

            case 2:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;
              _iterator = _this.nodes[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 33;
                break;
              }

              node = _step.value;

              if (node.properties.hasOwnProperty('wsUrl')) {
                _context.next = 12;
                break;
              }

              _this.logger.warn("Node ".concat(node.node_name, " of ").concat(node.service, " doesn't have wsUrl property"));

              return _context.abrupt("continue", 30);

            case 12:
              url = new _url.URL(node.properties['wsUrl']);
              httpsOptions = _this.owner.sslOptions(url);
              host = utl.hostname;
              _context.next = 17;
              return _this.owner.getNodeIp(url);

            case 17:
              url.hostname = _context.sent;
              creds = _this.owner.credentials();
              _context.prev = 19;
              _context.next = 22;
              return _this._tryConnection({
                login: creds.username,
                passcode: creds.password,
                host: host,
                httpsOptions: httpsOptions
              });

            case 22:
              _this.client = _context.sent;
              _context.next = 28;
              break;

            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](19);
              return _context.abrupt("continue", 30);

            case 28:
              _this.client.onStompError = function (frame) {
                return _this.onStompError(frame);
              };

              _this.client.onWebSocketError = function (event) {
                return _this.onWebSocketError(event);
              };

            case 30:
              _iteratorNormalCompletion = true;
              _context.next = 7;
              break;

            case 33:
              _context.next = 39;
              break;

            case 35:
              _context.prev = 35;
              _context.t1 = _context["catch"](5);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 39:
              _context.prev = 39;
              _context.prev = 40;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 42:
              _context.prev = 42;

              if (!_didIteratorError) {
                _context.next = 45;
                break;
              }

              throw _iteratorError;

            case 45:
              return _context.finish(42);

            case 46:
              return _context.finish(39);

            case 47:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[5, 35, 39, 47], [19, 25], [40,, 42, 46]]);
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
            return new _ws.default(options.url, Object.assign({
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