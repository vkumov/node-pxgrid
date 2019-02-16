import { PxService, ServiceError } from './service';

export default class Srv extends PxService {
    constructor(owner) {
        super(owner);
        this.service = "com.cisco.ise.system";
        this.logger = owner.get_logger('pxgrid:service:system_health');
    }

    getHealths = (node_name, start_timestamp, node = -1) => {
        payload = {};
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
        payload = {};
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