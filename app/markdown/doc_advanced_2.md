### Starting the project
Again we are using the Node Express and Webpack boilerplate from the **cerebral-cli**. Please install all dependencies first:

`$ npm install`

After you are done you can fire up the Node express server by using:

`$ npm start`

Go to *localhost:8080* in your browser and the Cerebral demo application will appear.

#### Best practices
The **cerebral-cli** does not have a project setup for universal apps and the reason is simple. It is highly opinionated how you want to achieve that. You probably need to transpile your server code as well, allowing it to import the same components as the client. You will also need special Webpack setup for handling styles correctly and if you import other kinds of files you will also need special configuration for that. Cerebrals architecture of a decoupled view layer makes it easy to handle universal apps, but does not enforce opinions on how to achieve it.
