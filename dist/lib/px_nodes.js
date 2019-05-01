"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PxNodes = exports.PxNodeProperties = exports.PxNode = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PxNode {
  constructor(service_name, node_name, properties = {}, secret = '') {
    this.service = service_name;
    this.node_name = node_name;
    this.properties = new PxNodeProperties(properties);
    this.secret = secret;
  }

}

exports.PxNode = PxNode;

class PxNodeProperties {
  constructor(properties = {}) {
    Object.keys(properties).forEach(k => {
      this[k] = properties[k];
    });
  }

}

exports.PxNodeProperties = PxNodeProperties;
var _Symbol$iterator = Symbol.iterator;

class PxNodes {
  constructor(_nodes = []) {
    _defineProperty(this, "forEach", cb => {
      this.nodes.forEach(cb);
    });

    _defineProperty(this, "populate", nodes => {
      if (!Array.isArray(nodes)) {
        throw 'Array of nodes should be provided';
      }

      nodes.forEach(({
        serviceName,
        nodeName,
        properties
      }) => {
        this.add(new PxNode(serviceName, nodeName, properties));
      });
    });

    _defineProperty(this, "node", node => {
      if (node == parseInt(node)) {
        return this._nodeById(parseInt(node));
      }

      return this._nodeByName(node);
    });

    _defineProperty(this, "add", node => {
      if (!node instanceof PxNode) {
        throw "Node should be an instance of PxNode class";
      }

      this.nodes.push(node);
    });

    _defineProperty(this, "delete", node => {
      if (node == parseInt(node)) {
        return this._delById(parseInt(node));
      }

      return this._delByName(node);
    });

    _defineProperty(this, "clear", () => {
      this.nodes = [];
    });

    _defineProperty(this, "isEmpty", () => {
      return !this.nodes.length;
    });

    _defineProperty(this, "_nodeIdByName", name => {
      let idx = this.nodes.findIndex(node => node.node_name === name);

      if (idx >= 0) {
        return idx;
      }

      throw `Node with name '${name}' doesn't exist in the list`;
    });

    _defineProperty(this, "_nodeById", id => {
      return id < 0 ? this.nodes : this.nodes[id];
    });

    _defineProperty(this, "_nodeByName", name => {
      return this._nodeById(this._nodeIdByName(name));
    });

    _defineProperty(this, "_delById", id => {
      return this.nodes.splice(id, 1);
    });

    _defineProperty(this, "_delByName", name => {
      return this.nodes.splice(this._nodeIdByName(name), 1);
    });

    this.nodes = _nodes;
    this._current_idx = -1;
  }

  [_Symbol$iterator]() {
    return this.nodes[Symbol.iterator]();
  }

}

exports.PxNodes = PxNodes;