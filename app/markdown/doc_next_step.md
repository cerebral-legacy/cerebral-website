## Next step

This tutorial will take you through the second demo application of Cerebral. Again you can choose which view layer you want to use by cloning a specific branch of the demo: **react, snabbdom, inferno, angular** or **angular2**.

`$ git clone -b {VIEW-LAYER} https://github.com/cerebral/cerebral-website-tutorial-next.git`

### Starting the project
This project uses the Node Express project setup for Cerebral. It is still based on Webpack, but it is combined with a Node server to handle requests from the client. Please install all dependencies first:

`$ npm install`

After you are done you can fire up the Node express server by using:

`$ npm start`

Go to *localhost:8080* in your browser and the Cerebral demo application will appear.

### Installing the debugger
The Cerebral debugger is a Chrome extension. You can install it from the [chrome store](https://chrome.google.com/webstore/detail/cerebral-debugger/ddefoknoniaeoikpgneklcbjlipfedbb). Once the debugger is installed your Chrome devtools will have a new tab called **cerebral**. Go to the demo app an refresh to start the debugger.

Have a look around in the debugger and play around with the demo application to see what is going on inside before moving on.

#### Best practices
In this section we fired up the second Cerebral demo. Normally you can use the **cerebral-cli** tool to set up a basic project using Node in combination with Webpack. It is quite common to have a Node server running, even though your backend is running on a completely different platform. This allows you to simulate requests and responses. Many applications uses Node as a "middleend", proxying requests to one or multiple backends.
