### Starting the project
This project has a Node Express setup. We proxy the requests going to our Webpack development server to this Node express server. This separates the workflow of building the client and the server.

`$ npm install`

After you are done you can fire up the webpack workflow and the Node express server by using:

`$ npm run client` and `$npm run server` in a second tab

Go to *localhost:8080* in your browser and the Cerebral demo application will appear.

#### Best practices
In this section we fired up the second Cerebral demo. Normally you can use the **cerebral-cli** tool to set up a basic project with a Webpack workflow. It is quite common to have a Node server running as well, even though your actual backend is running on a completely different platform. This allows you to simulate requests and responses to the client application. You might only do this in development, but also production applications can use Node as a "middle-end", proxying requests to one or multiple backends.
