As you can see our service returns a promise where we call an **output.success** function when it is successful and **output.error** if something goes wrong. The action also has two properties added to it. The **async** property tells Cerebral that this action runs asynchronously. The **outputs** property just define what paths this action can output to.

#### Best practices
When you depend on some library it is quite common to create a module that exposes services wrapping what you need from that library. By doing so makes it also very easy to share that module with other Cerebral developers. Wrapping other libraries with Cerebral is of course not necessary, but it will help with your mental image of changes in your app because the debugger will now know about these services.
