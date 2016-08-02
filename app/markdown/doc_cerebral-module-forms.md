## cerebral-module-forms

Go to official [README](https://github.com/cerebral/cerebral-module-forms/blob/master/README.md) to read more technical details and contribute to the project.

### Concept
Since Cerebral is completely detaches your view from your application we get a lot of benefits with forms as well. Technically you could do form validation on any view layer you want, even a canvas. The Cerebral forms module creates forms inside your model and exposes helpers to update and handle these forms and their fields.

You are still completely free to manually change any state of any field, use any kind of value and even add your own validation state to fields. All the form state is also available in the debugger for easy review.

### Install
`npm install cerebral-module-forms --save`

### Instantiate the module
```javascript
...

import Forms from 'cerebral-module-forms'

...

controller.addModules({
  forms: Forms({
    rules: {} // Custom rules
  })
)
```

### Adding a form
Add a form simply using the factory exposed by the forms module.
```javascript
import Form from 'cerebral-module-forms/Form';

export default (module) => {
  module.addState({
    foo: 'bar',
    myForm: Form({
      name: {
        value: ''
      }
    })
  });
};
```
This will produce a state similar to:

```javascript
{
  foo: 'bar',
  myForm: {
    name: {
      value: '',
      validations: null,
      isTouched: false,
      isRequired: false,
      isValid: true,
      defaultValue: '',
      errorMessages: [],
      errorMessage: null,
      isValue: ['isValue'],
      hasValue: false
    }
  }
}
```

This says something about the complexity of handling forms. Luckily now we have complete insight and control.

### Changing value of field
Let us look at an example using React. The Forms module has a signal you can use to easily change and validate fields, but as you will see later you can build your own signal and compose together whatever you need in terms of validation.

```javascript
import React from 'react'
import {connect} from 'cerebral-view-react'

export default connect({
  form: 'app.myForm'
}, {
  fieldChanged: 'forms.fieldChanged'
},
  function Form ({fieldChanged, form}) {
    return (
      <form>
        <div>
          <h4>Name</h4>
          <input
            value={form.name.value}
            onChange={(e) => fieldChanged({
              field: 'app.myForm.name',
              value: e.target.value
            })}/>
        </div>
      </form>
    )
  }
)
```
When the signal runs it will also validate the field based on any validation rules added.

You are completely free to create your own component abstractions to handle errors, display of required etc. Cerebral does not do any assumptions on that, it is completely up to you. One such example could be:

```javascript
<MyInput label="name" path="app.someForm.name" />
```

The input could be defined as:

```javascript
export default connect(props => ({
  field: props.path
}), {
  fieldChanged: 'forms.fieldChanged'
},
  function MyInput({label, field, fieldChanged, path}) {
    return (
      <div>
        {label} {field.isRequired ? '(required)' : null}
        <input
          value={field.value}
          onChange={(e) => fieldChanged({
            field: path,
            value: e.target.value
          })}
          onBlur={(e) => fieldChanged({
            field: path,
            value: e.target.value,
            touched: true
          })}/>/>
          {field.isTouched && field.errorMessage ? field.errorMessage : null}
      </div>
    )
  }
)
```

### Getting all values of form
You will most likely need to grab all the values of the form. You can do so by using the **toJSON** helper. It will create the same object structure as your form, though only with values.

```javascript
import toJSON from 'cerebral-module-forms/helpers/toJSON'

function SomeAction({state}) {
  const formValues = toJSON(state.get('app.myForm'))
}
```

### Adding validation
You add validation by pointing to rules and giving corresponding error messages:

```javascript
myForm: Form({
  name: {
    value: '',
    validations: [
      'minLength:3',
      'isAlpha'
    ],
    errorMessages: [
      'Name has to be at least 3 characters',
      'Name can not contain numbers or special characters'
    ],
    isRequired: true
  }
})
```

This **name** field will be invalid until it gets a value with minimum length of 3. When it is not valid the `errorMessage` property of the field will be populated with the corresponding error message.

### Checking validation
If you want you can check the validation state of any of the fields directly, but there is also helpers that allows you to handle this.

```javascript
import isValidForm from 'cerebral-module-forms/helpers/isValidForm'

function SomeAction({state}) {
  const isValid = isValidForm(state.get('app.myForm'))
}
```

```javascript
import isValidForm from 'cerebral-module-forms/helpers/isValidForm'

export default connect(props => ({
  form: 'app.myForm'
}),
  function MyForm({form}) {
    const isValid = isValidForm(form)
    ...
  }
)
```

You can also grab all fields of a form as an object where key is path to field and value is the field itself:

```javascript
import getFormFields from 'cerebral-module-forms/helpers/getFormFields'

export default function allHasValue(form) {
  const formFields = getFormFields(form)

  return Object.keys(formFields).reduce((allHasValue, key) => {
    if (!allHasValue || !formFields[key].hasValue) {
      return false
    }
    return true
  }, true)
}
```

Or you can grab all invalid fields:

```javascript
import getInvalidFormFields from 'cerebral-module-forms/helpers/getInvalidFormFields'

export default connect(props => ({
  form: 'app.myForm'
}),
  function MyForm({form}) {
    const invalidFormFields = getInvalidFormFields(form)
    ...
  }
)
```

### Nested forms
With Cerebral forms you can nest forms into each other. You simply do it by:

```javascript
module.addState({
  myForm: Form({
    name: {
      value: ''
    },
    address: Form({
      street: {
        value: ''
      },
      postCode: {
        value: ''
      }
    })
  })
});
```
The form validator will automatically go through nested forms to indicate that everything is valid.

### Field dependencies
By default each field is validated individually, but you might want some fields to revalidate when an other one changes. You can use **dependsOn** for that:

```javascript
// The "app" module
module.addState({
  myForm: Form({
    password: {
      value: '',
      validations: ['equalsField:repeatPassword'],
      dependsOn: 'app.myForm.repeatPassword'
    },
    repeatPassword: {
      value: '',
      validations: ['equalsField:password'],
      dependsOn: 'app.myForm.password'
    }
  })
});
```
Now we say that each of these fields needs to be equal and we tell that when one of them change, the other one needs to revalidate as well. As you can see it is possible to point to any part of the model, even a sibling form.

### Is value
Normally we think of form elements as normal inputs. They have a value if `Boolean(value)` is true. So undefined, null, false and empty string would not be a value. But with Cerebral forms you are not limited to just strings. Maybe you want a field to be an array and you want to make the length of the array to determine if there is a value there or not.

```javascript
module.addState({
  myForm: Form({
    list: {
      value: [],
      isValue: ['minLength:3'],
      isRequired: true
    }
  })
});
```
This field will not have a value (hasValue=true) if the length below 3, because we require it to have a value and the rule for having a value is minimum length of 3. Now this is different than normal validation. Now the `hasValue` property will only be true when there is at least three items in the list. Meaning that you can check **isRequired** with **hasValue** to give an indication of a missing required value, which does not necessarily have any validation on it.

### Combine rules
Sometimes you want multiple rules to produce one error message. You can do that using an object instead of a string.

```javascript
myForm: Form({
  name: {
    value: '',
    validations: [{
      minLength: 3,
      isAlpha: true
    }],
    errorMessages: [
      'Name is not valid',
    ],
    isRequired: true
  }
})
```

### Action factories
Sometimes you want more fine grained control of how validation is performed. All the actions that runs with the `fieldChanged` signal is available to you as well. That means you can compose these with other actions or maybe skip some of them if you do not see any need.

```javascript
import resetForm from 'cerebral-module-forms/factories/resetForm'
import touchField from 'cerebral-module-forms/factories/touchField'
import validateField from 'cerebral-module-forms/factories/validateField'
import validateForm from 'cerebral-module-forms/factories/validateForm'
import validateHasValue from 'cerebral-module-forms/factories/validateHasValue'
import validateRequired from 'cerebral-module-forms/factories/validateRequired'

export default [
  // Resets form to default values
  resetForm('some.form'),

  // Runs validation on the whole form
  validateForm('some.form'),

  // Validates that field has value, changes "hasValue"
  validateHasValue('some.form.field'),

  // Touches a field, passing true/false
  touchField('some.form.field', true),

  // Runs validation on the field, changes "isValid"
  validateField('some.form.field'),
]
```

### Custom signals
Sometimes you want to control the validation process completely. You can do so by creating your own signal and compose a chain with your own actions:

*changeUsernameField.js*
```javascript
import {copy, set, debounce} from 'cerebral/operators'
import checkUsername from '../actions/checkUsername'

export default [
  copy('input:value', 'state:app.form.username.value'),
  set('state:app.form.username.isValid', false),
  set('state:app.form.username.isValidating', true),
  ...debounce(500, [
    checkUsername, {
      success: [
        set('state:app.form.username.isValid', true),
        set('state:app.form.username.isValidating', false)
      ],
      error: [
        copy('input:error', 'state:app.form.username.errorMessage'),
        set('state:app.form.username.isValidating', false)
      ],
      abort: []
    }
  ])
]
```

### Dynamically add/remove fields and forms
Since the forms and fields are completely driven by state it is no problem to dynamically add and remove them. We have already looked at the factory for creating a form, but we also have one for fields:

```javascript
import Field from 'cerebral-module-forms/Field'

function SomeAction({state}) {
  state.set('app.someForm.newField', Field({
    value: ''
  }))
}
```

To remove a field you simply just remove it like any other state.

### Custom rules
```javascript
import Forms from 'cerebral-module-forms';

// You get passed the value of the field,
// the form it is attached to and whatever
// arg you pass after : (minLength:3)
function isFirstUpperCase(value, form, arg) {
  return typeof value === 'string' && value[0] === value[0].toUpperCase()
}

controller.addModules({
  forms: Forms({
    rules: {
      isFirstUpperCase
    }
  })
})
```

### Rules
- **isValue** - Checks if there is a truthy value, including array length
- **isExisty** - Checks for truthy value
- **matchRegexp** - Only in object form: [{matchRegexp: /\s/g}]
- **isUndefined** - Checks if undefined
- **isEmpyString** - Checks if empty string
- **isEmail** - Checks if valid email format
- **isUrl** - Checks if valid url format
- **isTrue** - Checks if actual true value
- **isFalse** - Checks if actual false value
- **isNumeric** - Checks value is only numeric
- **isAlpha** - Checks if value is only alpha characters (text)
- **isAlphanumeric** - Checks if either numeric or alpha characters
- **isInt** - Checks if value is number and no decimals
- **isFloat** - Checks if value is number with decimals
- **isWords** - Checks if multiple words in value
- **isSpecialWords** - Checks for special characters in words
- **isLength:Number** - Checks length of value with number passed
- **equals:Value** - Does strict equality check
- **equalsField:Field** - Checks equality of field in same form
- **maxLength:Number** - Checks value length does not pass passed number
- **minLength:Number** - Checks value length does pass passed number
