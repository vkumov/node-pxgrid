if (!global._babelPolyfill && !window._babelPolyfill) { 
    require("@babel/polyfill");
}

import Consumer from './lib/consumer.js';
import Publisher from './lib/publisher.js';
import * as PxConfig from './lib/px_config';

module.exports = { 
    Consumer: Consumer,
    Publisher: Publisher,
    Config: PxConfig,
}