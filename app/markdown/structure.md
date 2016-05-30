When you develop a Cerebral application you separate your application from your UI. You structure your business logic around domains and concepts of the application itself. Something that makes sense in describing your application in different parts.

You think of your UI differently. You do not think of your UI as parts, but as a complete user experience. With Cerebral you can hook any part of your UI into any part of your application to extract state and trigger state changes. This is a really important point in Cerebrals design. The UI of your application will often change and merge different domains and concepts. That should not be a painful process. With modern applications we also want to reach native devices. When your UI is a completely separate concept it is a lot easier to build multiple UIs for the same application.

Your application structure and your UI structure will often look similar, but they will never be restricted by each other.

### Modules setup

Your project file structure can look something like this. Note that we are putting components into their own folders with an `index.js` file. This allows you to point to the folder when doing imports and add other component specific files, like stylesheets.

```
- desktop
  - App
    - Menu
      | index.js
    - Home
      - NewsFeed
        | index.js
      | index.js
    | index.js
    | styles.css
- mobile
- ios
- android
- modules
  - App
    - modules
      - Menu
      - Home
    - actions
      | setLoading.js
      | setUser.js
      | unsetLoading.js
    - chains
      | getUser.js
    - factories
      | get.js
    - signals
      | appMounted.js
    | index.js
| desktop.js
| mobile.js
| ios.js
| android.js
```

The root files is where you mount your application. If you want you can even mount certain modules for specific UIs. Now you have a file structure that supports your UI and a structure supporting your business logic.
