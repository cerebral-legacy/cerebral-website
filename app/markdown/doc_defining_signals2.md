As you can see we are defining the name of these signals in past tense. **newItemTitleChanged** and **newItemTitleSubmitted**. They tell us what happened in the application for these signals to trigger. This gives a couple of advantages:

* Your UI stays dumb. Meaning that the UI has no knowledge of what will happen when the signal triggers, it just tells your application what is happening in the UI
* Signals tends to grow and do multiple things. Naming in past tense ensure that you do not have to refactor the name of your signal and the UI when the scope of a signal increases

You also see that we define the two signals differently. The reason is that by default Cerebral will trigger signals after the next animation frame of the browser. That ensures that your business logic and a new render of your application happens at the optimal time. But when we update the state of inputs and textareas we have to do that *synchronously*, or immediately as we call it in Cerebral world. So our **newItemTitleChanged** signal runs immediately, but **newItemTitleSubmitted** runs right after the next animation frame.

Let us now have a look at the chain we used to define the **newItemTitleSubmitted** signal:
