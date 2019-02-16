import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor (owner) {
        super(owner);
        this.service = "com.cisco.ise.sxp";
        this.logger = owner.getLogger('pxgrid:service:trustsec_sxp');
    }

    getBindings = (node=-1) => {
        payload = {};
        return this._generalCall('getBindings', payload, node);
    }
}