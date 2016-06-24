As you can see we define our two signals differently. The reason is that by default Cerebral will trigger signals after the next animation frame of the browser. That ensures that your business logic and a new render of your application happens at the optimal time. But when we update the state of inputs and textareas we have to do that *synchronously*, or immediately as we call it in Cerebral world. So our **newItemTitleChanged** signal runs immediately, but **newItemTitleSubmitted** runs right after the next animation frame.

Let us take another look at a signal.
