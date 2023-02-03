# LIBNAME

**Install**

```shell
npm install @coxy/aes-256
```

**Create**

```javascript
import { Aes256 } from '@coxy/aes-256';
```

... or using CommonJS syntax:

```javascript
const { Aes256 } = require('@coxy/aes-256');
```

```javascript
const aes = new Aes256('salt', Buffer.from('52f12fd38a0a96408f0ec69bec771eb9', 'hex'));

const data = aes.decrypt('test', 'password')

const result = aes.encrypt(data, 'password')

console.log(result) // test
```
