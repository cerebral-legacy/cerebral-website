With Cerebral Router we encourage you to use signals, rather than urls. They are more expressive and since the url automatically updates you get the behavior you want. If you have to use a url we would like you to use the `getUrl` helper on the signal. Both examples are shown below.

```javascript

// Given the route and signal: "/messages/:id": "messagesOpened"
render() {
  return (
    <div>
      <a onClick={() => this.props.signals.messageOpened({id: this.props.messageId})}>Open</a>
      <a href={this.props.signals.messageOpened.getUrl({id: this.props.messageId})}>Open</a>
    </div>
  )
}
```
