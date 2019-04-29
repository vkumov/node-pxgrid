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

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
      var node,
          ns,
          _iteratorNormalCompletion,
          _didIteratorError,
          _iteratorError,
          _iterator,
          _step,
          _node,
          url,
          httpsOptions,
          host,
          creds,
          _args = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              node = _args.length > 0 && _args[0] !== undefined ? _args[0] : -1;

              if (!(_this.client && _this.client.connected)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", true);

            case 3:
              _this.logger.debug('Connecting to PubSub');

              _context.next = 6;
              return _this.checkNodes();

            case 6:
              ns = _this.nodes.node(node);

              _this.logger.debug("Nodes: ".concat(JSON.stringify(ns)));

              if (!Array.isArray(ns)) {
                ns = [ns];
              }

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 12;
              _iterator = ns[Symbol.iterator]();

            case 14:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 53;
                break;
              }

              _node = _step.value;

              _this.logger.debug("About to try node ".concat(_node.node_name));

              if (_node.properties.hasOwnProperty('wsUrl')) {
                _context.next = 20;
                break;
              }

              _this.logger.warn("Node ".concat(_node.node_name, " of ").concat(_node.service, " doesn't have wsUrl property"));

              return _context.abrupt("continue", 50);

            case 20:
              url = new _url.URL(_node.properties['wsUrl']);
              httpsOptions = _this.owner.sslOptions(url);
              host = url.hostname;
              _context.next = 25;
              return _this.owner.getNodeIp(url);

            case 25:
              url.hostname = _context.sent;
              creds = _this.owner.credentials();

              if (_node.secret) {
                _context.next = 30;
                break;
              }

              _context.next = 30;
              return _this.secret(_node);

            case 30:
              creds = _objectSpread({}, creds, {
                password: _node.secret
              });
              url.username = creds.username;
              url.password = creds.password;
              _context.prev = 33;

              _this.logger.debug("Trying node ".concat(_node.node_name, " on url '").concat(url.href, " with creds ").concat(JSON.stringify(creds)));

              _context.next = 37;
              return _this._tryConnection({
                url: url.href,
                login: creds.username,
                passcode: '',
                //creds.password,
                host: host,
                httpsOptions: httpsOptions
              });

            case 37:
              _this.client = _context.sent;
              _context.next = 44;
              break;

            case 40:
              _context.prev = 40;
              _context.t0 = _context["catch"](33);
              console.log(_context.t0);
              return _context.abrupt("continue", 50);

            case 44:
              _this.client.onStompError = function (frame) {
                if (typeof _this.onStompError === 'function') {
                  _this.onStompError(frame);
                }
              };

              _this.client.onWebSocketError = function (event) {
                if (typeof _this.onWebSocketError === 'function') {
                  _this.onWebSocketError(event);
                }
              };

              _this.client.onWebSocketClose = function (event) {
                _this.node = null;

                _this.logger.info("WebSocket closed with code ".concat(event.code, " and reason \"").concat(event.reason, "\""));

                if (typeof _this.onWebSocketClose === 'function') {
                  _this.onWebSocketClose(event);
                }
              };

              _this.logger.info("WebSocket connected to ".concat(_node.node_name, " with STOPM ").concat(_this.client.connectedVersion));

              _this.node = _node;
              return _context.abrupt("return", true);

            case 50:
              _iteratorNormalCompletion = true;
              _context.next = 14;
              break;

            case 53:
              _context.next = 59;
              break;

            case 55:
              _context.prev = 55;
              _context.t1 = _context["catch"](12);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 59:
              _context.prev = 59;
              _context.prev = 60;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 62:
              _context.prev = 62;

              if (!_didIteratorError) {
                _context.next = 65;
                break;
              }

              throw _iteratorError;

            case 65:
              return _context.finish(62);

            case 66:
              return _context.finish(59);

            case 67:
              throw new _service.ServiceError('PUBSUB_UNAVAIL', "PubSub service appears to be unavailable");

            case 68:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[12, 55, 59, 67], [33, 40], [60,, 62, 66]]);
    })));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "disconnect", function () {
      if (_this.client && _this.client.connected) {
        _this.client.deactivate();
      }

      return;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_tryConnection", function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Promise(function (resolve, reject) {
        var client = new _stompjs.Client({
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
              timeout: typeof options.timeout !== 'undefined' ? options.timeout : 10000
            }, options.httpsOptions));
          },
          onConnect: function onConnect(frame) {
            _this.logger.debug('WebSocket connected');

            resolve(client);
          },
          onStompError: function onStompError(frame) {
            _this.logger.error('Broker reported error: ' + frame.headers['message']);

            _this.logger.debug('Additional details: ' + frame.body);

            reject();
          },
          onWebSocketError: function onWebSocketError(event) {
            _this.logger.error('WebSocket error: ' + JSON.stringify(event));

            reject(event);
          }
        });
        client.activate();
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_reSubscribe", function () {
      _this.subscribtions.forEach(function (s) {
        return _this.subscribe(s.topic);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "unsubscribe",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(topic) {
        var idx;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.connect();

              case 2:
                _this.logger.debug("Unsubscribe from ".concat(topic));

                idx = _this.subscribtions.findIndex(function (v) {
                  return v.topic === topic;
                });

                if (!(idx < 0)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return");

              case 6:
                if (_this.subscribtions[idx].hasOwnProperty('subscription')) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return");

              case 8:
                _this.subscribtions[idx].subscription.unsubscribe();

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "subscribe",
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(topic, cb) {
        var idx;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this.connect();

              case 2:
                _this.logger.debug("Subscribing for ".concat(topic));

                idx = _this.subscribtions.findIndex(function (v) {
                  return v.topic === topic;
                });

                if (idx < 0) {
                  _this.subscribtions.push({
                    topic: topic
                  });

                  idx = _this.subscribtions.length - 1;
                }

                _this.subscribtions[idx].subscription = _this.client.subscribe(topic, function (message) {
                  _this.logger.debug("Got STOMP message on ".concat(topic, ": ").concat(JSON.stringify(message)));

                  _this.logger.debug("Body: ".concat(JSON.stringify(message.body)));

                  _this.emit('stompMessage', topic, message);

                  if (typeof cb === 'function') {
                    cb(message);
                  }
                });

                _this.logger.info("Subscribed for ".concat(topic));

                return _context3.abrupt("return", true);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function (_x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }());

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
    _this.node = '';
    return _this;
  }

  _createClass(Srv, [{
    key: "connectionInfo",
    get: function get() {
      var result = {
        connected: false,
        to: ''
      };

      if (this.client && this.client.connected) {
        result.connected = true;
        result.to = this.node.node_name;
      }

      return result;
    }
  }]);

  return Srv;
}(_service.PxService);

exports.default = Srv;