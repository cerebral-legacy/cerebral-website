You might have noticed that we actually call both **Http** and **Devtools** as a function. The reason is that most shared modules allows you to pass in some options. The options you optionally pass into the instantiation of *Http* are just passed straight into *Axios*, meaning that you get a lot of features out of the box. The demo application put the http module on the namespace **http**, but you can choose whatever namespace you want.

### Using a service
The http module exposes services so that we can talk to the server. One of those services is called **post** and you find it on the namespace *http* under service, as that is the namespace we chose for it.
