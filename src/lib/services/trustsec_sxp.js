import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor (owner) {
        super(owner);
        this.service = "com.cisco.ise.sxp";
        this.logger = owner.getLogger('pxgrid:service:trustsec_sxp');
    }
    
    restCalls = (services) => {
        return [
            { call: 'getBindings',    params: ['NODE'] },
        ];
    }

    getBindings = (node=-1) => {
        const payload = {};
        return this._generalCall('getBindings', payload, node);
    }
}