# Frequently Asked Questions

### How does Cerebral differ from Redux?
Redux and Cerebral has two different approaches. Redux is about predictability. Meaning that you can read a reducer and know all actions related to changing the state of that reducer. This is a good quality on big applications with multiple team members working on different parts of the application at once.

Cerebral uses a single state tree for state. This means you get more flexibility and less boilerplate setting the state of your application. But what Cerebral is all about though is the readability of changing the state of your application. Changing state of an application quickly becomes very complex, but with signals you can declaratively express how your application changes state. Almost like a decision tree.

### Why isn't the debugger working?
Cerebral depends on multiple projects and it is important the you update to the latest version of all of them. NPM can be a bit problematic when changing to a new 0.x.x version, rather than 0.1.x, so please be sure you have the very latest versions.

### Why aren't my signals registering?
When moving back in time with the debugger any signals fired will be ignored. The reason for this is that you can not "change the past". You have to move back to the current signal, "current time", to continue moving forward.

### How do I handle non-serializable state?
Normally you will only use plain objects, arrays, strings etc., but sometimes you also need to handle files or other non-serializable state. You will need to handle these inside components. For example uploading some files will have to be done inside the component handling it. That said, you can still use signals to notify your application about files being dropped, being uploaded and successfully uploaded.
