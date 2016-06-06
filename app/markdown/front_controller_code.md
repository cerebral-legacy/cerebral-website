```javascript
export default [
  setLoading(true),
  getItems, {
    success: [
      setItems
    ],
    error: [
      setError
    ]
  },
  setLoading(false)
]
```
