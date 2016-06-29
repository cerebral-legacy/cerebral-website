## Choosing a project type

The Cerebral CLI first asks you what kind of project type you want. There are only two options and no matter which you choose you will develop your application the same way. The difference between the project types is how your workflow runs.

### Simple development server
It can often be a good idea to completely separate your client development from the server. When you deploy to production you just create the production bundle and copy/send it to wherever it should be served from.

The first option sets up a **webpack-dev-server** workflow for you. This is Webpacks own development server which runs standalone. That does not mean you can not pass requests to a backend though. By using a proxy you will be able to pass requests from the client through webpack-dev-server and to an actual running backend. Maybe this is something you run locally or maybe it is a test server running on the network somewhere.

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

### Node express server
Sometimes it can be useful to set up an express server which includes the Webpack workflow. This gives you a lot of freedom with the configuration and you will also be able to create simulated responses to your client as you develop.

If you are working on a normal sized or simple project it works just find to implement the backend and your client side application in the same project. That means you might start out with implementing a new endpoint with a fake response, and later do the actual implementation. Everything happening in this one project.

Other times you want to have the flexibility of creating fake endpoints etc., but still proxy requests to a real backend. This can be achieved by adding the [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) package to your project.


#### Proxying and overriding paths
This configuration has to be added after the **webpack-dev-middleware** in the *server.js* file.

```javascript
const options = {
  target: 'http://localhost:5000/api',
  changeOrigin: true
}

const proxy = proxyMiddleware('/api', options)
// Override a specific path
app.get('/api/items', getFakeItems)
app.use(proxy)
```

### Start the server
In the project directory make sure you have installed all packages:

`$ npm install`

Then start the server:

`$ npm start`

And go to *localhost:8080*.
