"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _service = _interopRequireDefault(require("./service"));

var _anc_config = _interopRequireDefault(require("./anc_config"));

var _endpoint_asset = _interopRequireDefault(require("./endpoint_asset"));

var _mdm = _interopRequireDefault(require("./mdm"));

var _profiler_config = _interopRequireDefault(require("./profiler_config"));

var _pubsub = _interopRequireDefault(require("./pubsub"));

var _radius = _interopRequireDefault(require("./radius"));

var _session_directory = _interopRequireDefault(require("./session_directory"));

var _system_health = _interopRequireDefault(require("./system_health"));

var _trustsec = _interopRequireDefault(require("./trustsec"));

var _trustsec_config = _interopRequireDefault(require("./trustsec_config"));

var _trustsec_sxp = _interopRequireDefault(require("./trustsec_sxp"));

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pxClasses = {
  ancConfig: _anc_config.default,
  endpointAsset: _endpoint_asset.default,
  mdm: _mdm.default,
  profilerConfig: _profiler_config.default,
  pubsub: _pubsub.default,
  radius: _radius.default,
  sessionDirectory: _session_directory.default,
  systemHealth: _system_health.default,
  trustsec: _trustsec.default,
  trustsecConfig: _trustsec_config.default,
  trustsecSxp: _trustsec_sxp.default
};

var PxServices = function PxServices(_owner) {
  var _this = this;

  _classCallCheck(this, PxServices);

  _defineProperty(this, "registerClass", function (name, classRef) {
    var precreate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : True;

    if (!classRef.prototype instanceof _service.default) {
      throw new TypeError("New class must be a subclass of PxService");
    }

    pxClasses[name] = classRef;

    if (precreate) {
      _this[name] = classRef(owner);
    }
  });

  _defineProperty(this, "serviceHandler", function (service_name) {
    for (var key in _this) {
      var el = _this[key];

      if (el instanceof _service.default && el.service === service_name) {
        return el;
      }
    }

    throw new AttributeError("Service \"".concat(service_name, "\" not defined"));
  });

  _defineProperty(this, "add", function (class_name, service_name) {
    try {
      return _this.serviceHandler(service_name);
    } catch (e) {
      if (e instanceof AttributeError) {
        service_name = service_name.replace(/(?:(?:com\.)?(?:cisco\.)?(?:ise\.)?)(.*)/gi, '$1').replace(/_(\w)/gi, function (v) {
          return v.toUpperCase().replace('_', '');
        });
        _this[service_name] = new pxClasses[class_name](_this.owner);
        return _this[service_name];
      }

      throw e;
    }
  });

  this.owner = _owner; // precreate all known

  for (var key in pxClasses) {
    if (pxClasses.hasOwnProperty(key)) {
      this[key] = new pxClasses[key](_owner);
    }
  }
};

exports.default = PxServices;

var AttributeError =
/*#__PURE__*/
function (_Error) {
  _inherits(AttributeError, _Error);

  function AttributeError() {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, AttributeError);

    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AttributeError)).call.apply(_getPrototypeOf2, [this].concat(params)));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_assertThisInitialized(_this2)), AttributeError);
    }

    return _this2;
  }

  return AttributeError;
}(_wrapNativeSuper(Error));