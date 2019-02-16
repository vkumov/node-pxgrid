import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor (owner) {
        super(owner);
        this.service = "com.cisco.ise.trustsec";
        this.logger = owner.getLogger('pxgrid:service:trustsec');
    }
}