# Location

#### document.location.replace() 

> 
it is used to clear the last entry in the history and replace it with the address of a new url. replace() removes the URL of the current document from the document history, meaning that it is not possible to use the "back" button to navigate back to the original document.

```js
    function Navigate(){   
         window.location.replace('your link');
        return false;
    }
```