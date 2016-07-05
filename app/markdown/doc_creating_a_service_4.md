#### Best practices

Services are side effects. The reason you want to use this concept of a service, and not just do some arbitrary side effect, is to have a common API that is explicit. This also makes it easier to share modules with side effects and also the calls to services are tracked by the debugger, giving you a more complete mental image of what is going on when the signal executes.
