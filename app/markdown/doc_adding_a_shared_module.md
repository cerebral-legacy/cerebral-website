## Adding a shared module
Cerebral has an ecosystem of modules and providers. It is easy to extend the functionality of Cerebral by using these concepts and we highly encourage to share what you build. One module is called **cerebral-module-http**. It is based on the [axios]() library and gives you a service that can talk to your server.

To add this module you first have to install it:

`$ npm install cerebral-module-http`

Then you add it as a module, just like we added the other module:

```javascript
import App from './modules/App'
import Http from 'cerebral-module-http'

const model = Model({})
const controller = Controller(model)

controller.addModules({
  app: App,
  http: Http()
})
```

You might have noticed that we actually call **Http** as a function. The reason is that most shared modules allows you to pass in some options. The options you optionally pass into the instantiation of *Http* are just passed straight into *Axios*, meaning that you get a lot of features out of the box. We chose you put the module on the namespace **http**, but you can choose whatever namespace you want.

### Using a service
Let us take use of our new service by creating a new action:

```javascript
function createItem({state, output, services}) {
  services.http.post('/items', {
    title: state.get('app.newItemTitle')
  })
  .then(output.success)
  .catch(output.error)
}

createItem.async = true
createItem.outputs = ['success', 'error']

export default createItem
```

As you can see our service returns a promise where we call an **output.success** function when it is successful and **output.error** if something goes wrong. The action also has two properties added to it. The **async** property tells Cerebral that this action runs asynchronously. The **outputs** property just define what paths this action can output to.

### Running an async action
In the **quickstart** project we can take a look at the **newItemSubmitted** signal:

```javascript
import addItem from '../actions/addItem'

export default [
  addItem,
  set('state:/app.newTodoTitle', '')
]
```

We want to still add the item optimistically and then pass it to the server. Let us do that:

```javascript
import set from 'cerebral-addons/set'
import addItem from '../actions/addItem'
import createItem from '../actions/createItem'

export default [
  addItem,
  set('state:/app.newTodoTitle', ''),
  set('state:/app.isSaving', true),
  createItem, {
    success: [],
    error: []
  },
  set('state:/app.isSaving', false)
]
```

We add our action and use an object to represent the two paths that action can take. As you can see we have also added a **set** factory that makes sure that we put our application in the *isSaving* state before padding the item to the server and then flips it back when the asynchronous *createItem* action is done.

### Running paths
The server in the **quickstart** project will return an ID for the new item if there is a success. And also, if there is an error we want to remove the item. We can safely just remove the last item if there is an error because our input will be disabled when talking to the server. Let us first implement an action updating the last added item with the ID.

```javascript

```
