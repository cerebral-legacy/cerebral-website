# cerebral-module-recorder
The recorder module for Cerebral

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![bitHound Score][bithound-image]][bithound-url]
[![Commitizen friendly][commitizen-image]][commitizen-url]
[![Semantic Release][semantic-release-image]][semantic-release-url]
[![js-standard-style][standard-image]][standard-url]
[![Discord][discord-image]][discord-url]

## Description
The Cerebral Recorder allows you to record signals in your application, effectively doing playback of interaction. When you start a recording the recorder will by default extract all the state of the application and use that as "the initial state", when doing the playback. This can be configured to avoid extracting state not related to the recording.

When playing back a recording the signals of Cerebral will actually run exactly as they did during the recording. That means async actions will actually run again, unlike time traveling. This is something to consider when creating a recording. In a later version this might be configurable.

### Install
`$ npm install cerebral-module-recorder`

### Use
```javascript
import controller from './controller'
import RecorderModule from 'cerebral-module-recorder'

controller.addModules({
  recorder: RecorderModule({
    state: {foo: 'bar'} // Merge in additional state
  })
})
```

#### State
```javascript
{
  isRecording: Bool,
  isPlaying: Bool,
  isPaused: Bool,
  hasRecorded: Bool,
  preventSignals: Bool
}
```

#### Signals
```javascript
// Will start the recorder. Optionally choose what specific paths in the state
// tree to use as initial state when playing back recording
signals.{namespace}.recorded({
  paths: [
    ['namespace1'],
    ['namespace2', 'specificStateBranch']
  ]
})

// Stop recording
signals.{namespace}.stopped()

// Start playback of current recording
signals.{namespace}.played()

// Pause playback of current recording
signals.{namespace}.paused()

// Resume playback of current recording
signals.{namespace}.resumed()
```

#### Services

```javascript
// Gives you the current recording
services.{namespace}.getRecording()

// Loads up a recording
services.{namespace}.loadRecording()

// Manually start recording
services.{namespace}.record({
  paths: [
    ['namespace1'],
    ['namespace2', 'specificStateBranch']
  ]
})

// Manually stop recording
services.{namespace}.stop()

// Manually seek recording
services.{namespace}.seek(0)

// Manually play recording
services.{namespace}.play()

// Manually pause playback
services.{namespace}.pause()

// Manually resume playback
services.{namespace}.resume()
```

### Example

*main.js*
```javascript
import controller from './controller'
import RecorderModule from 'cerebral-module-recorder'

controller.addModules({
  recorder: RecorderModule()
})
```

*RecorderButton.js*
```javascript
import React from 'react'
import {connect} from 'cerebral-view-react'
import styles from './style.css'

export default connect({
    recorder: 'recorder'
  }, {
    clicked: 'recorder'
  },
  function RecorderButton({recorder, clicked}) {
    let action
    if (recorder.isPlaing) {
      action = {name: 'paused', label: 'Pause playback'}
    } else if (recorder.isPaused) {
      action = {name: 'resumed', label: 'Play'}
    } else if (recorder.isRecording) {
      action = {name: 'stopped', label: 'Stop recording'}
    } else if (recorder.hasRecorded) {
      action = {name: 'played', label: 'Play'}
    } else {
      action = {name: 'recorded', label: 'Record'}
    }
    return (
      <button className={styles.recorder} onClick={() => clicked[action.name]()}>
        {action.label}
      </button>
    )
  }
)
```

You would create your own signals for grabbing the current recording and saving it.

[npm-image]: https://img.shields.io/npm/v/cerebral-module-recorder.svg?style=flat
[npm-url]: https://npmjs.org/package/cerebral-module-recorder
[travis-image]: https://img.shields.io/travis/cerebral/cerebral-module-recorder.svg?style=flat
[travis-url]: https://travis-ci.org/cerebral/cerebral-module-recorder
[coveralls-image]: https://img.shields.io/coveralls/cerebral/cerebral-module-recorder.svg?style=flat
[coveralls-url]: https://coveralls.io/r/cerebral/cerebral-module-recorder?branch=master
[bithound-image]: https://www.bithound.io/github/cerebral/cerebral-module-recorder/badges/score.svg
[bithound-url]: https://www.bithound.io/github/cerebral/cerebral-module-recorder
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
[discord-image]: https://img.shields.io/badge/discord-join%20chat-blue.svg
[discord-url]: https://discord.gg/0kIweV4bd2bwwsvH
