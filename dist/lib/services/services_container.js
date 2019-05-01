"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _service = require("./service");

var _anc_config = _interopRequireDefault(require("./anc_config"));

var _endpoint_asset = _interopRequireDefault(require("./endpoint_asset"));

var _mdm = _interopRequireDefault(require("./mdm"));

var _profiler_config = _interopRequireDefault(require("./profiler_config"));

var _pubsub = _interopRequireDefault(require("./pubsub"));

var _radius = _interopRequireDefault(require("./radius"));

var _session_directory = _interopRequireDefault(require("./session_directory"));

var _system_health = _interopRequireDefault(require("./system_health"));

var _trustsec = _interopRequireDefault(require("./trustsec"));

var _trustsec_config = _interopRequireDefault(require("./trustsec_config"));

var _trustsec_sxp = _interopRequireDefault(require("./trustsec_sxp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const pxClasses = {
  ancConfig: _anc_config.default,
  endpointAsset: _endpoint_asset.default,
  mdm: _mdm.default,
  profilerConfig: _profiler_config.default,
  pubsub: _pubsub.default,
  radius: _radius.default,
  sessionDirectory: _session_directory.default,
  systemHealth: _system_health.default,
  trustsec: _trustsec.default,
  trustsecConfig: _trustsec_config.default,
  trustsecSxp: _trustsec_sxp.default
};

class PxServices {
  constructor(_owner) {
    _defineProperty(this, "registerClass", (name, classRef, precreate = True) => {
      if (!classRef.prototype instanceof _service.PxService) {
        throw new TypeError("New class must be a subclass of PxService");
      }

      pxClasses[name] = classRef;

      if (precreate) {
        this[name] = classRef(owner);
      }
    });

    _defineProperty(this, "serviceHandler", service_name => {
      for (const key in this) {
        let el = this[key];

        if (el instanceof _service.PxService && el.service === service_name) {
          return el;
        }
      }

      throw new AttributeError(`Service "${service_name}" not defined`);
    });

    _defineProperty(this, "add", (class_name, service_name) => {
      try {
        return this.serviceHandler(service_name);
      } catch (e) {
        if (e instanceof AttributeError) {
          service_name = service_name.replace(/(?:(?:com\.)?(?:cisco\.)?(?:ise\.)?)(.*)/gi, '$1').replace(/_(\w)/gi, v => v.toUpperCase().replace('_', ''));
          this[service_name] = new pxClasses[class_name](this.owner);
          return this[service_name];
        }

        throw e;
      }
    });

    this.owner = _owner; // precreate all known

    for (const key in pxClasses) {
      if (pxClasses.hasOwnProperty(key)) {
        this[key] = new pxClasses[key](_owner);
      }
    }
  }

}

exports.default = PxServices;

class AttributeError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AttributeError);
    }
  }

}