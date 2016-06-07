## Get started

Install the **cerebral-cli** tool which will help you install the packages and set up a simple project for you using [Webpack](). In your terminal run:

`$ npm install cerebral-cli -g`

Now you are ready to prepare your application. In your development directory simply do:

`$ cerebral new myProject`

The CLI will help you set up a project with the initial packages you need. For now just choose the option *get started*.

### Starting the project
The Cerebral CLI has now installed a basic folder structure. The **src** folder is where your project files live. To start the application you simply do:

`$ npm start`

Go to *localhost:3000* in your browser and the Cerebral demo application will appear.

### Installing the debugger
The Cerebral debugger is a Chrome extension. You can install it from the [chrome store](). Once the debugger is installed your Chrome devtools will have a new tab called **cerebral**. Go to your demo app an refresh to start the debugger.

Have a look around in the debugger and play around with the demo application to see what is going on inside the application before moving on.

#### Summary
In this section we fired up the Cerebral demo. The **cerebral-cli** tool helps you set up a basic project with Webpack. You can choose to run a webpack development server or use a Node express server to serve your application. The CLI will also help you build and make your application production ready.
