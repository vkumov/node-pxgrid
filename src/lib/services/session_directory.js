import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor(owner) {
        super(owner);
        this.service = "com.cisco.ise.session";
        this.logger = owner.getLogger('pxgrid:service:session_directory');
    }

    getSessions = (startTimestamp, node = -1) => {
        payload = startTimestamp ? {
            "startTimestamp": new Date(startTimestamp).toISOString(),
        } : {};
        return this._generalCall('getSessions', payload, node);
    }

    getSessionsByIp = (ip, node = -1) => {
        if (!ip) {
            throw new ServiceError("INCORRECT_PARAMETERS", "IP address must be specified for getSessionByIpAddress");
        }
        payload = {
            "ipAddress": ip,
        };
        return this._generalCall('getSessionByIpAddress', payload, node);
    }

    getSessionsByMac = (mac, node = -1) => {
        if (!mac) {
            throw new ServiceError("INCORRECT_PARAMETERS", "MAC address must be specified for getSessionByMacAddress");
        }
        payload = {
            "macAddress": mac,
        };
        return this._generalCall('getSessionByMacAddress', payload, node);
    }

    getUserGroups = (node = -1) => {
        payload = {};
        return this._generalCall('getUserGroups', payload, node);
    }

    getUserGroupByUsername = (username, node = -1) => {
        if (!username) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Username must be provided for getUserGroupByUserName");
        }
        payload = {
            "userName": username,
        };
        return this._generalCall('getUserGroupByUserName', payload, node);
    }
}