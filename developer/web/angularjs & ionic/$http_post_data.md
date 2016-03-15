- [angularJs 的$http的post怎么用的](https://segmentfault.com/q/1010000002660550)

```js
app.config(function ($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.transformRequest = [function(data) {
            // If this is not an object, defer to native stringification.
            if (!angular.isObject(data)) {
                return ((data == null) ? "" : data.toString());
            }
            var buffer = [];
            // Serialize each key in the object.
            for (var name in data) {
                if (!data.hasOwnProperty(name)) {
                    continue;
                }
                var value = data[name];
                buffer.push(
                  encodeURIComponent(name) +
                  "=" +
                  encodeURIComponent((value == null) ? "" : value)
                );
            }
            // Serialize the buffer and clean it up for transportation.
            var source = buffer
              .join("&")
              .replace(/%20/g, "+");
            return (source);
    }];
});
```
