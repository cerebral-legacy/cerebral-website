Context providers is not only used to expose new properties on the context, but also wrap existing properties. This is what the **cerebral-module-devtools** does. It wraps all the methods on **state** and **services** to track their usage and give information about it to the debugger.

#### Best practices
Context providers is not something you would typically implement in your application. They are low level enhancements to Cerebral. When you get to know and understand the basic functionality of Cerebral you can consider adding providers to fit your style and application. Maybe you will be inspired to create a new provider to share with the rest of the ecosystem.
