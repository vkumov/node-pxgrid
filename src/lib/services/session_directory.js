import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor(owner) {
        super(owner);
        this.service = "com.cisco.ise.session";
        this.logger = owner.getLogger('pxgrid:service:session_directory');
    }
    
    restCalls = (services) => {
        return [
            { call: 'getSessions',            params: ['Start Timestamp','NODE'] },
            { call: 'getSessionsByIp',        params: ['IP','NODE'] },
            { call: 'getSessionsByMac',       params: ['MAC','NODE'] },
            { call: 'getUserGroups',          params: ['NODE'] },
            { call: 'getUserGroupByUsername', params: ['Username','NODE'] },
        ];
    }

    getSessions = (startTimestamp, node = -1) => {
        const payload = startTimestamp ? {
            "startTimestamp": new Date(startTimestamp).toISOString(),
        } : {};
        return this._generalCall('getSessions', payload, node);
    }

    getSessionsByIp = (ip, node = -1) => {
        if (!ip) {
            throw new ServiceError("INCORRECT_PARAMETERS", "IP address must be specified for getSessionByIpAddress");
        }
        const payload = {
            "ipAddress": ip,
        };
        return this._generalCall('getSessionByIpAddress', payload, node);
    }

    getSessionsByMac = (mac, node = -1) => {
        if (!mac) {
            throw new ServiceError("INCORRECT_PARAMETERS", "MAC address must be specified for getSessionByMacAddress");
        }
        const payload = {
            "macAddress": mac,
        };
        return this._generalCall('getSessionByMacAddress', payload, node);
    }

    getUserGroups = (node = -1) => {
        const payload = {};
        return this._generalCall('getUserGroups', payload, node);
    }

    getUserGroupByUsername = (username, node = -1) => {
        if (!username) {
            throw new ServiceError("INCORRECT_PARAMETERS", "Username must be provided for getUserGroupByUserName");
        }
        const payload = {
            "userName": username,
        };
        return this._generalCall('getUserGroupByUserName', payload, node);
    }
}