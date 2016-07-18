## Choosing a model

Cerebral uses a single state tree to represent the state of your application. This state tree can be used in two different modes. Immutable and mutable. In the demo applications we use the default immutable version as it is "safer", meaning there is no way to make a state change outside of an action. Immutability also allows for some nifty features, but also has limitations, depending on how you look at it.

Choosing a model layer really comes down to experience and type of application. If you usually work with classes and develop an application where entities has relationships with other entities you should not choose immutability. That said in Cerebral we default to immutability and you should choose that if you are unsure.

### cerebral-model-immutable
The following features are only available with the immutable model:

- Time travel debugging
- Recording and playing back signals
- Safely serialize the state to external storage like local storage or a database
- Safely import serialized state

#### When should I choose this model layer?
Are you unsure which one to choose? Choose this one. Also if your app needs functionality related to recording or storing state externally this is the way to go.

#### Instantiate

```javascript
import {Controller} from 'Cerebral'
import Model from 'cerebral/models/immutable'

const controller = Controller(Model({}))

export default controller
```

### cerebral-model
The following features are only available with the mutable model:

- Reference objects in the state tree
- Improved performance on large datasets

#### When should I choose this model layer?
When working with immutable data everything has to be core javascript value types like, objects, arrays, strings, booleans and numbers. But you might favor creating classes and creating relationships between instances of classes. If you relate this model layer is for you. You can create classes and use referencing, Cerebral will make sure that relational changes are updated in the UI.

#### Instantiate

```javascript
import {Controller} from 'Cerebral'
import Model from 'cerebral/models/mutable'

const controller = Controller(Model({}))

export default controller
```
