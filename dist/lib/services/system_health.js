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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "restCalls", function (services) {
      return [{
        call: 'getHealths',
        params: ['Node Name', 'Start Timestamp', 'NODE']
      }, {
        call: 'getPerformances',
        params: ['Node Name', 'Start Timestamp', 'NODE']
      }];
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getHealths", function (node_name, start_timestamp) {
      var node = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      var payload = {};

      if (node_name) {
        // populate nodeName if specified
        payload.nodeName = node_name;
      }

      if (start_timestamp) {
        // if start_timestamp is provided - convert to ISO8601 format and populate startTimestamp
        payload.startTimestamp = new Date(start_timestamp).toISOString();
      }

      return _this._generalCall('getHealths', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPerformances", function (node_name, start_timestamp) {
      var node = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      var payload = {};

      if (node_name) {
        // populate nodeName if specified
        payload.nodeName = node_name;
      }

      if (start_timestamp) {
        // if start_timestamp is provided - convert to ISO8601 format and populate startTimestamp
        payload.startTimestamp = new Date(start_timestamp).toISOString();
      }

      return _this._generalCall('getPerformances', payload, node);
    });

    _this.service = "com.cisco.ise.system";
    _this.logger = owner.getLogger('pxgrid:service:system_health');
    return _this;
  }

  return Srv;
}(_service.PxService);

exports.default = Srv;