# Recorder

## Description
The Cerebral Recorder allows you to record signals in your application, effectively doing playback of interaction. When you start a recording the recorder will by default extract all the state of the application and use that as "the initial state", when doing the playback. This can be configured to avoid extracting state not related to the recording.

When playing back a recording the signals of Cerebral will actually run exactly as they did during the recording. That means async actions will actually run again, unlike time traveling. This is something to consider when creating a recording. In a later version this might be configurable.

### Install
`$ npm install cerebral-module-recorder`

### Use

```javascript

import controller from './controller';
import RecorderModule from 'cerebral-module-recorder';

controller.modules({
  recorder: RecorderModule()
});
```

#### State

```javascript

{
  isRecording: Bool,
  isPlaying: Bool,
  isPaused: Bool,
  hasRecorded: Bool
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
});

// Stop recording
signals.{namespace}.stopped();

// Start playback of current recording
signals.{namespace}.played();

// Pause playback of current recording
signals.{namespace}.paused();

// Resume playback of current recording
signals.{namespace}.resumed();
```

#### Services

```javascript

// Gives you the current recording
services.{namespace}.getRecording();

// Loads up a recording
services.{namespace}.loadRecording();

// Manually start recording
services.{namespace}.record({
  paths: [
    ['namespace1'],
    ['namespace2', 'specificStateBranch']
  ]
});

// Manually stop recording
services.{namespace}.stop();

// Manually seek recording
services.{namespace}.seek(0);

// Manually play recording
services.{namespace}.play();

// Manually pause playback
services.{namespace}.pause();

// Manually resume playback
services.{namespace}.resume();
```

### Components

#### SimpleRecorder
```javascript

import SimpleRecorder from 'cerebral-module-recorder/react/SimpleRecorder';
```

### Example

*main.js*
```javascript

import controller from './controller';
import RecorderModule from 'cerebral-module-recorder';

controller.registerModules({
  recorder: RecorderModule()
});
```

*MyAppRecorder.js*
```javascript

import React from 'react';
import SimpleRecorder from 'cerebral-module-recorder/react/SimpleRecorder';

class MyAppRecorder extends React.Component {
  render() {
    return (
      <div>
        <h3>Recorder</h3>
        <SimpleRecorder/>
      </div>
    );
  }
}

export default MyAppRecorder;
```

You would create your own signals for grabbing the current recording and saving it.
