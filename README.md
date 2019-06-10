# node-pxgrid
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/vkumov/node-pxgrid/blob/master/LICENSE)
[![published](https://static.production.devnetcloud.com/codeexchange/assets/images/devnet-published.svg)](https://developer.cisco.com/codeexchange/github/repo/vkumov/node-pxgrid)

Pure JavaScript implementation of pxGrid 2.0 for Node.js

This module was created to abstract the REST APIs and WebSockets messaging away from handling a pxGrid session in Node.js. Event management, REST calls, STOMP messaging is taken care of by the module and exposes core functions via requests and callbacks.

Based on https://github.com/cisco-pxgrid/pxgrid-rest-ws/wiki

Developed/tested against Cisco ISE 2.4 and Cisco ISE 2.6.

#### Status
At the moment this library fully covers only consumer capabilities of pxGrid 2.0.
It doesn't cover provider capabilities yet.

### Install
Install with npm:
```
npm i vkumov/node-pxgrid --save
```

### Example
```js
import { Consumer, PxConfig } from 'node-pxgrid';

const hosts = ['primary-ise.example.local','secondary-ise.example.local'];

const ca = 'LIST-OF-CERTIFICATES-IN-PEM';

const config = {
  nodename: 'my_pxgrid_app',
  username: 'my_pxgrid_app',
  description: 'This app is awesome',
  dns: ['10.0.0.1','8.8.8.8'],
  inetFamily: PxConfig.PX_INET4,
  hosts: hosts.map(host => {
    return {
      host, ca
    };
  }),
  verify: PxConfig.VERIFY_NONE,
  credentials: {
    type: 'password'
  }
};

const consumer = new PxConsumer(new PxConfig.PxConfig(config))

(async function() {
  try {
    await consumer.accountCreate();
    await consumer.accountActivate();
    
    await consumer.serviceLookup('com.cisco.ise.session');
    const serviceHdlr = consumer.services.serviceHandler('com.cisco.ise.session');
    const destination = await serviceHdlr.findProperty('sessionTopic');
    const pubSubService = await serviceHdlr.findProperty('wsPubsubService');
    const pubSubHandler = consumer.services.serviceHandler(pubSubService[0]);
    
    await pubSubHandler.subscribe(destination[0], (message) => {
        console.log(message)
    });
  } catch (e) {
    console.log(e)
  }
})();
```

### Getting help
If you have questions, concerns, bug reports, etc., please file an issue in this repository's [Issue Tracker](https://github.com/vkumov/node-pxgrid/issues).

Or contact me directly via email: vitaly.kumov@gmail.com
