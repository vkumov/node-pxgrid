"use strict";

import winston from 'winston';

export const transports = {
    console: new winston.transports.Console({ level: 'warn' }),
};