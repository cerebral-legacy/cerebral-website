When can be used to check state for a specific value, truthy or falsy and then run an action chain when the condition is matched.

*reloadData.js*
```javascript
import when from 'cerebral-addons/when'
import tryAgainLater from '../actions/tryAgainLater'
import doReload from '../actions/doReload'

export default [
  when('state:/isLoading'), {
    isTrue: [tryAgainLater],
    isFalse: [doReload]
  }
]
```

You can also create custom outputs.

*securePageOpened.js*
```javascript
import when from 'cerebral-addons/when'
import getPageData from '../actions/getPageData'
import redirectToHome from '../actions/redirectToHome'

const whenUser = when('state:/user', { isLoggedIn: when.truthy, isUnknown: when.otherwise })

export default [
  whenUser, {
    isLoggedIn: [getPageData],
    isUnknown: [redirectToHome]
  }
]
```

You can also check for specific values.

*formSubmitted.js*
```javascript
import when from 'cerebral-addons/when'
import sendToServer from '../actions/sendToServer'
import showErrorSnackBarMessage from '../actions/showErrorSnackBarMessage'

const whenFormIsValid = when('input:/form.errorMessage', { valid: 'no errors found', invalid: when.otherwise })

export default [
  validateForm,
  whenFormIsValid, {
    valid: [sendToServer],
    invalid: [showErrorSnackBarMessage]
  }
]
```

### Options

* `when(path, outputs = { isTrue: truthy, isFalse: otherwise }, emptyObjectsAreFalse = true)`
