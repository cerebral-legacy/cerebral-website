## View

A component registers to one or more state paths. When a change occurs in your model Cerebral will notify the view layer about what paths has changed. That way the view layer can be optimized to only render the components interested in the state paths that actually changed.

The debugger lets you know all the current active state paths and what components are rendered when these state paths has a change.
