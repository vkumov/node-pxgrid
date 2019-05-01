"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceError = exports.PxService = void 0;

var _events = _interopRequireDefault(require("events"));

var _px_nodes = require("../px_nodes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SERVICE_NOT_INIT = 'UNINITIALIZED';

class PxService extends _events.default {
  constructor(owner) {
    super();

    _defineProperty(this, "initialized", () => {
      /**
       * Checks if service was initialized. Throws an exception if not.
       * 
       * @return true
       */
      if (!this._initialized) {
        throw new ServiceError('UNINITIALIZED', "Service wasn't initialized correctly");
      }

      return true;
    });

    _defineProperty(this, "_generalCall", async (call, payload, node = -1) => {
      /**
       * Wrapper for every REST call. Checks nodes and executes the call.
       * 
       * @param {String} call      the REST call to perform.
       * @param {Any}    payload   payload if needed.
       * @param {Number} [node=-1] node idx if needed, or -1 to get from first available.
       * 
       * @return response of _goThroughNodes.
       */
      this.initialized();

      if (this.logger) {
        this.logger.debug(`About to make ${call} call`);
      }

      await this.checkNodes();
      let r = await this._goThroughNodes(call, payload, node);
      this.emit(`${call}Success`, r);
      return r;
    });

    _defineProperty(this, "lookup", async () => {
      /**
       * Service Lookup of the service.
       */
      this.initialized();
      this.logger.debug('Service lookup');
      let r = await this.owner.serviceLookup(this.service);

      if (r.code != 200) {
        throw new ServiceError('BAD_RESPONSE', `Got unexpected response from host: ${r.code}: ${r.content}`);
      }

      this.nodes.populate(r.content.services);
    });

    _defineProperty(this, "secret", async node => {
      /**
       * Update Access Secret for one node.
       * 
       * @param {Object} node node for which access secret should be updated.
       */
      this.initialized();
      this.logger.debug(`Updating secret of ${node}`);
      let r = await this.owner.accessSecret(node.node_name);

      if (r.code != 200) {
        throw new ServiceError('BAD_RESPONSE', `Got unexpected response from host: ${r.code}: ${r.content}`);
      }

      node.secret = r.content.secret;
    });

    _defineProperty(this, "updateSecrets", async () => {
      /**
       * Update Access Secrets for all nodes.
       * 
       * @return {Object} successfull and failed nodes
       */
      this.initialized();
      this.logger.debug('Updating secrets');
      let r = {
        success: [],
        fail: []
      };

      if (this.nodes.isEmpty()) {
        throw new ServiceError('NO_NODES', `No nodes for the service ${this.service}`);
      }

      for (node of this.nodes) {
        try {
          await this.secret(node);
          r.success.push(n.node_name);
        } catch (e) {
          if (this.logger) {
            this.logger.warn(`Error while communicating with ${n.node_name}: ${e.message}`);
          }

          r.fail.push(n.node_name);
        }
      }

      return r;
    });

    _defineProperty(this, "checkNodes", async (force = false) => {
      /**
       * Perform Service Lookup if needed, raise error if no nodes returned.
       * 
       * @param {Boolean} force perform lookup even if it was performed already.
       */
      this.initialized();
      this.logger.debug(`Checking nodes, empty: ${this.nodes.isEmpty()}`);

      if (this.nodes.isEmpty() || force) {
        this.logger.debug('Looking up nodes');
        await this.lookup();
      }

      if (this.nodes.isEmpty()) {
        throw new ServiceError("NO_NODES", `No nodes for the service ${this.service}`);
      }

      return true;
    });

    _defineProperty(this, "_goThroughNodes", async (call, payload, node = -1) => {
      /**
       * Perform a REST call, go through all nodes, return first successful.
       * 
       * @param {String} call      the call itself
       * @param {Any}    payload   payload data
       * @param {Number} [node=-1] if call should go to one specific node - it is its index
       * 
       * @return result of REST call
       */
      this.initialized();
      this.logger.debug(`Go through nodes, node: ${node}`);
      let ns = this.nodes.node(node);
      this.logger.debug(`Nodes: ${JSON.stringify(ns)}`);

      if (!Array.isArray(ns)) {
        ns = [ns];
      }

      for (const n of ns) {
        this.logger.debug(`Trying ${n.node_name}`);

        try {
          if (!n.secret) {
            await this.secret(n);
          }

          let r = await this.owner.sendRestRequest(`${n.properties.restBaseUrl}/${call}`, payload, n.secret);

          if (r.code >= 200 && r.code < 300) {
            this.emit('restCallSuccess', call, n, r);
            return r;
          }

          if (this.logger) {
            this.logger.debug(`Got not 2** response for a call to ${n.node_name}:\n${r.code}: ${JSON.stringify(r.content)}`);
          }

          this.emit(`${call}Error`, n, r);
          return r;
        } catch (e) {
          if (this.logger) {
            this.logger.warn(`Error while communicating with ${n.node_name}: ${e.message}`);
          }

          throw e;
        }
      }
    });

    _defineProperty(this, "findProperty", async (property, node = -1) => {
      this.initialized();
      this.logger.debug(`Looking for property: ${property}`);
      await this.checkNodes();
      let ns = this.nodes.node(node);
      this.logger.debug(`Nodes: ${JSON.stringify(ns)}`);

      if (!Array.isArray(ns)) {
        ns = [ns];
      }

      const result = [];
      ns.forEach(n => n.properties.hasOwnProperty(property) && result.push(n.properties[property]));
      return result;
    });

    this.owner = owner;
    this.nodes = new _px_nodes.PxNodes();
    this.logger = null;
    this._service = SERVICE_NOT_INIT;
    this._initialized = false;
  }

  get service() {
    return this._service;
  }

  set service(val) {
    if (this._service !== SERVICE_NOT_INIT) {
      throw new ServiceError('ALREADY_INIT', "Service cannot be re-initialized");
    }

    this._service = val;
    this._initialized = true;
  }

}

exports.PxService = PxService;

class ServiceError extends Error {
  /**
   * Internal service error.
   */
  constructor(code, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServiceError);
    }

    this.code = code;
  }

}

exports.ServiceError = ServiceError;