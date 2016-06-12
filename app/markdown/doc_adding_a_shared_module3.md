As you can see our service returns a promise where we call an **output.success** function when it is successful and **output.error** if something goes wrong. The action also has two properties added to it. The **async** property tells Cerebral that this action runs asynchronously. The **outputs** property just define what paths this action can output to.

### The complexities of apps
So let us talk about the **newTitleSubmitted** signal a bit more:
