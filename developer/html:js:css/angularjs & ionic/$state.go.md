### params
1. 在目标页面规定接受的参数

	```javascript
	$stateProvider.state('page2',{
		url:'/page2',
		templateUrl:"templates/page2.html",
		params:{'data':null}
	})
	```
2. 传参
	
	```javascript
	$state.go('page2',{daa:'aaa'});
	```
	
3. 目标页面接受参数：控制器注入$stateParams之后可以通过$stateParams.data来获取‘aaa’

	```javascript
	.controller("Page2Controller", function ($stateParams) {
		//获取参数
		$stateParams.data;
	});
	```