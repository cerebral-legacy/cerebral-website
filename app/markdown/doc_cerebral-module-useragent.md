## cerebral-module-useragent

Go to official [README](https://github.com/cerebral/cerebral-module-useragent/blob/master/README.md) to read more technical details and contribute to the project.

### Concept
The useragent module puts information about the browser into your model, and it also updates this information when the size of the browser changes etc.

- UA parser: browser, device & OS detection
- Window: size & orientation
- Media queries
- Feature detection
- Internet connectivity

### Instantiate the module
```javascript
...

import Useragent from 'cerebral-module-useragent'

...

controller.addModules({
  useragent: Useragent({
    // Use CSS media queries to determine
    // custom sizes available in your model
    media: {
      small: '(min-width: 600px)',
      medium: '(min-width: 1024px)',
      large: '(min-width: 1440px)',
      portrait: '(orientation: portrait)'
    },

    // store all feature tests in model
    feature: true,

    parse: {
      // parse useragent.browser from ua string
      browser: true,
      // parse useragent.device from ua string
      device: true,
      // parse useragent.os from ua string
      os: true
    },

    // check the docs at: https://github.com/HubSpot/offline#advanced
    offline: {
      checkOnLoad: false,
      interceptRequests: true,
      reconnect: {
        initialDelay: 3,
        delay: 1.5
      },
      requests: false
    },

    // update window size on resize
    window: true
  })
)
```

### Grabbing details from useragent
The useragent module will populate your model on the given namespace. All you need to do in your view layer is to grab whatever data you need from it:

```javascript
export default connect({
  media: 'useragent.media'
}, ...)
```
