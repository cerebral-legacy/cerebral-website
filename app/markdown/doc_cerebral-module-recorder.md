## cerebral-module-recorder

Go to official [README](https://github.com/cerebral/cerebral-module-recorder/blob/master/README.md) to read more technical details and contribute to the project.

### Concept
With the **immutable** model of Cerebral you can record interactions in the browser. The TodoMVC shows you have this is done.

### Install
`npm install cerebral-module-recorder --save`

### Instantiate the module
```javascript
...

import Recorder from 'cerebral-module-recorder'

...

controller.addModules({
  recorder: Recorder()
)
```

The state created by the recorder looks something like this:

```javascript
{
  isRecording: false,
  isPlaying: false,
  isPaused: false,
  hasRecorded: false
}
```

### Creating a recording
To quickly get going with recording you can use the exposed signals.

```javascript
export default connect({
  recorder: 'recorder'  
}, {
  recordClicked: 'recorder.recorded',
  stopClicked: 'recorder.stopped',
  playClicked: 'recorder.played',
  pauseClicked: 'recorder.paused',
},
  function RecordButton(props) {
    ...
  }
)
```
You can now use the state from the recorder and the signals to control what and when you can click a record/play button.

### Using services for more control
The same functionality, and more, is available through the recorder service.

```javascript
function myAction({services}) {
  // Gives you the current recording.
  // Useful to store on the server
  services.recorder.getRecording()

  // Loads up a recording
  services.recorder.loadRecording(someRecording)

  // Start recording
  services.recorder.record({
    // By default the whole model is copied
    // and replaced when you play back a recording,
    // but you can rather point to specific paths
    // in the model that should be copied and replaced
    // when recording is played back
    paths: [
      ['somePath'],
      ['someOtherPath', 'subPath']
    ]
  })

  // Stop recording
  services.recorder.stop()

  // Seek recording
  services.recorder.seek(0)

  // Play back recording
  services.recorder.play()

  // Pause playback
  services.recorder.pause()

  // Resume playback
  services.recorder.resume()
}

export default myAction
```
