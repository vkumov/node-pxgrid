import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor(owner) {
        super(owner);
        this.service = "com.cisco.ise.config.anc";
        this.logger = owner.getLogger('pxgrid:service:anc_config');
    }

    /** 
     * Policy REST calls
     */

    getPolicies = (node = -1) => {
        payload = {};
        return this._generalCall('getPolicies', payload, node);
    }

    getPolicyByName = (name, node = -1) => {
        if (!name) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Policy name must be specified for getPolicyByName");
        }
        payload = {
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
        payload = {
            "name": name,
        };
        return this._generalCall('getPolicyByName', payload, node);
    }

    /**
     * Endpoint REST calls
     */

    getEndpoints = (node = -1) => {
        payload = {};
        return this._generalCall('getEndpoints', payload, node);
    }

    getEndpointByMac = (mac, node = -1) => {
        if (!mac) {
            throw new ServiceError("INCORRECT_PARAMETERS", "MAC Address must be specified for getEndpointByMacAddress");
        }
        payload = {
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
        payload = {
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
        payload = {
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
        payload = {
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
        payload = {
            "policyName": policy,
            "macAddress": mac,
        };
        return this._generalCall('clearEndpointByMacAddress', payload, node);
    }

    getOperationStatus = (id, node = -1) => {
        if (!id) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Operation ID must be specified for getOperationStatus");
        }
        payload = {
            "operationId": id,
        }
        return this._generalCall('getOperationStatus', payload, node);
    }
}