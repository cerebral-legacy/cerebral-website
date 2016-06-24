As you can see we are defining the name of these signals in past tense, **newItemTitleSubmitted**. What happened in your application for these signals to trigger? This gives some advantages:

* Your UI stays dumb. Meaning that the UI has no knowledge of what will happen when the signal triggers, it just tells your application what is happening in the UI
* When you open a signal file you know what causes the signal to trigger by just reading its name
* Signals tends to grow and do multiple things. Naming in past tense ensure that you do not have to refactor the name of your signal and the UI when the scope of a signal increases

But we also have to attach our defined signal to the Cerebral controller:
