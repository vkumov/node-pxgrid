"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dnsLookup = exports.isPortOpen = exports.postRequest = void 0;

var _net = _interopRequireDefault(require("net"));

var _dns = _interopRequireDefault(require("dns"));

var _url = require("url");

var _axios = _interopRequireDefault(require("axios"));

var _https = _interopRequireDefault(require("https"));

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var logger = _winston.default.loggers.get('pxgrid:utils:net');

var postRequest =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(url, ip, payload, headers, httpsOptions) {
    var o, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            /**
             * Send HTTPS POST request over SSL socket.
             * 
             * @param {string} url          full url.
             * @param {string} ip           ip of the server.
             * @param {object} payload      payload to send.
             * @param {object} headers      additional headers.
             * @param {object} httpsOptions options for HTTPS Agent.
             * 
             * @return {object} axios response
             */
            if (typeof payload !== 'string') {
              payload = JSON.stringify(payload);
            }

            o = new _url.URL(url);
            headers.Host = o.hostname;
            o.hostname = ip;
            o.port = o.port || 8910;
            httpsOptions.keepAlive = typeof httpsOptions.keepAlive === 'undefined' ? true : httpsOptions.keepAlive;
            _context.next = 8;
            return _axios.default.post(o.href, payload, {
              headers: headers,
              httpsAgent: new _https.default.Agent(httpsOptions)
            });

          case 8:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function postRequest(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.postRequest = postRequest;

var isPortOpen =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(ip, port) {
    var s;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            s = new _net.default.Socket();
            s.setTimeout(2000);
            _context2.prev = 2;
            _context2.next = 5;
            return s.connect({
              port: port,
              host: ip,
              family: _net.default.isIP(ip)
            });

          case 5:
            _context2.next = 7;
            return s.destroy();

          case 7:
            return _context2.abrupt("return", true);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", false);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[2, 10]]);
  }));

  return function isPortOpen(_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.isPortOpen = isPortOpen;

var dnsLookup = function dnsLookup(domainName) {
  var servers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var recordtype = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return new Promise(function (resolve, reject) {
    var oldServers = _dns.default.getServers();

    if (servers) {
      _dns.default.setServers(servers);
    }

    if (_net.default.isIP(domainName)) {
      resolve([domainName]);
    }

    recordtype = recordtype ? recordtype : 'A';

    _dns.default.resolve(domainName, recordtype, function (err, address) {
      _dns.default.setServers(oldServers);

      if (err) {
        reject(err);
      }

      try {
        logger.debug("".concat(domainName, " resolved in ").concat(address));
      } catch (e) {}

      resolve(address);
    });
  });
};

exports.dnsLookup = dnsLookup;