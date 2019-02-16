import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor(owner) {
        super(owner);
        this.service = "com.cisco.ise.config.profiler";
        this.logger = owner.getLogger('pxgrid:service:profiler_config');
    }

    getProfiles = (node = -1) => {
        payload = {};
        return this._generalCall('getProfiles', payload, node);
    }
}