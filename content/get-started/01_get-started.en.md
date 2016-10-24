---
title: Get started
---
# !!! This tutorial is WIP !!!
 
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

Go to *localhost:3000* and you should see a blue button with some text in it.
So yeah, congratulations you have mastered the first step in the tutorial.
Our Goal now is to build up a very simple demo app showing off key features of cerebral:

- **Controller**
- **Signals**
- **Actions**
- **Providers**
- **Routing**

### Structure and bootstrapping

```
.
├── public
|	├── index.html
|   
├── src
|	├── components
|	|	├── HeaderButton
|	|	├── ...
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
Nothing special as you can see. But where does the magic start? Well first of all, there is not too much magic when working with Cerebral. That means you will always feel in control when working with Cerebral. The connection between the View and Verebral will be more obvious when checking out the *index.js*

#### The components - folder
Currently holds a stateless HeaderButton - React Component which is responsible for the blue button you are seeing. 
There will be more components in here as we move on in the tutorial.


#### The index.js - file
```js
import React from 'react'
import { render } from 'react-dom'
import { Controller } from 'cerebral'
import HeaderButton from './components/HeaderButton'
import { Container } from 'cerebral/react'
import Devtools from 'cerebral/devtools'

const controller = Controller({
  devtools: process.env.NODE_ENV === 'production' ? null : Devtools()
})

render((
  <Container controller={ controller }>
    <HeaderButton/>
  </Container>
  ), document.querySelector('#root'))
```
Here all the goodness comes together. The Viewengine, the **Controller** and a **Container**. The HeaderButton - ViewComponent gets placed inside the **Container** which holds it all together and exposes the **Controller** to React. The **Container** itself gets placed inside the DOM into the element with the **id #root**, hence our link to the *index.html*.
Well but what is this Devtools - Thingy good for?
Prepare to enter the world of the **cerebral debugger**


### Installing the debugger
The Cerebral debugger is a Chrome extension. You can install it from the [chrome store](https://chrome.google.com/webstore/detail/cerebral-debugger/ddefoknoniaeoikpgneklcbjlipfedbb). Once the debugger is installed your Chrome devtools will have a new tab called **cerebral2**. Open it.
Not a lot to see right now. Well lets change that and add so called **State** to our application.

