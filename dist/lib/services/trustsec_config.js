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
        call: 'getSecurityGroups',
        params: ['ID', 'NODE']
      }, {
        call: 'getSecurityGroupAcls',
        params: ['ID', 'NODE']
      }, {
        call: 'getEgressPolicies',
        params: ['NODE']
      }, {
        call: 'getEgressMatrices',
        params: ['NODE']
      }];
    });

    _defineProperty(this, "getSecurityGroups", (id, node = -1) => {
      const payload = typeof id !== 'undefined' ? {
        id
      } : {};
      return this._generalCall('getSecurityGroups', payload, node);
    });

    _defineProperty(this, "getSecurityGroupAcls", (id, node = -1) => {
      const payload = typeof id !== 'undefined' ? {
        id
      } : {};
      return this._generalCall('getSecurityGroupAcls', payload, node);
    });

    _defineProperty(this, "getEgressPolicies", (node = -1) => {
      const payload = {};
      return this._generalCall('getEgressPolicies', payload, node);
    });

    _defineProperty(this, "getEgressMatrices", (node = -1) => {
      const payload = {};
      return this._generalCall('getEgressMatrices', payload, node);
    });

    this.service = "com.cisco.ise.config.trustsec";
    this.logger = owner.getLogger('pxgrid:service:trustsec_config');
  }

}

exports.default = Srv;