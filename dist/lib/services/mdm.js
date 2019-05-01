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
        call: 'getEndpoints',
        params: ['Filter', 'NODE']
      }, {
        call: 'getEndpointByMac',
        params: ['MAC', 'NODE']
      }, {
        call: 'getEndpointsByType',
        params: ['EP type:NON_COMPLIANT,REGISTERED,DISCONNECTED', 'NODE']
      }, {
        call: 'getEndpointsByOsType',
        params: ['OS type:ANDROID,IOS,WINDOWS', 'NODE']
      }];
    });

    _defineProperty(this, "getEndpoints", (filter, node = -1) => {
      const payload = filter ? {
        filter
      } : {};
      return this._generalCall('getEndpoints', payload, node);
    });

    _defineProperty(this, "getEndpointByMac", (mac, node = -1) => {
      if (!mac) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "MAC address must be specified for getEndpointByMacAddress");
      }

      const payload = {
        "macAddress": mac
      };
      return this._generalCall('getEndpointByMacAddress', payload, node);
    });

    _defineProperty(this, "getEndpointsByType", (ep_type, node = -1) => {
      ep_type = ep_type.toUpperCase();

      if (!['NON_COMPLIANT', 'REGISTERED', 'DISCONNECTED'].includes(ep_type)) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Type can be one of: NON_COMPLIANT, REGISTERED or DISCONNECTED");
      }

      const payload = {
        "type": ep_type
      };
      return this._generalCall('getEndpointsByType', payload, node);
    });

    _defineProperty(this, "getEndpointsByOsType", (os_type, node = -1) => {
      os_type = os_type.toUpperCase();

      if (!['ANDROID', 'IOS', 'WINDOWS'].includes(os_type)) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Type should be one of: ANDROID, IOS or WINDOWS");
      }

      const payload = {
        "osType": os_type
      };
      return this._generalCall('getEndpointsByOsType', payload, node);
    });

    this.service = "com.cisco.ise.mdm";
    this.logger = owner.getLogger('pxgrid:service:mdm');
  }

}

exports.default = Srv;