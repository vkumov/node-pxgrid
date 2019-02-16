"use strict";

import NET from 'net';
import DNS from 'dns';
import URL from 'url';
import axios from 'axios';
import https from 'https';
import winston from 'winston';

const logger = winston.loggers.get('pxgrid:utils:net');

export const postRequest = async (url, ip, payload, headers, httpsOptions) => {
    /**
     * Send HTTPS POST request over SSL socket.
     * 
     * @param {string} url          full url.
     * @param {string} ip           ip of the server.
     * @param {object} payload      payload to send.
     * @param {object} headers      additional headers.
     * @param {object} httpsOptions options for HTTPS Agent.
     * 
     * @return {object} axios response
     */

    if (typeof payload !== 'string') {
        payload = JSON.stringify(payload);
    }

    let o = new URL(url);
    headers.Host = o.hostname;

    o.hostname = ip;
    o.port = o.port || 8910;
    httpsOptions.keepAlive = typeof httpsOptions.keepAlive ===
        'undefined' ? true : httpsOptions.keepAlive;
    const result = await axios
        .post(o.href, payload, {
            headers: headers,
            httpsAgent: new https.Agent(httpsOptions),
        });

    return result;
}

export const isPortOpen = async (ip, port) => {
    let s = new NET.Socket();
    s.setTimeout(2000);
    try {
        await s.connect({
            port: port,
            host: ip,
            family: NET.isIP(ip),
        });
        await s.destroy();
        return true;
    } catch (e) {
        return false;
    }
}

export const dnsLookup = (domainName, servers = undefined, recordtype = undefined) => {
    return new Promise(
        function (resolve, reject) {
            let oldServers = DNS.getServers();
            if (servers) {
                DNS.setServers(servers);
            }
            if (NET.isIP(domainName)) {
                resolve([domainName]);
            }
            recordtype = recordtype ? recordtype : 'A';

            DNS.resolve(domainName,
                recordtype,
                (err, address) => {
                    DNS.setServers(oldServers)
                    if (err) {
                        reject(err);
                    }
                    try {
                        logger
                            .debug(`${domainName} resolved in ${address}`);
                    } catch (e) {}
                    resolve(address);
                }
            );
        }
    );
}