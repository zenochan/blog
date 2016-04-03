- [深入理解ANGULARUI路由_UI-ROUTER](http://www.html5jq.com/fe/angular_node/20150417/133.html)

- [GitHub](https://github.com/angular-ui/ui-router)

### 使用 `.config` 方式

```js
var myApp = angular.module('myApp', ['ui.router']);
myApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider)
{
  $stateProvider.state('home', {
    url: '/home',
    template:'<h1>Hello {{person.name}}</h1>',    //HTML字符串
    templateUrl: 'templates/home.html',           //HTML模板的路径
    //templateProvider: function ()                 //返回HTML模板路径的函数
    //{
    //  return 'templates/home.html';
    //},
    //是否缓存状态信息,不换次是，每次进入页面都会重新加载控制器
    cache: false,
    //允许开发者在路由到达前载入数据保证
    resolve: {
      //这个函数的值会被直接返回，因为它不是数据保证
      person: function ()
      {
        return {
          name: "Ari",
          email: "ari@fullstack.io"
        }
      },
      //这个函数为数据保证, 因此它将在控制器被实例化之前载入。
      currentDetails: function ($http)
      {
        return $http({
          method: 'JSONP',
          url: '/current_details'
        });
      },
      //前一个数据保证也可作为依赖注入到其他数据保证中！（这个非常实用）
      facebookId: function ($http, currentDetails)
      {
        $http({
          method: 'GET',
          url: 'http://facebook.com/api/current_user',
          params: {
            email: currentDetails.data.emails[0]
          }
        })
      }
    },
    //定义控制器
    controller: function ($scope, person, currentDetails, facebookId)
    {
      $scope.person = person;
    }
  })
  
  //嵌套路由
  .state('home.select', {
    url: '/select',
    views: {
      'tab-chats': {
        templateUrl: 'templates/select.html',
        controller: 'SelectCtrl'
      }
    }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');
  //'?' 微信安全支付域名截断 route 部分
  $locationProvider.hashPrefix('?');
});
```