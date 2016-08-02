## Going to production

The project built by the Cerebral CLI has a script that builds your app:

`$ npm run build`

This will put your production files into a */dist* folder.

### Optimizations
The one most important thing when building your application is to put **NODE_ENV** to **production**.

`$ NODE_ENV=production npm run build`

Typically this is set already in the environment where you build so you do not explicitly have to set it.

#### Devtools
Make sure you do not load the devtools when in production.

```javascript
controller.addModules({
  devtools: process.env.NODE_ENV === 'production' ? () => {} : Devtools()
})
```

#### Immutable model
The immutable model can get some pretty huge optimizations when in production.

```javascript
const modelOptions = process.env.NODE_ENV === 'production' ? {
  immutable: false, // Do not set this to false when using the Recorder
  persistent: false  
} : {}
const controller = Controller(Model({}, modelOptions))
```
