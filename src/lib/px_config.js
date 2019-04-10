"use strict";
const tls = require('tls');
const winston = require('winston');
const { format } = winston;

import { transports } from './utils/logging';
import { setUtilsLogger } from './utils/net';

export const PX_INET4  = 1;
export const PX_INET46 = 2;
export const PX_INET64 = 3;
export const PX_INET6  = 4;

export const VERIFY_NONE = 'VERIFY_NONE';
export const VERIFY_CA   = 'VERIFY_CA';
export const VERIFY_ALL  = 'VERIFY_ALL';

function matchRule(str, rule) {
    return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}

export class PxConfig {
    constructor(options = {}) {
        this.nodename = typeof options.nodename !== 'undefined' ? options.nodename : '';
        this.username = typeof options.username !== 'undefined' ? options.username : this.nodename;
        this.password = typeof options.password !== 'undefined' ? options.password : '';
        this.description = typeof options.description !== 'undefined' ? options.description : '';
        this.verify = typeof options.verify !== 'undefined' ? options.verify : VERIFY_ALL;

        this.dns = options.dns || [];
        this.inetFamily = typeof options.inetFamily !== 'undefined' ? options.inetFamily : PX_INET46;

        this._hosts = [];
        options.hosts = (typeof options.hosts !== 'undefined' && Array.isArray(options.hosts)) ? options.hosts : [];
        options.hosts.forEach(h => this.addHost(h));

        this._clientcert = typeof options.clientcert !== 'undefined' ? options.clientcert : '';
        this._clientkey = typeof options.clientkey !== 'undefined' ? options.clientkey : '';
        this._clientkeypassword = typeof options.clientkeypassword !== 'undefined' ? options.clientkeypassword : '';

        this.debugs = (options.debugs || process.env.DEBUG || '').split(',');
        this.loggers = [];

        this.logger = this.getLogger('pxgrid:config');
        setUtilsLogger(this.getLogger);
    }

    get dns() {
        return this._dns;
    }

    set dns(new_dns) {
        if (new_dns && !Array.isArray(new_dns)) {
            throw new TypeError('Must be an array of new DNS servers');
        }
        this._dns = new_dns;
    }

    get inetFamily() {
        return this._inetFamily;
    }

    set inetFamily(nv) {
        if (![PX_INET4, PX_INET46, PX_INET64, PX_INET6].includes(nv)) {
            throw new PxConfigError('WRONG_INET_FAMILY', "Wrong internet family");
        }
        this._inetFamily = nv;
    }

    get hostsLength() {
        return this._hosts.length;
    }

    getHostName = (idx = 0) => {
        return this._hosts[idx].host;
    }

    getHostId = (name, zeroIfNotFound = true) => {
        name = name.toLowerCase();
        let r = this._hosts.findIndex(h => h.host === name);
        if (r < 0) {
            this.logger.debug(`${name} not found in hosts`);
        }
        return (r < 0 && zeroIfNotFound) ? 0 : r;
    }

    forEachHost = (cb) => {
        this._hosts.forEach((h, idx) => {
            cb(h, idx);
        })
    }

    addHost = (options, checkIfAdded = true) => {
        if (!options) {
            throw new PxConfigError('NO_OPTIONS', 'No options for new host');
        }
        if (!options.hasOwnProperty('host')) {
            throw new PxConfigError('NO_OPTIONS_HOST', 'No host name provided');
        }
        if (!options.hasOwnProperty('ca')) {
            throw new PxConfigError('NO_OPTIONS_CA', 'No ca data for new host provided');
        }

        if (checkIfAdded && this._hosts.findIndex(h => h.host === options.host) >= 0) {
            return;
        }

        this._hosts.push({
            host: options.host.toLowerCase(),
            ca: options.ca,
        });
    }

    setClientcert = (cert, key, keyPassword) => {
        this._clientcert = cert;
        this._clientkey = key;
        this._clientkeypassword = keyPassword;
    }

    getHttpsOptions = (hostIdx = 0) => {
        return {
            ca: this._hosts[hostIdx].ca,
            cert: this._clientcert,
            key: this._clientkey,
            passphrase: this._clientkeypassword,
            rejectUnauthorized: this.verify === VERIFY_NONE ? false : true,
            checkServerIdentity: this.checkServerIdentity,
        }
    }

    checkServerIdentity = (servername, cert) => {
        if (this.verify !== VERIFY_ALL) {
            return undefined;
        }

        return tls.checkServerIdentity(servername, cert);
    }

    _isDebug = (component) => {
        let idx = this.debugs.findIndex(d => {
            return matchRule(component, d);
        });
        return idx >= 0;
    }

    _addLogger = (component) => {
        winston.loggers.add(component, {
            format: format.combine(
                format.label({
                    label: component
                }),
                format.json()
            ),
            level: this._isDebug(component) ? 'debug' : 'info',
            transports: transports,
        });

        this.loggers.push({
            component: component,
            logger: winston.loggers.get(component),
        });

        return this.loggers[this.loggers.length - 1].logger;
    }

    getLogger = (component) => {
        let result = this.loggers.findIndex(l => {
            return l.component === component;
        });
        if (result >= 0) {
            return this.loggers[result].logger;
        }
        return this._addLogger(component);
    }
}

export class PxConfigError extends Error {
    /**
     * Internal service error.
     */
    constructor(code, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, PxConfigError);
        }

        this.code = code
    }
}