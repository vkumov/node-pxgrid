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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getSessions", function (startTimestamp) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      payload = startTimestamp ? {
        "startTimestamp": new Date(startTimestamp).toISOString()
      } : {};
      return _this._generalCall('getSessions', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getSessionsByIp", function (ip) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (!ip) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "IP address must be specified for getSessionByIpAddress");
      }

      payload = {
        "ipAddress": ip
      };
      return _this._generalCall('getSessionByIpAddress', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getSessionsByMac", function (mac) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (!mac) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "MAC address must be specified for getSessionByMacAddress");
      }

      payload = {
        "macAddress": mac
      };
      return _this._generalCall('getSessionByMacAddress', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getUserGroups", function () {
      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      payload = {};
      return _this._generalCall('getUserGroups', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getUserGroupByUsername", function (username) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (!username) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Username must be provided for getUserGroupByUserName");
      }

      payload = {
        "userName": username
      };
      return _this._generalCall('getUserGroupByUserName', payload, node);
    });

    _this.service = "com.cisco.ise.session";
    _this.logger = owner.getLogger('pxgrid:service:session_directory');
    return _this;
  }

  return Srv;
}(_service.PxService);

exports.default = Srv;