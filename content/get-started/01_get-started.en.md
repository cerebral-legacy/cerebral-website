---
title: Get started
---

## Get started

If you want to install Cerebral into an existing project please...

`npm install cerebral`

...and then move on to the other docs.

If you want an introduction you can keep reading and go through a small demo project. Just make sure you fulfill these requirements:

* You have installed [Node](https://nodejs.org/en/) version 4 or later
* You are okay with learning Cerebral using React and JSX. You can choose something else like [Inferno](http://infernojs.org//) for your own project later though. 
* You have a coffee or a beer, ready to learn something new

Okay, lets get going. First you need to clone the tutorial repo.

`git clone https://github.com/cerebral/cerebral-website-tutorial.git`

Or use [Github Desktop](https://desktop.github.com/)

### Installing the project
To install it, go to the project folder and install the dependencies, including Cerebral by running:

`npm install`

This may take a little while and does **not** mean that cerebral is a huge download. In fact cerebral as a production build is very small compared to other popular frameworks and therefore has fast loading times. The tutorial runs on [react-create-app](https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html) by Facebook.
After npm did its job you can fire up the project with:

`npm start`

Go to *localhost:3000* and you should see an empty browser window.
Amazing eh? Well thats because we've just installed the very basic barebone version of this tutorial.
Our Goal now is to build up a very simple demo app showing off key features of cerebral:

- controller
- signals
- providers
- routing

### Structure and bootstrapping

```
.
├── public
|	├── index.html
|   
├── src
|	├── components
|	|	├── comp1
|	|	├── comp2
|	|	├── ...		
|	|
|	└── index.js
|
├── package.json
├── ...
```
#### The index.html - file
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://unpkg.com/blaze">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <title>Cerebral Tutorial</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```
Nothing special as you can see. But where does the magic start? Well first of all, there is not too much magic when working with cerebral. That means you will always feel in control when working with cerebral. The connection between the view and cerebral will be more obvious when checking out the index.js - file
#### The index.js - file
```js
import React from 'react'
import { render } from 'react-dom'
import { Controller } from 'cerebral'
import { Container } from 'cerebral/react'

const controller = Controller({
})

render((
  <Container controller={ controller }>
  </Container>
  ), document.querySelector('#root'))

```
Here all the goodness comes together. The viewengine, the statecontroller and a container which holds it all together. And as you can see we are hooking into an element with the id #root ergo our link to the index.html - file.

#### The components - folder
Will hold the viewcomponents for this tutorial. This structure is just a sample. Experience shows that a modules - folder comes in very handy to structure the controller itself. You may check out a sample project on github. (@todo link sample)


### Installing the debugger
The Cerebral debugger is a Chrome extension. You can install it from the [chrome store](https://chrome.google.com/webstore/detail/cerebral-debugger/ddefoknoniaeoikpgneklcbjlipfedbb). Once the debugger is installed your Chrome devtools will have a new tab called **cerebral2**. Open it.
