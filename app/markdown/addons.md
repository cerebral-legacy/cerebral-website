The `cerebral-addons` project gives you a set of default factories and helpers. This makes you more productive early on and your signals will contain more information about what is happening inside them.

### Install
`npm install cerebral-addons`

### Data paths

cerebral-addons allow you to set, copy, unset or check values across multiple data sources and destinations. To simplify the mechanism of addressing these values cerebral-addons uses URLs.

`scheme:/path`

where `scheme` can be one of:

* `input` - (readonly)
* `state` - (readwrite)
* `output` - (writeonly)
.

the `path` is the relative data location to get or set.

When a signal is defined, cerebral-addons will "pre-compile" these URLs into performant functions so that at run time the URL does not need to be parsed. See the [Factory Helpers section](https://github.com/cerebral/cerebral-addons#factory-helpers) in the cerebral-addons readme for information on how you can integrate these URLs into your own actions.

#### Examples

user name from the input (readonly) `{ user: { name: 'Brian' } }`

`input:/user.name`

user name from the root of the store

`state:/user.name`

user name to the output (writeonly)

`output:/user.name`
