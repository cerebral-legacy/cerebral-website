## Universal

Rendering your application on the server can be a complicated process and there are very many approaches to this. Since Cerebral has a clean separation of your actual application and the view this principal follows along on the server.

What you want to achieve on the server is the following:

- Build the complete state of the application
- Render the application
- Bootstrap the state on the returned HTML to rehydrate the client side controller

To accomplish this with Cerebral you are actually free to build your whole application normally, without thinking about the server side. When you do want to deliver a server rendered version you first have to build the state and then render the app. In this example we are transpiling also the server code using Babel to reuse our components.

```javascript
app.get('/posts', authenticate, getPosts, buildPostsState, renderApp)
```

- **authenticate**: Typically this puts a user on the *req* object as *user*
- **getPosts**: Grab the user posts from the database and put them on the *req* object as *posts*
- **buildPostsState**: By using the default state of the application you can just update it with the posts and attach it on the *req* object as *state*
- **renderApp**: Uses the *ServerController* to render your app with the state and adds it to the returned HTML as well

Let us have a look at buildPostsState first:

```javascript
import deepclone from 'deepclone'
import initialState from '../client/initialState'

function buildPostsState(req, res, next) {
  req.state = deepclone(initialState)
  req.state.posts = req.posts
  next()
}
```
Here we make a copy of the client side state and add the posts to it. Now we have to render the application:

```javascript
import React from 'react'
import {ServerController} from 'cerebral'
import fs from 'fs'

const indexHtml = fs.readFileSync('index.html').toString()

function renderApp(req, res, next) {
  let html = indexHtml.replace('${BOOTSTRAP_STATE}', JSON.stringify(req.state))
  const controller = ServerController(req.state)

  next()
}
```
