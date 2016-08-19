# Does Cerebral fit my project?

Frameworks and tools are often built with simple ideas in mind. Sometimes these ideas are also motivated by trying to solve a problem. Angular wanted to enhance the DOM. Redux wanted to hot reload business logic. Mobx wanted to make observing values "just work". Cycle JS is about a pure input -> output rooted in the world of observable streams. But building web applications is not a simple idea, it is insanely complex. It is not about solving a specific problem either, it is about solving a whole range of problems. Everything from the DOM, to CSS, to state management, to asynchronous flows, caching, data structures and so on. On top of this we have different paradigms and patterns like imperative, functional and functional reactive. Pub/sub, MVC, Flux, MVVM and so on. No wonder we can get a bit exchausted trying to find tools that fits the scenario.

I am sorry to say that Cerebral is not the holy grail, it is actually no different than any of the other tools. Cerebral is also inspired by a simple idea, it tries to solve specific problem spaces and it might not fit well with your application at hand or style of programming. But it might also be exactly what you have been looking for, because it really is a great tool to solve what we are going to explore more in detail here.

### The simple idea and motivations
The ideas and motivations behind Cerebral comes from working on large and complex applications. There is a range of challenges related to structuring state, managing state changing flows and allow your UI to access the state it needs to display and update correctly. There are many ways to approach this and a statement by the Cerebral project is that your code will never be the complete solution to this problem. Our applications are becoming so complex in nature that we need help to build the mental images of how they work. So the API of Cerebral is very much tailored to support its debugger. The same way we benefit from a debugger to understand our JavaScript, we can benefit the same way having a debugger for our application.

### Big complex apps
So Cerebral is not a tool you would use to build a website. It is not a tool you would use to build a TodoMVC with the least amount of code either, though ironically that is our demo application :) You want to consider Cerebral for these reasons:

#### A chain of reactions
If an interaction from a user, a route change or some other events in your application causes many things to happen Cerebral will help you with that. In [the introduction video]() you saw some examples of this and how it is solved using the signal implementation.

####
