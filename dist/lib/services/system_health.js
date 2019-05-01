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
        call: 'getHealths',
        params: ['Node Name', 'Start Timestamp', 'NODE']
      }, {
        call: 'getPerformances',
        params: ['Node Name', 'Start Timestamp', 'NODE']
      }];
    });

    _defineProperty(this, "getHealths", (node_name, start_timestamp, node = -1) => {
      const payload = {};

      if (node_name) {
        // populate nodeName if specified
        payload.nodeName = node_name;
      }

      if (start_timestamp) {
        // if start_timestamp is provided - convert to ISO8601 format and populate startTimestamp
        payload.startTimestamp = new Date(start_timestamp).toISOString();
      }

      return this._generalCall('getHealths', payload, node);
    });

    _defineProperty(this, "getPerformances", (node_name, start_timestamp, node = -1) => {
      const payload = {};

      if (node_name) {
        // populate nodeName if specified
        payload.nodeName = node_name;
      }

      if (start_timestamp) {
        // if start_timestamp is provided - convert to ISO8601 format and populate startTimestamp
        payload.startTimestamp = new Date(start_timestamp).toISOString();
      }

      return this._generalCall('getPerformances', payload, node);
    });

    this.service = "com.cisco.ise.system";
    this.logger = owner.getLogger('pxgrid:service:system_health');
  }

}

exports.default = Srv;