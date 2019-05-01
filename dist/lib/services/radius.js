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
        call: 'getFailures',
        params: ['Start Timestamp', 'NODE']
      }, {
        call: 'getFailureById',
        params: ['ID', 'NODE']
      }];
    });

    _defineProperty(this, "getFailures", (startTimestamp, node = -1) => {
      const payload = startTimestamp ? {
        "startTimestamp": new Date(startTimestamp).toISOString()
      } : {};
      return this._generalCall('getFailures', payload, node);
    });

    _defineProperty(this, "getFailureById", (id, node = -1) => {
      if (!id) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Failure ID must be specified for getFailureById");
      }

      const payload = {
        id
      };
      return this._generalCall('getFailureById', payload, node);
    });

    this.service = "com.cisco.ise.radius";
    this.logger = owner.getLogger('pxgrid:service:radius');
  }

}

exports.default = Srv;