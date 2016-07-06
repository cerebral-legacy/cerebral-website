Computed is a very simple concept. You can just imagine that the state paths your computed depends on will be merged into the state paths the component depends on. That means they are automatically optimized. The component will only update if either *app.items* or *filters.current* change.

#### Best practices
You could put the logic from the computed into the component and it would work exactly the same, but that makes your components smarter than they should be. They should not have any business logic. Computed allows you to extract this logic and keep your components dumb. It also makes it easier to reuse logic across components as they just have to point to the same computed function. Last but not least it will allow you to use common logic for displaying data across different view layers. So if you are working on an application using React on the desktop and React Native on mobile, you can use the same computed.

#### Challenge
With your previous change of using an **$error** property, create a new filter for showing those.
