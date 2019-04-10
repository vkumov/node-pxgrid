import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor(owner) {
        super(owner);
        this.service = "com.cisco.ise.radius";
        this.logger = owner.getLogger('pxgrid:service:radius');
    }
    
    restCalls = (services) => {
        return [
            { call: 'getFailures', params: ['Start Timestamp','NODE'] },
            { call: 'getFailureById', params: ['ID','NODE'] },
        ];
    }

    getFailures = (startTimestamp, node = -1) => {
        const payload = startTimestamp ? {
            "startTimestamp": new Date(startTimestamp).toISOString(),
        } : {};

        return this._generalCall('getFailures', payload, node);
    }

    getFailureById = (id, node = -1) => {
        if (!id) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Failure ID must be specified for getFailureById");
        }
        const payload = {
            id
        };
        return this._generalCall('getFailureById', payload, node);
    }
}