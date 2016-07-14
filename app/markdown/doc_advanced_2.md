### Starting the project
Please install all dependencies first:

`$ npm install`

After you are done you can fire up the workflow doing:

`$ npm run client` and `$ npm run server` in a second tab

Go to *localhost:3000* in your browser and the Cerebral demo application will appear.

#### Best practices
The **cerebral-cli** is not opinionated. It only gives you the most basic Webpack workflow which has the ability to proxy requests to your backend of choice, for example a Node server as we do in the demo application. There are a million ways to configure your project and we will not interfere with that. If you want to create a universal application Cerebrals architecture with a decoupled view supports that, but exactly how you want implement it is up to you.
