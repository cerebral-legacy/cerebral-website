## Choosing a model

Cerebral uses a single state tree to represent the state of your application. This state tree can be used in two different modes. Immutable and mutable. In the demo applications we use the default immutable version as it is "safer", meaning there is no way to make a state change outside of an action. Immutability also allows for some nifty features, but also has limitations, depending on how you look at it.

### cerebral-model-immutable
The following features are only available with the immutable model:

- Time travel debugging
- Recording and playing back signals
- Safely serialize the state to external storage like local storage or a database
- Safely import serialized state

#### When should I choose this model layer?
Are you unsure which one to choose? Choose this one. Also if your app needs functionality related to recording or storing state externally this is the way to go.

#### Install without CLI

`$ npm install cerebral-model-immutable`

#### Instantiate without CLI

```javascript
import Controller from 'Cerebral'
import Model from 'cerebral-model-immutable'

const controller = Controller(Model({}))

export default controller
```

### cerebral-model
The following features are only available with the mutable model:

- Reference objects in the state tree
- Improved performance on large datasets

#### When should I choose this model layer?
One thing about immutability is that you can not reference objects or arrays. Every object and array is unique, even though they represent the same data. That means you can not do things like create a post and attach a user from the state tree on that post. It will not be the same user object when the post is inserted. If you are working with a lot of relational data this package will allow you to handle referencing.

#### Install without CLI

`$ npm install cerebral-model`

#### Instantiate without CLI

```javascript
import Controller from 'Cerebral'
import Model from 'cerebral-model'

const controller = Controller(Model({}))

export default controller
```
