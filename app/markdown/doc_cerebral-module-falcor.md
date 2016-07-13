# cerebral-module-falcor

This package is a prototype of running Falcor with Cerebral. The project that initially was used to build this module was stopped, but it is a working prototype. Please let us know on the Cerebral channel if you want to continue the work on this.


```js
@connect({
  currentPage: 'list.currentPage'
})
@Falcor(props => ({
  items: `items[${props.currentPage - 1}..${props.currentPage * 10}]`
}))
class List extends React.Component {
  render() {
    this.props.items // ['foo', 'bar']
  }
}
```
