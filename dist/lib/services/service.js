"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceError = exports.PxService = void 0;

var _events = _interopRequireDefault(require("events"));

var _px_nodes = require("../px_nodes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

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

var SERVICE_NOT_INIT = 'UNINITIALIZED';

var PxService =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(PxService, _EventEmitter);

  function PxService(owner) {
    var _this;

    _classCallCheck(this, PxService);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PxService).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialized", function () {
      /**
       * Checks if service was initialized. Throws an exception if not.
       * 
       * @return true
       */
      if (!_this._initialized) {
        throw new ServiceError('UNINITIALIZED', "Service wasn't initialized correctly");
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_generalCall",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(call, payload) {
        var node,
            r,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                node = _args.length > 2 && _args[2] !== undefined ? _args[2] : -1;

                /**
                 * Wrapper for every REST call. Checks nodes and executes the call.
                 * 
                 * @param {String} call      the REST call to perform.
                 * @param {Any}    payload   payload if needed.
                 * @param {Number} [node=-1] node idx if needed, or -1 to get from first available.
                 * 
                 * @return response of _goThroughNodes.
                 */
                _this.initialized();

                if (_this.logger) {
                  _this.logger.debug("About to make ".concat(call, " call"));
                }

                _context.next = 5;
                return _this.checkNodes();

              case 5:
                _context.next = 7;
                return _this._goThroughNodes(call, payload, node);

              case 7:
                r = _context.sent;

                _this.emit("".concat(call, "Success"), r);

                return _context.abrupt("return", r);

              case 10:
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "lookup",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var r;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              /**
               * Service Lookup of the service.
               */
              _this.initialized();

              _this.logger.debug('Service lookup');

              _context2.next = 4;
              return _this.owner.serviceLookup(_this.service);

            case 4:
              r = _context2.sent;

              if (!(r.code != 200)) {
                _context2.next = 7;
                break;
              }

              throw new ServiceError('BAD_RESPONSE', "Got unexpected response from host: ".concat(r.code, ": ").concat(r.content));

            case 7:
              _this.nodes.populate(r.content.services);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "secret",
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(node) {
        var r;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                /**
                 * Update Access Secret for one node.
                 * 
                 * @param {Object} node node for which access secret should be updated.
                 */
                _this.initialized();

                _this.logger.debug("Updating secret of ".concat(node));

                _context3.next = 4;
                return _this.owner.accessSecret(node.node_name);

              case 4:
                r = _context3.sent;

                if (!(r.code != 200)) {
                  _context3.next = 7;
                  break;
                }

                throw new ServiceError('BAD_RESPONSE', "Got unexpected response from host: ".concat(r.code, ": ").concat(r.content));

              case 7:
                node.secret = r.content.secret;

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateSecrets",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var r, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              /**
               * Update Access Secrets for all nodes.
               * 
               * @return {Object} successfull and failed nodes
               */
              _this.initialized();

              _this.logger.debug('Updating secrets');

              r = {
                success: [],
                fail: []
              };

              if (!_this.nodes.isEmpty()) {
                _context4.next = 5;
                break;
              }

              throw new ServiceError('NO_NODES', "No nodes for the service ".concat(_this.service));

            case 5:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context4.prev = 8;
              _iterator = _this.nodes[Symbol.iterator]();

            case 10:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context4.next = 25;
                break;
              }

              node = _step.value;
              _context4.prev = 12;
              _context4.next = 15;
              return _this.secret(node);

            case 15:
              r.success.push(n.node_name);
              _context4.next = 22;
              break;

            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4["catch"](12);

              if (_this.logger) {
                _this.logger.warn("Error while communicating with ".concat(n.node_name, ": ").concat(_context4.t0.message));
              }

              r.fail.push(n.node_name);

            case 22:
              _iteratorNormalCompletion = true;
              _context4.next = 10;
              break;

            case 25:
              _context4.next = 31;
              break;

            case 27:
              _context4.prev = 27;
              _context4.t1 = _context4["catch"](8);
              _didIteratorError = true;
              _iteratorError = _context4.t1;

            case 31:
              _context4.prev = 31;
              _context4.prev = 32;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 34:
              _context4.prev = 34;

              if (!_didIteratorError) {
                _context4.next = 37;
                break;
              }

              throw _iteratorError;

            case 37:
              return _context4.finish(34);

            case 38:
              return _context4.finish(31);

            case 39:
              return _context4.abrupt("return", r);

            case 40:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[8, 27, 31, 39], [12, 18], [32,, 34, 38]]);
    })));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "checkNodes",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var force,
          _args5 = arguments;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              force = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : false;

              /**
               * Perform Service Lookup if needed, raise error if no nodes returned.
               * 
               * @param {Boolean} force perform lookup even if it was performed already.
               */
              _this.initialized();

              _this.logger.debug("Checking nodes, empty: ".concat(_this.nodes.isEmpty()));

              if (!(_this.nodes.isEmpty() || force)) {
                _context5.next = 7;
                break;
              }

              _this.logger.debug('Looking up nodes');

              _context5.next = 7;
              return _this.lookup();

            case 7:
              if (!_this.nodes.isEmpty()) {
                _context5.next = 9;
                break;
              }

              throw new ServiceError("NO_NODES", "No nodes for the service ".concat(_this.service));

            case 9:
              return _context5.abrupt("return", true);

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_goThroughNodes",
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(call, payload) {
        var node,
            ns,
            _iteratorNormalCompletion2,
            _didIteratorError2,
            _iteratorError2,
            _iterator2,
            _step2,
            _n,
            r,
            _args6 = arguments;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                node = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : -1;

                /**
                 * Perform a REST call, go through all nodes, return first successful.
                 * 
                 * @param {String} call      the call itself
                 * @param {Any}    payload   payload data
                 * @param {Number} [node=-1] if call should go to one specific node - it is its index
                 * 
                 * @return result of REST call
                 */
                _this.initialized();

                _this.logger.debug("Go through nodes, node: ".concat(node));

                ns = _this.nodes.node(node);

                _this.logger.debug("Nodes: ".concat(JSON.stringify(ns)));

                if (!Array.isArray(ns)) {
                  ns = [ns];
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context6.prev = 9;
                _iterator2 = ns[Symbol.iterator]();

              case 11:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context6.next = 36;
                  break;
                }

                _n = _step2.value;

                _this.logger.debug("Trying ".concat(_n.node_name));

                _context6.prev = 14;

                if (_n.secret) {
                  _context6.next = 18;
                  break;
                }

                _context6.next = 18;
                return _this.secret(_n);

              case 18:
                _context6.next = 20;
                return _this.owner.sendRestRequest("".concat(_n.properties.restBaseUrl, "/").concat(call), payload, _n.secret);

              case 20:
                r = _context6.sent;

                if (!(r.code >= 200 && r.code < 300)) {
                  _context6.next = 24;
                  break;
                }

                _this.emit('restCallSuccess', call, _n, r);

                return _context6.abrupt("return", r);

              case 24:
                if (_this.logger) {
                  _this.logger.debug("Got not 2** response for a call to ".concat(_n.node_name, ":\n").concat(r.code, ": ").concat(JSON.stringify(r.content)));
                }

                _this.emit("".concat(call, "Error"), _n, r);

                return _context6.abrupt("return", r);

              case 29:
                _context6.prev = 29;
                _context6.t0 = _context6["catch"](14);

                if (_this.logger) {
                  _this.logger.warn("Error while communicating with ".concat(_n.node_name, ": ").concat(_context6.t0.message));
                }

                throw _context6.t0;

              case 33:
                _iteratorNormalCompletion2 = true;
                _context6.next = 11;
                break;

              case 36:
                _context6.next = 42;
                break;

              case 38:
                _context6.prev = 38;
                _context6.t1 = _context6["catch"](9);
                _didIteratorError2 = true;
                _iteratorError2 = _context6.t1;

              case 42:
                _context6.prev = 42;
                _context6.prev = 43;

                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }

              case 45:
                _context6.prev = 45;

                if (!_didIteratorError2) {
                  _context6.next = 48;
                  break;
                }

                throw _iteratorError2;

              case 48:
                return _context6.finish(45);

              case 49:
                return _context6.finish(42);

              case 50:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[9, 38, 42, 50], [14, 29], [43,, 45, 49]]);
      }));

      return function (_x4, _x5) {
        return _ref6.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "findProperty",
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(property) {
        var node,
            ns,
            result,
            _args7 = arguments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                node = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : -1;

                _this.initialized();

                _this.logger.debug("Looking for property: ".concat(property));

                _context7.next = 5;
                return _this.checkNodes();

              case 5:
                ns = _this.nodes.node(node);

                _this.logger.debug("Nodes: ".concat(JSON.stringify(ns)));

                if (!Array.isArray(ns)) {
                  ns = [ns];
                }

                result = [];
                ns.forEach(function (n) {
                  return n.properties.hasOwnProperty(property) && result.push(n.properties[property]);
                });
                return _context7.abrupt("return", result);

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function (_x6) {
        return _ref7.apply(this, arguments);
      };
    }());

    _this.owner = owner;
    _this.nodes = new _px_nodes.PxNodes();
    _this.logger = null;
    _this._service = SERVICE_NOT_INIT;
    _this._initialized = false;
    return _this;
  }

  _createClass(PxService, [{
    key: "service",
    get: function get() {
      return this._service;
    },
    set: function set(val) {
      if (this._service !== SERVICE_NOT_INIT) {
        throw new ServiceError('ALREADY_INIT', "Service cannot be re-initialized");
      }

      this._service = val;
      this._initialized = true;
    }
  }]);

  return PxService;
}(_events.default);

exports.PxService = PxService;

var ServiceError =
/*#__PURE__*/
function (_Error) {
  _inherits(ServiceError, _Error);

  /**
   * Internal service error.
   */
  function ServiceError(code) {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, ServiceError);

    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ServiceError)).call.apply(_getPrototypeOf2, [this].concat(params)));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_assertThisInitialized(_this2)), ServiceError);
    }

    _this2.code = code;
    return _this2;
  }

  return ServiceError;
}(_wrapNativeSuper(Error));

exports.ServiceError = ServiceError;