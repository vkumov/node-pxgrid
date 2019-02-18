"use strict";

import EventEmitter from 'events';
import { PxNodes } from '../px_nodes';

const SERVICE_NOT_INIT = 'UNINITIALIZED';

export class PxService extends EventEmitter {
    constructor(owner) {
        super();
        this.owner = owner;
        this.nodes = new PxNodes();
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

    initialized = () => {
        /**
         * Checks if service was initialized. Throws an exception if not.
         * 
         * @return true
         */
        if (!this._initialized) {
            throw new ServiceError('UNINITIALIZED', "Service wasn't initialized correctly");
        }
        return true;
    }

    _generalCall = async (call, payload, node = -1) => {
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

        if (this.logger) { this.logger.debug(`About to make ${call} call`); }

        await this.checkNodes();
        let r = await this._goThroughNodes(call, payload, node);
        this.emit(`${call}Success`, r);
        return r;
    }

    lookup = async () => {
        /**
         * Service Lookup of the service.
         */
        this.initialized();

        let r = await this.owner.serviceLookup(this.service);
        if (r.code != 200) {
            throw new ServiceError('BAD_RESPONSE', `Got unexpected response from host: ${r.code}: ${r.content}`);
        }

        this.nodes.populate(r.content.services);
    }

    secret = async (node) => {
        /**
         * Update Access Secret for one node.
         * 
         * @param {Object} node node for which access secret should be updated.
         */
        this.initialized();

        let r = await this.owner.accessSecret(node.node_name);
        if (r.code != 200) {
            throw new ServiceError('BAD_RESPONSE', `Got unexpected response from host: ${r.code}: ${r.content}`);
        }

        node.secret = r.content.secret;
    }

    updateSecrets = async () => {
        /**
         * Update Access Secrets for all nodes.
         * 
         * @return {Object} successfull and failed nodes
         */
        this.initialized();

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
            } catch (e) {
                if (this.logger) { this.logger.warn(`Error while communicating with ${n.node_name}: ${e.message}`); }
                r.fail.push(n.node_name);
                continue;
            }
            r.success.push(n.node_name);
        }

        return r;
    }

    checkNodes = async (force = false) => {
        /**
         * Perform Service Lookup if needed, raise error if no nodes returned.
         * 
         * @param {Boolean} force perform lookup even if it was performed already.
         */
        this.initialized();

        if (this.nodes.isEmpty() || force) {
            await this.lookup();
        }

        if (this.nodes.isEmpty()) {
            throw new ServiceError("NO_NODES", `No nodes for the service ${this.service}`);
        }
        return true;
    }

    _goThroughNodes = async (call, payload, node = -1) => {
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

        let ns = this.nodes.node(node);
        if (!Array.isArray(ns)) {
            ns = [ns];
        }

        for (const n of ns) {
            try {
                if (!n.secret) {
                    this.secret(n);
                }
                let r = await this.owner.sendRestRequest(`${n.properties.restBaseUrl}/${call}`, payload, n.secret);
                if (r.code >= 200 && r.code < 300) {
                    this.emit('restCallSuccess', call, n, r);
                    return r;
                }
                if (this.logger) { this.logger.debug(`Got not 2** response for a call to ${n.node_name}:\n${r.code}: ${r.content}`); }
                this.emit(`${call}Error`, n, r);
            } catch (e) {
                if (this.logger) { this.logger.warn(`Error while communicating with ${n.node_name}: ${e.message}`); }
            }
        }
    }
}

export class ServiceError extends Error {
    /**
     * Internal service error.
     */
    constructor(code, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServiceError);
        }

        this.code = code
    }
}