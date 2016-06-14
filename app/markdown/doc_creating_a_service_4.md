#### Best practices

Services are side effects. That means when you are not changing your state but want to do something else a service will help you. The reason you want to use this concept of a service, and not just do some arbitrary side effect, is to have a common API that is explicit. This also makes it easier to share modules with side effects and also the calls to services are tracked by the debugger, giving you a better mental image of what is going on inside the actions.
