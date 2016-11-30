# [ng-bind-html](http://www.runoob.com/angularjs/ng-ng-bind-html.html)

### 定义和用法
> ng-bind-html 指令是通一个安全的方式将内容绑定到 HTML 元素上。
当你想让 AngularJS 在你的应用中写入 HTML，你就需要去检测一些危险代码。通过在应用中引入 "angular-santize.js" 模块，使用 ngSanitize 函数来检测代码的安全性。 in your application you can do so by running the HTML code through the ngSanitize function.


```html
<script src="http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
<script src="http://apps.bdimg.com/libs/angular.js/1.5.0-beta.0/angular-sanitize.min.js"></script>
<body>

<div ng-app="myApp" ng-controller="myCtrl">

    <p ng-bind-html="myText"></p>

</div>

<script>
var app = angular.module("myApp", ['ngSanitize']);
app.controller("myCtrl", function($scope) {
    $scope.myText = "My name is: <h1>John Doe</h1>";
});
</script>
```




# [AngularJS: Bind html string with custom style](http://stackoverflow.com/questions/21503588/angularjs-bind-html-string-with-custom-style)

在使用 angularjs 开发单页应用的过程中，直接使用 ng-bind-html 会把行内样式过滤掉，需要做如下处理

you have to use $sce.trustAsHtml(), to use it directly into the DOM

```js
$scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
};
```

And in DOM/HTML part

```html
<div data-ng-bind-html="trustAsHtml(htmlString)"></div>
```