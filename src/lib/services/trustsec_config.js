import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor(owner) {
        super(owner);
        this.service = "com.cisco.ise.config.trustsec";
        this.logger = owner.getLogger('pxgrid:service:trustsec_config');
    }
    
    restCalls = (services) => {
        return [
            { call: 'getSecurityGroups',    params: ['ID','NODE'] },
            { call: 'getSecurityGroupAcls', params: ['ID','NODE'] },
            { call: 'getEgressPolicies',    params: ['NODE'] },
            { call: 'getEgressMatrices',    params: ['NODE'] },
        ];
    }

    getSecurityGroups = (id, node = -1) => {
        const payload = typeof id !== 'undefined' ? {
            id
        } : {};
        return this._generalCall('getSecurityGroups', payload, node);
    }

    getSecurityGroupAcls = (id, node = -1) => {
        const payload = typeof id !== 'undefined' ? {
            id
        } : {};
        return this._generalCall('getSecurityGroupAcls', payload, node);
    }

    getEgressPolicies = (node = -1) => {
        const payload = {}
        return this._generalCall('getEgressPolicies', payload, node);
    }

    getEgressMatrices = (node = -1) => {
        const payload = {}
        return this._generalCall('getEgressMatrices', payload, node);
    }
}