if (typeof global === 'object' && !global._babelPolyfill && typeof window === 'object' &&  !window._babelPolyfill) { 
    require("@babel/polyfill");
}

export { default as Consumer } from './lib/consumer.js';
export { default as Publisher } from './lib/publisher.js';
import * as PxConfig from './lib/px_config';

export { PxConfig };