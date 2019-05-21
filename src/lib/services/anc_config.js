import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor(owner) {
        super(owner);
        this.service = "com.cisco.ise.config.anc";
        this.logger = owner.getLogger('pxgrid:service:anc_config');
    }

    restCalls = (services) => {
        return [
            { call: 'getPolicies',        params: ['NODE'] },
            { call: 'getPolicyByName',    params: ['Name', 'NODE'] },
            { call: 'createPolicy',       params: ['Policy', 'NODE'] },
            { call: 'deletePolicyByName', params: ['Name', 'NODE'] },
            { call: 'getEndpoints',       params: ['NODE'] },
            { call: 'getEndpointByMac',   params: ['MAC', 'NODE'] },
            { call: 'applyEndpointByIp',  params: ['IP', 'Policy', 'NODE'] },
            { call: 'applyEndpointByMac', params: ['MAC', 'Policy', 'NODE'] },
            { call: 'clearEndpointByIp',  params: ['IP', 'Policy', 'NODE'] },
            { call: 'clearEndpointByMac', params: ['MAC', 'Policy', 'NODE'] },
            { call: 'getOperationStatus', params: ['ID', 'NODE'] },
        ];
    }

    /** 
     * Policy REST calls
     */

    getPolicies = (node = -1) => {
        const payload = {};
        return this._generalCall('getPolicies', payload, node);
    }

    getPolicyByName = (name, node = -1) => {
        if (!name) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for getPolicyByName");
        }
        const payload = {
            "name": name,
        };
        return this._generalCall('getPolicyByName', payload, node);
    }

    createPolicy = (policy, node = -1) => {
        if (!policy) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Policy object must be specified for createPolicy");
        }
        // TODO: add additional checks
        return this._generalCall('createPolicy', policy, node);
    }

    deletePolicyByName = (name, node = -1) => {
        if (!name) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for deletePolicyByName");
        }
        const payload = {
            "name": name,
        };
        return this._generalCall('getPolicyByName', payload, node);
    }

    /**
     * Endpoint REST calls
     */

    getEndpoints = (node = -1) => {
        const payload = {};
        return this._generalCall('getEndpoints', payload, node);
    }

    getEndpointByMac = (mac, node = -1) => {
        if (!mac) {
            throw new ServiceError("INCORRECT_PARAMETERS", "MAC Address must be specified for getEndpointByMacAddress");
        }
        const payload = {
            "macAddress": mac,
        };
        return this._generalCall('getEndpointByMacAddress', payload, node);
    }

    applyEndpointByIp = (ip, policy, node = -1) => {
        if (!ip) {
            throw new ServiceError("INCORRECT_PARAMETERS", "IP Address must be specified for applyEndpointByIpAddress");
        }
        if (!policy) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for applyEndpointByIpAddress");
        }
        const payload = {
            "policyName": policy,
            "ipAddress": ip,
        };
        return this._generalCall('applyEndpointByIpAddress', payload, node);
    }

    applyEndpointByMac = (mac, policy, node = -1) => {
        if (!mac) {
            throw new ServiceError("INCORRECT_PARAMETERS", "MAC Address must be specified for applyEndpointByMacAddress");
        }
        if (!policy) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for applyEndpointByMacAddress");
        }
        const payload = {
            "policyName": policy,
            "macAddress": mac,
        };
        return this._generalCall('applyEndpointByMacAddress', payload, node);
    }

    clearEndpointByIp = (ip, policy, node = -1) => {
        if (!ip) {
            throw new ServiceError("INCORRECT_PARAMETERS", "IP Address must be specified for clearEndpointByIpAddress");
        }
        if (!policy) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for clearEndpointByIpAddress");
        }
        const payload = {
            "policyName": policy,
            "ipAddress": ip,
        };
        return this._generalCall('clearEndpointByIpAddress', payload, node);
    }

    clearEndpointByMac = (mac, policy, node = -1) => {
        if (!mac) {
            throw new ServiceError("INCORRECT_PARAMETERS", "MAC Address must be specified for clearEndpointByMacAddress");
        }
        if (!policy) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for clearEndpointByMacAddress");
        }
        const payload = {
            "policyName": policy,
            "macAddress": mac,
        };
        return this._generalCall('clearEndpointByMacAddress', payload, node);
    }

    getOperationStatus = (id, node = -1) => {
        if (!id) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Operation ID must be specified for getOperationStatus");
        }
        const payload = {
            "operationId": id,
        }
        return this._generalCall('getOperationStatus', payload, node);
    }
}