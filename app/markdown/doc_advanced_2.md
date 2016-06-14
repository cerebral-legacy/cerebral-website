### Starting the project
Again we are using the Node Express and Webpack boilerplate from the **cerebral-cli**. Please install all dependencies first:

`$ npm install`

After you are done you can fire up the Node express server by using:

`$ npm start`

Go to *localhost:8080* in your browser and the Cerebral demo application will appear.

### Installing the debugger
The Cerebral debugger is a Chrome extension. You can install it from the [chrome store](https://chrome.google.com/webstore/detail/cerebral-debugger/ddefoknoniaeoikpgneklcbjlipfedbb). Once the debugger is installed your Chrome devtools will have a new tab called **cerebral**. Go to the demo app an refresh to start the debugger.

Have a look around in the debugger and play around with the demo application to see what is going on inside before moving on.

#### Best practices
The **cerebral-cli** does not have a project setup for universal apps and the reason is simple. It is highly opinionated how you want to achieve that. You probably need to transpile your server code as well, allowing it to import the same components as the client. You will also need special Webpack setup for handling styles correctly and if you import other kinds of files you will also need special configuration for that. But Cerebrals architecture of a decoupled view layer makes it easy to handle that part of universal apps.
