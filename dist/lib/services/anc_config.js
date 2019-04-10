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
        call: 'getPolicies',
        params: ['NODE']
      }, {
        call: 'getPolicyByName',
        params: ['Name', 'NODE']
      }, {
        call: 'createPolicy',
        params: ['Policy', 'NODE']
      }, {
        call: 'deletePolicyByName',
        params: ['Name', 'NODE']
      }, {
        call: 'getEndpoints',
        params: ['NODE']
      }, {
        call: 'getEndpointByMac',
        params: ['MAC', 'NODE']
      }, {
        call: 'applyEndpointByIp',
        params: ['IP', 'Policy', 'NODE']
      }, {
        call: 'applyEndpointByMac',
        params: ['MAC', 'Policy', 'NODE']
      }, {
        call: 'clearEndpointByIp',
        params: ['IP', 'Policy', 'NODE']
      }, {
        call: 'clearEndpointByMac',
        params: ['MAC', 'Policy', 'NODE']
      }, {
        call: 'getOperationStatus',
        params: ['ID', 'NODE']
      }];
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPolicies", function () {
      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      var payload = {};
      return _this._generalCall('getPolicies', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPolicyByName", function (name) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (!name) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for getPolicyByName");
      }

      payload = {
        "name": name
      };
      return _this._generalCall('getPolicyByName', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "createPolicy", function (policy) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (!policy) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Policy object must be specified for createPolicy");
      } // TODO: add additional checks


      return _this._generalCall('createPolicy', policy, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "deletePolicyByName", function (name) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (!name) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for deletePolicyByName");
      }

      payload = {
        "name": name
      };
      return _this._generalCall('getPolicyByName', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getEndpoints", function () {
      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      var payload = {};
      return _this._generalCall('getEndpoints', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getEndpointByMac", function (mac) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (!mac) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "MAC Address must be specified for getEndpointByMacAddress");
      }

      payload = {
        "macAddress": mac
      };
      return _this._generalCall('getEndpointByMacAddress', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "applyEndpointByIp", function (ip, policy) {
      var node = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

      if (!ip) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "IP Address must be specified for applyEndpointByIpAddress");
      }

      if (!policy) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for applyEndpointByIpAddress");
      }

      payload = {
        "policyName": policy,
        "ipAddress": ip
      };
      return _this._generalCall('applyEndpointByIpAddress', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "applyEndpointByMac", function (mac, policy) {
      var node = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

      if (!mac) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "MAC Address must be specified for applyEndpointByMacAddress");
      }

      if (!policy) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for applyEndpointByMacAddress");
      }

      payload = {
        "policyName": policy,
        "macAddress": mac
      };
      return _this._generalCall('applyEndpointByMacAddress', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearEndpointByIp", function (ip, policy) {
      var node = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

      if (!ip) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "IP Address must be specified for clearEndpointByIpAddress");
      }

      if (!policy) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for clearEndpointByIpAddress");
      }

      payload = {
        "policyName": policy,
        "ipAddress": ip
      };
      return _this._generalCall('clearEndpointByIpAddress', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearEndpointByMac", function (mac, policy) {
      var node = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

      if (!mac) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "MAC Address must be specified for clearEndpointByMacAddress");
      }

      if (!policy) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for clearEndpointByMacAddress");
      }

      payload = {
        "policyName": policy,
        "macAddress": mac
      };
      return _this._generalCall('clearEndpointByMacAddress', payload, node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOperationStatus", function (id) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (!id) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Operation ID must be specified for getOperationStatus");
      }

      payload = {
        "operationId": id
      };
      return _this._generalCall('getOperationStatus', payload, node);
    });

    _this.service = "com.cisco.ise.config.anc";
    _this.logger = owner.getLogger('pxgrid:service:anc_config');
    return _this;
  }

  return Srv;
}(_service.PxService);

exports.default = Srv;