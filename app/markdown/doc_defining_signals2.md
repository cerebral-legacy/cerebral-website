As you can see we are defining the name of these signals in past tense **newItemTitleChanged** and **newItemTitleSubmitted**. Each signal is then mapped to an action chain **updateItemTitle** and **addNewItem** which expresses what is going to happen after the signal occurred.

This gives a couple of advantages:

* Your UI stays dumb. Meaning that the UI has no knowledge of what will happen when the signal triggers, it just tells your application what is happening in the UI
* When you refactor your action chains, you won't have to change any the signal references.

You also see that we define the two signals differently. The reason is that by default Cerebral will trigger a signals action chain after the next animation frame of the browser. That ensures that your business logic and a new render of your application happens at the optimal time. But when we update the state of inputs and textareas we have to do that *synchronously*, or immediately as we call it in Cerebral world. So our **newItemTitleChanged** signal runs immediately, but **newItemTitleSubmitted** runs right after the next animation frame.

Let us now have a look at the chain we used to define the **newItemTitleSubmitted** signal:
