"use strict";

import winston, {format} from 'winston';

export const transports = [ 
    new winston.transports.Console({
        level: 'debug',
        json: false,
        colorize: true,
        format: format.combine(
            format.colorize(),
            format.timestamp(),
            format.printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`)
        )
    }),
];