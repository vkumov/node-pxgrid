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
        call: 'getBindings',
        params: ['NODE']
      }];
    });

    _defineProperty(this, "getBindings", (node = -1) => {
      const payload = {};
      return this._generalCall('getBindings', payload, node);
    });

    this.service = "com.cisco.ise.sxp";
    this.logger = owner.getLogger('pxgrid:service:trustsec_sxp');
  }

}

exports.default = Srv;