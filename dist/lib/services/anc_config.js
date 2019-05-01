"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _service = require("./service");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Srv extends _service.PxService {
  constructor(owner) {
    super(owner);

    _defineProperty(this, "restCalls", services => {
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

    _defineProperty(this, "getPolicies", (node = -1) => {
      const payload = {};
      return this._generalCall('getPolicies', payload, node);
    });

    _defineProperty(this, "getPolicyByName", (name, node = -1) => {
      if (!name) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for getPolicyByName");
      }

      payload = {
        "name": name
      };
      return this._generalCall('getPolicyByName', payload, node);
    });

    _defineProperty(this, "createPolicy", (policy, node = -1) => {
      if (!policy) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Policy object must be specified for createPolicy");
      } // TODO: add additional checks


      return this._generalCall('createPolicy', policy, node);
    });

    _defineProperty(this, "deletePolicyByName", (name, node = -1) => {
      if (!name) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for deletePolicyByName");
      }

      payload = {
        "name": name
      };
      return this._generalCall('getPolicyByName', payload, node);
    });

    _defineProperty(this, "getEndpoints", (node = -1) => {
      const payload = {};
      return this._generalCall('getEndpoints', payload, node);
    });

    _defineProperty(this, "getEndpointByMac", (mac, node = -1) => {
      if (!mac) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "MAC Address must be specified for getEndpointByMacAddress");
      }

      payload = {
        "macAddress": mac
      };
      return this._generalCall('getEndpointByMacAddress', payload, node);
    });

    _defineProperty(this, "applyEndpointByIp", (ip, policy, node = -1) => {
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
      return this._generalCall('applyEndpointByIpAddress', payload, node);
    });

    _defineProperty(this, "applyEndpointByMac", (mac, policy, node = -1) => {
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
      return this._generalCall('applyEndpointByMacAddress', payload, node);
    });

    _defineProperty(this, "clearEndpointByIp", (ip, policy, node = -1) => {
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
      return this._generalCall('clearEndpointByIpAddress', payload, node);
    });

    _defineProperty(this, "clearEndpointByMac", (mac, policy, node = -1) => {
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
      return this._generalCall('clearEndpointByMacAddress', payload, node);
    });

    _defineProperty(this, "getOperationStatus", (id, node = -1) => {
      if (!id) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Operation ID must be specified for getOperationStatus");
      }

      payload = {
        "operationId": id
      };
      return this._generalCall('getOperationStatus', payload, node);
    });

    this.service = "com.cisco.ise.config.anc";
    this.logger = owner.getLogger('pxgrid:service:anc_config');
  }

}

exports.default = Srv;