## Testing

Since Cerebral apps are composed of mostly pure functions they can be easily tested. In most cases, simply examine the function signature and prove the inputs and outputs in your tests.

However some parts may appear to be less testable, especially were pure functions are wrapped in Cerebral functions. But Cerebral has been designed with testing in mind.

By just running your project with **NODE_ENV=test** all the wrapped functions of components and computed will be returned directly. The **cerebral-testable** package also allows you to test your signals execution and write mocks for your services.

Read more about testing on the [**cerebral-testable page**](/documentation/cerebral-testable).
