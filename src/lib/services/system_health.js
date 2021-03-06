import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor(owner) {
        super(owner);
        this.service = "com.cisco.ise.system";
        this.logger = owner.getLogger('pxgrid:service:system_health');
    }
    
    restCalls = (services) => {
        return [
            { call: 'getHealths',      params: ['Node Name','Start Timestamp','NODE'] },
            { call: 'getPerformances', params: ['Node Name','Start Timestamp','NODE'] },
        ];
    }

    getHealths = (node_name, start_timestamp, node = -1) => {
        const payload = {};
        if (node_name) {
            // populate nodeName if specified
            payload.nodeName = node_name;
        }
        if (start_timestamp) {
            // if start_timestamp is provided - convert to ISO8601 format and populate startTimestamp
            payload.startTimestamp = new Date(start_timestamp).toISOString();
        }
        return this._generalCall('getHealths', payload, node);
    }

    getPerformances = (node_name, start_timestamp, node = -1) => {
        const payload = {};
        if (node_name) {
            // populate nodeName if specified
            payload.nodeName = node_name;
        }
        if (start_timestamp) {
            // if start_timestamp is provided - convert to ISO8601 format and populate startTimestamp
            payload.startTimestamp = new Date(start_timestamp).toISOString();
        }
        return this._generalCall('getPerformances', payload, node);
    }
}