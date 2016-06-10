As you can see we are defining the name of these signals in past tense. What happened in your application for these signals to trigger? This gives some advantages:

* Your UI stays dumb. Meaning that the UI has no knowledge of what is happening inside your application, it just tells your application what is happening in the UI
* When you open a signal file you know what causes the signal to trigger by just reading its name
* Signals tends to grow and do multiple things. Naming in past tense ensure that you do not have to refactor the name of your signal and the UI when the scope of a signal increases

As you can see we define our two signals differently. The reason is that by default Cerebral will trigger signals after the next animation frame of the browser. That ensures that your business logic and a new render of your application happens at the optimal time. But when we update the state of inputs and textareas we have to do that *synchronously*, or immediately as we call it in Cerebral world. So our **newItemTitleChanged** signal runs immediately, but **newItemSubmitted** runs right after the next animation frame.

Let us take a look at the **newItemTitleChanged** signal.
