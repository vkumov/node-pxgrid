"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transports = void 0;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transports = {
  console: new _winston.default.transports.Console({
    level: 'warn'
  })
};
exports.transports = transports;