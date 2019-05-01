"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transports = void 0;

var _winston = _interopRequireWildcard(require("winston"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const transports = [new _winston.default.transports.Console({
  level: 'debug',
  json: false,
  colorize: true,
  format: _winston.format.combine(_winston.format.colorize(), _winston.format.timestamp(), _winston.format.printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`))
})];
exports.transports = transports;