# Frequently Asked Questions

### Why isn't the debugger working?
Cerebral depends on multiple projects and it is important the you update to the latest version of all of them. NPM can be a bit problematic when changing to a new 0.x.x version, rather than 0.1.x, so please be sure you have the very latest versions.

### Why aren't my signals registering?
When moving back in time with the debugger ignores any signals fired. The reason for this is that you can not "change the past". You have to move back to the current signal, "current time", to continue moving forward.

### How do I handle non-serializable state?
Normally you will only use plain objects, arrays, strings etc., but sometimes you also need to handle files or other non-serializable state. You will need to handle these inside components. For example uploading some files will have to be done inside the component handling it. That said, you can still use signals to notify your application about files being dropped, being uploaded and successfully uploaded.
