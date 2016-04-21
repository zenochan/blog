# AngularJS 路由

### 路由模式
- 标签模式  

	> AngularJS默认使用这个模式，这个模式下URL会以'#'开头。
- html5 模式  

	> 这个模式下的 URL 和一般的没什么区别，如果选择该模式， AngularJS 会根据浏览器重写所有的`<a href=""></a>`

### html 模式
- [AngularJS去掉的URL里的#号](http://blog.fens.me/angularjs-url/)

	```javascript
	//通过设置$locationProvider.html5Mode(true)就行了。
	app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	    //...
	    $locationProvider.html5Mode(true);
	}]);
	```
- 直接访问路由 404

	> 1. 用户直接访问路由页面时，请求是先被提交到了`WebServer`后台，后台路由没有对应页面的路由管理，就会出现`404`的错误。
	>	
	> ---
	> 1. 静态网站：纯前台网站(JS+HTML+CSS)，通过Nginx提供Web服务。
	> 2. 动态网站：前台(JS + HTML + CSS) + 后台Node.js提供Web服务。

- 404 静态页面解决方案

	编辑`index.html`,增加`base`标签
	
	```html
	<html lang="zh-CN" ng-app="book">
	<head>
	    <base href="/">
	    ...
	</head>
	```

	app.js 增加`$locationProvider.html5Mode(true)`
	
	```javascript
	app.config(['$routeProvider', '$locationProvider', '$sceProvider', 'tplProvider', function ($routeProvider, $locationProvider, $sceProvider, tplProvider) {
	    $routeProvider
	        .when('/', {templateUrl: tplProvider.html('welcome'), controller: 'WelcomeCtrl'})
	        .when('/book', {templateUrl: tplProvider.html('book'), controller: 'BookCtrl'})             //图书
	        .when('/book-r1', {templateUrl: tplProvider.html('book-r1'), controller: 'BookR1Ctrl'})   //R的极客理想
	        .when('/video', {templateUrl: tplProvider.html('video'), controller: 'VideoCtrl'})         //视频
	        .when('/about', {templateUrl: tplProvider.html('about'), controller: 'AboutCtrl'})         //关于作者
	        .otherwise({redirectTo: '/'});
	    $locationProvider.html5Mode(true);
	}]);
	```
	`nginx` 配置文件增加`try_files` 配置
	
	```nginx
	server {
	        set $htdocs /www/deploy/mysite/onbook;
	        listen 80;
	        server_name onbook.me;
	        location / {
	            root $htdocs;
	            try_files $uri $uri/ /index.html =404;
	        }
	}
	```
	
---
-[AngularJS 路由入门](http://www.cnblogs.com/kavlez/p/4293261.html)