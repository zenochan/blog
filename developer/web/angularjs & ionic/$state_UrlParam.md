[阅读原文](http://www.360doc.com/content/15/0517/13/203871_471206681.shtml)

### 基本参数
```javascript
$stateProvider.state('users',{
	url:"/users/:userId",
	//也可以使用花括号的方式指定参数
	//url::"/users/{userId}",
	template:"templates/userinfo.html",
	controller:function($stateParams){
		//url '/users/zeno'
		expect($stateParams).toBe({userId:zeno});
	}
});
```

>
示例：  
'/hello/' - 只匹配'/hello/'路径,没有对斜杠进行特殊处理，这种模式将匹配整个路径，而不是一个前缀
`/users/:userId` - 匹配`/users/zeno`,`/users/1234!!!`,甚至还匹配`/users/`,但是不匹配'/users'和'/users/zeno/details'.第二个路径段将被捕获作为参数`userId`
`/users/{userid}` - 与前面的示例相同，但使用花括号语法


