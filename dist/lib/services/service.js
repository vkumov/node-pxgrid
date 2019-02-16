"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceError = exports.PxService = void 0;

var _px_nodes = require("../px_nodes");

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

var SERVICE_NOT_INIT = 'UNINITIALIZED';

var PxService =
/*#__PURE__*/
function () {
  function PxService(owner) {
    var _this = this;

    _classCallCheck(this, PxService);

    _defineProperty(this, "initialized", function () {
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

    _defineProperty(this, "_generalCall", function (call, payload) {
      var node = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

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

      _this.checkNodes();

      return _this._goThroughNodes(call, payload, node);
    });

    _defineProperty(this, "lookup", function () {
      /**
       * Service Lookup of the service.
       */
      _this.initialized();

      var r = _this.owner.service_lookup(_this.service);

      if (r.code != 200) {
        throw new ServiceError('BAD_RESPONSE', "Got unexpected response from host: ".concat(r.code, ": ").concat(r.content));
      }

      _this.nodes.populate(r.content.services);
    });

    _defineProperty(this, "secret", function (node) {
      /**
       * Update Access Secret for one node.
       * 
       * @param {Object} node node for which access secret should be updated.
       */
      _this.initialized();

      var r = _this.owner.access_secret(node.node_name);

      if (r.code != 200) {
        throw new ServiceError('BAD_RESPONSE', "Got unexpected response from host: ".concat(r.code, ": ").concat(r.content));
      }

      node.secret = r.content.secret;
    });

    _defineProperty(this, "updateSecrets", function () {
      /**
       * Update Access Secrets for all nodes.
       * 
       * @return {Object} successfull and failed nodes
       */
      _this.initialized();

      var r = {
        success: [],
        fail: []
      };

      if (_this.nodes.isEmpty()) {
        throw new ServiceError('NO_NODES', "No nodes for the service ".concat(_this.service));
      }

      _this.nodes.forEach(function (node) {
        try {
          _this.secret(node);
        } catch (e) {
          if (_this.logger) {
            _this.logger.debug("Error while communicating with ".concat(n.node_name, ": ").concat(e.message));
          }

          r.fail.push(n.node_name);
          return;
        }

        r.success.push(n.node_name);
      });

      return r;
    });

    _defineProperty(this, "checkNodes", function () {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      /**
       * Perform Service Lookup if needed, raise error if no nodes returned.
       * 
       * @param {Boolean} force perform lookup even if it was performed already.
       */
      _this.initialized();

      if (_this.nodes.isEmpty() || force) {
        _this.lookup();
      }

      if (_this.nodes.isEmpty()) {
        throw new ServiceError("NO_NODES", "No nodes for the service ".concat(_this.service));
      }
    });

    _defineProperty(this, "_goThroughNodes", function (call, payload) {
      var node = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

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

      var ns = _this.nodes.node(node);

      if (!Array.isArray(ns)) {
        ns = [ns];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = ns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _n = _step.value;

          try {
            if (!_n.secret) {
              _this.secret(_n);
            }

            var r = _this.owner.sendRestRequest("".concat(_n.properties.restBaseUrl, "/").concat(call), payload, _n.secret);

            if (r.code >= 200 && r.code < 300) {
              return r;
            }

            if (_this.logger) {
              _this.logger.debug("Got not 2** response for a call to ".concat(_n.node_name, ":\n").concat(r.code, ": ").concat(r.content));
            }
          } catch (e) {
            if (_this.logger) {
              _this.logger.debug("Error while communicating with ".concat(_n.node_name, ": ").concat(e.message));
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });

    this.owner = owner;
    this.nodes = new _px_nodes.PxNodes.PxNodes();
    this.logger = null;
    this._service = SERVICE_NOT_INIT;
    this._initialized = false;
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
}();

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

    self.code = code;
    return _this2;
  }

  return ServiceError;
}(_wrapNativeSuper(Error));

exports.ServiceError = ServiceError;