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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getSecurityGroups", function (id) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      payload = typeof id !== 'undefined' ? {
        id: id
      } : {};
      return _this._generalCall('getSecurityGroups', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getSecurityGroupAcls", function (id) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      payload = typeof id !== 'undefined' ? {
        id: id
      } : {};
      return _this._generalCall('getSecurityGroupAcls', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getEgressPolicies", function () {
      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      payload = {};
      return _this._generalCall('getEgressPolicies', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getEgressMatrices", function () {
      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      payload = {};
      return _this._generalCall('getEgressMatrices', payload, node);
    });

    _this.service = "com.cisco.ise.config.trustsec";
    _this.logger = owner.getLogger('pxgrid:service:trustsec_config');
    return _this;
  }

  return Srv;
}(_service.PxService);

exports.default = Srv;