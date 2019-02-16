"use strict";

import PxService from './service';

import ancConfig from './anc_config';
import endpointAsset from './endpoint_asset';
import mdm from './mdm';
import profilerConfig from './profiler_config';
import pubsub from './pubsub';
import radius from './radius';
import sessionDirectory from './session_directory';
import systemHealth from './system_health';
import trustsec from './trustsec';
import trustsecConfig from './trustsec_config';
import trustsecSxp from './trustsec_sxp';

const pxClasses = {
    ancConfig,
    endpointAsset,
    mdm,
    profilerConfig,
    pubsub,
    radius,
    sessionDirectory,
    systemHealth,
    trustsec,
    trustsecConfig,
    trustsecSxp,
};

export default class PxServices {
    constructor(owner) {
        this.owner = owner;
        // precreate all known
        for (const key in pxClasses) {
            if (pxClasses.hasOwnProperty(key)) {
                this[key] = new pxClasses[key](owner);
            }
        }
    }

    registerClass = (name, classRef, precreate = True) => {
        if (!classRef.prototype instanceof PxService) {
            throw new TypeError("New class must be a subclass of PxService");
        }

        pxClasses[name] = classRef;
        if (precreate) {
            this[name] = classRef(owner);
        }
    }

    serviceHandler = (service_name) => {
        for (const key in this) {
            let el = this[key];
            if (el instanceof PxService && el.service === service_name) {
                return el;
            }
        }
        throw new AttributeError(`Service "${service_name}" not defined`);
    }

    add = (class_name, service_name) => {
        try {
            return this.serviceHandler(service_name);
        } catch (e) {
            if (e instanceof AttributeError) {
                service_name = service_name
                    .replace(/(?:(?:com\.)?(?:cisco\.)?(?:ise\.)?)(.*)/gi, '$1')
                    .replace(/_(\w)/gi, v => v.toUpperCase().replace('_', ''));

                this[service_name] = new pxClasses[class_name](this.owner);
                return this[service_name];
            }
            throw e;
        }
    }
}

class AttributeError extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AttributeError);
        }
    }
}