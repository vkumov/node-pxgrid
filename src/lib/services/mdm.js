import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor(owner) {
        super(owner);
        this.service = "com.cisco.ise.mdm";
        this.logger = owner.getLogger('pxgrid:service:mdm');
    }

    getEndpoints = (filter, node = -1) => {
        payload = filter ? {
            filter
        } : {};
        return this._generalCall('getEndpoints', payload, node);
    }

    getEndpointByMac = (mac, node = -1) => {
        if (!mac) {
            throw new ServiceError("INCORRECT_PARAMETERS", "MAC address must be specified for getEndpointByMacAddress");
        }
        payload = {
            "macAddress": mac,
        };
        return this._generalCall('getEndpointByMacAddress', payload, node);
    }

    getEndpointsByType = (ep_type, node = -1) => {
        ep_type = ep_type.toUpperCase();
        if (!['NON_COMPLIANT', 'REGISTERED', 'DISCONNECTED'].includes(ep_type)) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Type can be one of: NON_COMPLIANT, REGISTERED or DISCONNECTED");
        }
        payload = {
            "type": ep_type,
        };
        return this._generalCall('getEndpointsByType', payload, node);

    }
    getEndpointsByOsType = (os_type, node = -1) => {
        os_type = os_type.toUpperCase();
        if (!['ANDROID', 'IOS', 'WINDOWS'].includes(os_type)) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Type should be one of: ANDROID, IOS or WINDOWS");
        }
        payload = {
            "osType": os_type,
        };
        return this._generalCall('getEndpointsByOsType', payload, node);
    }
}