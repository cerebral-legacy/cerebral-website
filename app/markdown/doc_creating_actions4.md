As you can see this signal is also executing other actions as well. And this is basically how it works. You define actions with a specific behaviour and then reference it in one or multiple signals for execution.

#### Best practices
You have now gotten insight into how you can define your actions from scratch. When developing applications you will depend heavily on the **cerebral-addons** package to avoid creating new actions for every little state change. You will also start to create your own action factories, chains and even chain factories to be reused in different signals. You will be surprised how signals becomes more like describing behaviour with legoblocks, rather than implementing logic.
