---
title: Control flow using Path
---

## 10: Control flow using Path

In the chapter before we were introducing async actions and we have learned that we can write async actions that just behave like an sync action in the chain.
But what about the following scenario: User gets data async from a server, server responds with an error, what now? To handle not only the so called **Happy Path** we should also allow our signals to branch out into a different flow (which is just another chain of actions and operators) depending on the result of the async action.
So let us rebuild that scenario introducing *cerebral-http-provider* into our tutorial. *cerebral-http-provider* is a simple http-provider which enables you to request data from servers.  The concept of **Providers** will be covered in more detail in the next chapter. As well we took the chance to spice up the tutorial a bit and also include the http-provider plus an action already using it. 
So please go ahead and replace your files with the content from *./parts/10_1* **before you dive into the following steps **.

### A few words about the work done

If you check out the application now you will see another input-field and a button.
By default this button will query the github api to get information about the cerebral-project.
If you press this button you should see some information as a *Toast* -message.
Nice but what if we change the input from *cerebral* to *doesnotexist* and again query the server by pressing the button? Well we still see a toast-message with now some misleading information (it looks at first sight as the query succeeded). But the console (or network tab in the devtools of your browser) will tell you that there was something going wrong.
Lets call the concept of **Paths** to the rescue!


A simple signal using paths and a sample async action named *getData* could look like this:
```js
signals:
getServerData:[
getData, 
  {
  success:[processResults, showSuccessMessage], 
  error: [showErrorMessage]
  }
]
```

Whereas *success:* and *error* are our **Paths**

Well that would be cool, let us implement it into our existing *getRepoInfoClicked* - signal inside our controller:

```js
...
    getRepoInfoClicked: [
      set(state`repoName`, input`value`),
      ...showToast('Loading Data for repo: @{repoName}', 2000),
      GetData,
      {
        success: [
          set(state`data`, input`result`),
          ...showToast('How cool is that. @{repoName} has @{data.subscribers_count} subscribers and @{data.stargazers_count} stars!', 5000, "success")
        ],
        error: [set(state`data`, input`result`), ...showToast('Ooops something went wrong: @{data.message}', 5000, "error")]
      }

    ]
...
```
And in our GetData - action we need to output  to different **Paths** now as follows:

```js
function GetData({input, state, http, path}) {
  return http.get("/repos/cerebral/" + input.value)
    .then(response => {
      return path.success({
        result: response.result
      })
    })
    .catch(error => {
      return path.error({
        result: error.result
      })
    })
}
```

As you can see we are using *path* from the context to use it to take ontrol over the flow!


Congratulations! Now you you know how to control your flow using **Path**