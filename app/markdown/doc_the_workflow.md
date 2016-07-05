## The workflow

The Cerebral CLI sets up a **webpack-dev-server** workflow for you. This is Webpacks own development server which runs standalone. That does not mean you can not pass requests to a backend though. By using a proxy you will be able to pass requests from the client through webpack-dev-server to an actual running backend. Maybe this is something you run locally or maybe it is a test server running on the network somewhere.

It is often a good idea to completely separate your client development from the server. That way you do not have to rebuild the client when making changes to the backend. When you deploy to production you just create the production bundle and copy/send it to wherever it should be served from.

#### Proxying requests
When you want to proxy requests from the client to some backend server it is recommended that your backend server exposes its API on a path, for example: */api*. That way you can configure your package.json file to proxy your requests like this:

```js
{
  ...
  "scripts": {
    "start": "webpack-dev-server --proxy /api http://localhost:5000/api"
  ...
}
```

Any requests made from the client to path */api* will be proxied to your other backend.

#### Creating a development server
Sometimes it can be beneficial to create a Node Express server which runs locally when you develop your client application. By proxying to this development server you are able to create temporary fake responses. This keeps your client application clean.

With a Node Express development server you can even proxy requests further to the real backend by default, but override specific paths you want to return fake responses on. This can increase productivity as you do not have to wait for backend implementations.

```javascript
const proxyMiddelware = require('http-proxy-middleware')
const options = {
  target: 'http://localhost:5000/api',
  changeOrigin: true
}

const proxy = proxyMiddleware('/api', options)

// Override a specific path
app.get('/api/items', getFakeItems)

// Intercept request to identify need for proxy
app.use(proxy)
```

### Start the server
In the project directory make sure you have installed all packages:

`$ npm install`

Then start the server:

`$ npm start`

And go to *localhost:8080*.
