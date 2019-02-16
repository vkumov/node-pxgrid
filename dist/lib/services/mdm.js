"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _service = require("./service");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getEndpoints", function (filter) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      payload = filter ? {
        filter: filter
      } : {};
      return _this._generalCall('getEndpoints', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getEndpointByMac", function (mac) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (!mac) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "MAC address must be specified for getEndpointByMacAddress");
      }

      payload = {
        "macAddress": mac
      };
      return _this._generalCall('getEndpointByMacAddress', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getEndpointsByType", function (ep_type) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      ep_type = ep_type.toUpperCase();

      if (!['NON_COMPLIANT', 'REGISTERED', 'DISCONNECTED'].includes(ep_type)) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Type can be one of: NON_COMPLIANT, REGISTERED or DISCONNECTED");
      }

      payload = {
        "type": ep_type
      };
      return _this._generalCall('getEndpointsByType', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getEndpointsByOsType", function (os_type) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      os_type = os_type.toUpperCase();

      if (!['ANDROID', 'IOS', 'WINDOWS'].includes(os_type)) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Type should be one of: ANDROID, IOS or WINDOWS");
      }

      payload = {
        "osType": os_type
      };
      return _this._generalCall('getEndpointsByOsType', payload, node);
    });

    _this.service = "com.cisco.ise.mdm";
    _this.logger = owner.getLogger('pxgrid:service:mdm');
    return _this;
  }

  return Srv;
}(_service.PxService);

exports.default = Srv;