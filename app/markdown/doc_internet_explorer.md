## Internet explorer

If you want to support Internet Explorer you of course need polyfills. You want one for **Promises** and one for **CustomEvent**. If you are using Webpack a simple way to polyfill is:

`npm install babel-polyfill --save`

And in your Webpack **production** config:

```javascript
const Path = require('path')

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve('src', 'main.js')
  ],
  ...
}
```
Note that you should not use the polyfill when locally developing, only in production. The reason is that the promise polyfill overrides the native implementation, not allowing the browser to give errors on uncaught promises.

### Not using Webpack
- [Custom Event Polyfill](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)
- [Promise Polyfill](https://github.com/taylorhakes/promise-polyfill)
