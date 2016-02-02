To fully support IE 9, 10, and 11 you must implement some basic polyfills/fixes.

Cerebral Router and its dependencies rely on Promises, which Babel takes care of with its *runtime* option, `babel?optional[]=runtime`.

Cerebral itself also needs **CustomEvent** to work. Here is its polyfill:

```javascript
(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined }
    var evt = document.createEvent( 'CustomEvent' )
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail )
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype

  window.CustomEvent = CustomEvent
})()
```
