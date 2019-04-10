"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PxNodes = exports.PxNodeProperties = exports.PxNode = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PxNode = function PxNode(service_name, node_name) {
  var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var secret = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  _classCallCheck(this, PxNode);

  this.service = service_name;
  this.node_name = node_name;
  this.properties = new PxNodeProperties(properties);
  this.secret = secret;
};

exports.PxNode = PxNode;

var PxNodeProperties = function PxNodeProperties() {
  var _this = this;

  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, PxNodeProperties);

  Object.keys(properties).forEach(function (k) {
    _this[k] = properties[k];
  });
};

exports.PxNodeProperties = PxNodeProperties;
var _Symbol$iterator = Symbol.iterator;

var PxNodes =
/*#__PURE__*/
function () {
  function PxNodes() {
    var _this2 = this;

    var _nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, PxNodes);

    _defineProperty(this, "forEach", function (cb) {
      _this2.nodes.forEach(cb);
    });

    _defineProperty(this, "populate", function (nodes) {
      if (!Array.isArray(nodes)) {
        throw 'Array of nodes should be provided';
      }

      nodes.forEach(function (_ref) {
        var serviceName = _ref.serviceName,
            nodeName = _ref.nodeName,
            properties = _ref.properties;

        _this2.add(new PxNode(serviceName, nodeName, properties));
      });
    });

    _defineProperty(this, "node", function (node) {
      if (node == parseInt(node)) {
        return _this2._nodeById(parseInt(node));
      }

      return _this2._nodeByName(node);
    });

    _defineProperty(this, "add", function (node) {
      if (!node instanceof PxNode) {
        throw "Node should be an instance of PxNode class";
      }

      _this2.nodes.push(node);
    });

    _defineProperty(this, "delete", function (node) {
      if (node == parseInt(node)) {
        return _this2._delById(parseInt(node));
      }

      return _this2._delByName(node);
    });

    _defineProperty(this, "clear", function () {
      _this2.nodes = [];
    });

    _defineProperty(this, "isEmpty", function () {
      return !_this2.nodes.length;
    });

    _defineProperty(this, "_nodeIdByName", function (name) {
      var idx = _this2.nodes.findIndex(function (node) {
        return node.node_name === name;
      });

      if (idx >= 0) {
        return idx;
      }

      throw "Node with name '".concat(name, "' doesn't exist in the list");
    });

    _defineProperty(this, "_nodeById", function (id) {
      return id < 0 ? _this2.nodes : _this2.nodes[id];
    });

    _defineProperty(this, "_nodeByName", function (name) {
      return _this2._nodeById(_this2._nodeIdByName(name));
    });

    _defineProperty(this, "_delById", function (id) {
      return _this2.nodes.splice(id, 1);
    });

    _defineProperty(this, "_delByName", function (name) {
      return _this2.nodes.splice(_this2._nodeIdByName(name), 1);
    });

    this.nodes = _nodes;
    this._current_idx = -1;
  }

  _createClass(PxNodes, [{
    key: _Symbol$iterator,
    value: function value() {
      return this.nodes[Symbol.iterator]();
    }
  }]);

  return PxNodes;
}();

exports.PxNodes = PxNodes;