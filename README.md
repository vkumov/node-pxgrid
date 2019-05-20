# node-pxgrid
PxGrid 2.0 library for Node.js

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
```
