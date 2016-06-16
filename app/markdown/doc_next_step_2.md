### Starting the project
This project uses the Node Express project setup for Cerebral. It is still based on Webpack, but it is combined with a Node server to handle requests from the client. Please install all dependencies first:

`$ npm install`

After you are done you can fire up the Node express server by using:

`$ npm start`

Go to *localhost:8080* in your browser and the Cerebral demo application will appear.

#### Best practices
In this section we fired up the second Cerebral demo. Normally you can use the **cerebral-cli** tool to set up a basic project using Node in combination with Webpack. It is quite common to have a Node server running, even though your backend is running on a completely different platform. This allows you to simulate requests and responses. Many applications uses Node as a "middleend", proxying requests to one or multiple backends.
