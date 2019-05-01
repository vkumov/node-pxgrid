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
        call: 'getProfiles',
        params: ['NODE']
      }];
    });

    _defineProperty(this, "getProfiles", (node = -1) => {
      const payload = {};
      return this._generalCall('getProfiles', payload, node);
    });

    this.service = "com.cisco.ise.config.profiler";
    this.logger = owner.getLogger('pxgrid:service:profiler_config');
  }

}

exports.default = Srv;