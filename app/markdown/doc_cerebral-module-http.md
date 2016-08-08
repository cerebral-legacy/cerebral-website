## cerebral-module-http

Go to official [README](https://github.com/cerebral/cerebral-module-http/blob/master/README.md) to read more technical details and contribute to the project.

### Concept
The http module of Cerebral exposes a service that allows you to do http requests to a backend. By default it expects you to use **json**, but the module is highly configurable to meet your needs.

### Install
`npm install cerebral-module-http --save`

### Instantiate the module
```javascript
...

import Http from 'cerebral-module-http'

...

controller.addModules({
  http: Http({
    // Options
  })
)
```

### Making requests
You can do any of the default **get**, **post**, **patch**, **put** and **delete** requests from the http service inside your actions.

```javascript
function saveUser({state, services, output}) {
  services.http.post('/users', state.get('app.newUser'))
    .then(output.success)
    .catch(output.error)
}
saveUser.async = true
saveUser.outputs = ['success', 'error']
```

The result of **success** and **error** will be: `{result, status}`. Typically you just output directly to the chain like in the example above.

### Making a custom request
You also have access to making a request manually doing:

```javascript
function saveUser({state, services, output}) {
  services.http.request({
    method: 'POST',
    url: '/users',
    body: state.get('app.newUser')
  })
    .then(output.success)
    .catch(output.error)
}
saveUser.async = true
saveUser.outputs = ['success', 'error']
```

### Changing default options
There are some default options you can change when instantiating the service:

```javascript
controller.addModules({
  http: Http({
    // Set a path prefix to all requests,
    // f.ex. "/api"
    baseUrl: '',

    // Sends cookies to cross domain request
    withCredentials: false,

    // Allow cross domain request. It adjusts the
    // request headers to allowed. Note that server
    // has to allow this request as well
    cors: false,

    // Headers will be merged with existing headers,
    // these are the default ones
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },

    // You can change how the request is sent to the
    // server, by default we handle JSON and
    // x-www-form-urlencoded
    onRequest: function (xhr, options) {
      // Default implementation taking care of cors, credentials,
      // headers and the data to be passed
    },

    // Configure how responses are resolved and rejected
    onResponse: function (response, resolve, reject) {
      // Default implementation which resolves status code
      // 200 - 299, and rejects the others. It also parses
      // to JSON or x-www-form-urlencoded based on header
    }
  })
)
```

### Change default options after instantiation
Updating the options will merge in the changes, also merge headers.

```javascript
function updateHttpOptions({input}) {
  services.http.updateOptions({
    headers: {
      'API_KEY': input.apiKey
    }
  })
}
```

### Changing options per request
You can also override these options per request:

```javascript
function saveUser({state, services, output}) {
  services.http.post('/users', state.get('app.newUser'), {
    headers: {
      'Some-Header': 'SomeValue'
    },

    // Adds query string to url
    query: {
      foo: 'bar'
    }
  })
    .then(output.success)
    .catch(output.error)
}
saveUser.async = true
saveUser.outputs = ['success', 'error']
```

### Progress
The service allows you to react to progress events when downloading data.

### Aborting requests
You can abort requests at any time by pointing to the url you want to abort. That means if you for example do a search you can abort any existing searches before running a new search. Any aborted requests will give the error **isAborted** which you use to output to an "abort" chain, or similar.

```javascript
function searchItems({input, state, services, output}) {
  services.http.abort('/items*') // regexp
  services.http.get(`/items?query=${input.query}`)
    .then(output.success)
    .catch((error) => {
      if (error.isAborted) {
        output.abort()
      } else {
        output.error(error)
      }
    })
}
searchItems.async = true
searchItems.outputs = ['success', 'error', 'abort']
```

### Uploading files
The HTTP service gives you a tool to upload files as well. The **onProgress** option takes typically a signal which triggers on the upload of the file. Since Cerebral signals can only handle serializable data any files needs to be handled at the view layer. Typically you would do:

```javascript
...
import {fileUpload} from 'cerebral-module-http'

export default connect({
  fileNames: 'app.fileNames'
}, {
  filesAdded: 'app.filesAdded',
  uploadStarted: 'app.uploadStarted',
  uploadProgressed: 'app.uploadProgressed',
  uploadFinished: 'app.uploadFinished',
  uploadFailed: 'app.uploadFailed'
},
  class FileUpload extends Component {
    constructor (props) {
      super(props);
      this.filesToUpload = [];
    }
    onFilesChange (event) {
      this.filesToUpload = event.target.files;
      this.props.filesAdded({
        fileNames: this.fileToUpload.map(file => file.name)
      })
    }
    upload () {
      this.props.uploadStarted()
      fileUpload(this.fileToUpload, {
     	  url: '/upload',
        headers: {},
        // Triggers with object {progress: '54'}
        onProgress: this.props.uploadProgressed
      })
          .then(this.props.uploadFinished)
          .catch(this.props.uploadFailed)
    }
    render() {
      return (
        <h4>Please choose a file.</h4>
        <div>
          <input type="" onChange={(event) => this.onFilesChange(event)}/><br/><br/>
          <button disabled={this.fileToUpload.length === 0} onClick={() => this.upload()}>Upload</button>
        </div>
      )
    }
  }
)
```
