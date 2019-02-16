import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor (owner) {
        super(owner);
        this.service = "com.cisco.endpoint.asset";
        this.logger = owner.get_logger('pxgrid:service:endpoint_asset');
    }
}