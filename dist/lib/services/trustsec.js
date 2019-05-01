"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _service = require("./service");

class Srv extends _service.PxService {
  constructor(owner) {
    super(owner);
    this.service = "com.cisco.ise.trustsec";
    this.logger = owner.getLogger('pxgrid:service:trustsec');
  }

}

exports.default = Srv;