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
        call: 'getSessions',
        params: ['Start Timestamp', 'NODE']
      }, {
        call: 'getSessionsByIp',
        params: ['IP', 'NODE']
      }, {
        call: 'getSessionsByMac',
        params: ['MAC', 'NODE']
      }, {
        call: 'getUserGroups',
        params: ['NODE']
      }, {
        call: 'getUserGroupByUsername',
        params: ['Username', 'NODE']
      }];
    });

    _defineProperty(this, "getSessions", (startTimestamp, node = -1) => {
      const payload = startTimestamp ? {
        "startTimestamp": new Date(startTimestamp).toISOString()
      } : {};
      return this._generalCall('getSessions', payload, node);
    });

    _defineProperty(this, "getSessionsByIp", (ip, node = -1) => {
      if (!ip) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "IP address must be specified for getSessionByIpAddress");
      }

      const payload = {
        "ipAddress": ip
      };
      return this._generalCall('getSessionByIpAddress', payload, node);
    });

    _defineProperty(this, "getSessionsByMac", (mac, node = -1) => {
      if (!mac) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "MAC address must be specified for getSessionByMacAddress");
      }

      const payload = {
        "macAddress": mac
      };
      return this._generalCall('getSessionByMacAddress', payload, node);
    });

    _defineProperty(this, "getUserGroups", (node = -1) => {
      const payload = {};
      return this._generalCall('getUserGroups', payload, node);
    });

    _defineProperty(this, "getUserGroupByUsername", (username, node = -1) => {
      if (!username) {
        throw new _service.ServiceError("INCORRECT_PARAMETERS", "Username must be provided for getUserGroupByUserName");
      }

      const payload = {
        "userName": username
      };
      return this._generalCall('getUserGroupByUserName', payload, node);
    });

    this.service = "com.cisco.ise.session";
    this.logger = owner.getLogger('pxgrid:service:session_directory');
  }

}

exports.default = Srv;