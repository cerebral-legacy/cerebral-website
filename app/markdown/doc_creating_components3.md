#### Best practices
Choosing a view package is all about familiarity. When it comes to render speed there is no perceived difference for typical apps. You should rather focus on something that makes sense for the team and that has a good ecosystem for sharing components.

Make your components as dumb as possible. They should only define state dependencies and render UI. There will always be exceptions, but stick with this and you will be able to scale your application without any issues.

#### Challenge
Create a new component called **Items** and move the UI description into that, also moving the state dependency path for the items. Make sure you import the component into App and make it a child.
