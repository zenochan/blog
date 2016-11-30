# 当 angularjs 遇上 微信登录

[微信doc: 网页授权获取用户基本信息](http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html)

- [state参数解析](#state)
- [公众号内静默授权](#auth)

```js
var authUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?'
	+'appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE'
	+'&state=STATE#wechat_redirect';
```

#### <span id="state">`state`参数解析</span>

---

一开始的项目中并没有理彩 `state` 参数, 必不可少的会遇到 `invalid code` 错误，重构项目时，发现可以使用`state`参数来避免这样的情况出现

```js
    function redirectToWechatLogin(appId, redirectUrl)
    {
      var state = "QG_" + new Date().getTime();
      $cookieStore.put(this.COOKIE_KEY_AUTH_STATE, state);

      var url = 'https://open.weixin.qq.com/connect/oauth2/authorize'
        + '?appid=' + appId
        + '&redirect_uri=' + encodeURIComponent(redirectUrl)
        + '&response_type=code'
        + '&scope=snsapi_userinfo'
        + '&state=' + state
        + '#wechat_redirect';

      window.location.replace(url);
    }

    function getAuthCode()
    {
      var cookieState = $cookieStore.get(this.COOKIE_KEY_AUTH_STATE);
      $cookieStore.remove(this.COOKIE_KEY_AUTH_STATE);
      var urlState = UtilsService.getUrlParam("state");

      if (urlState && urlState == cookieState) {
        return UtilsService.getUrlParam("code");
      } else {
        return null;
      }
    }
```

通过 cookie 和 state 参数保证 code 的有效性，可以有效避免 code 被多次使用

#### <span id="auth">公众号内静默授权</span>

---

微信公众号内静默授权和公众号外正常授权貌似不是同一批 coder 写的

```js
var redirectUrl = "zeno.name?ch=a#?/home";
//微信公众号外授权回调为
"zeno.name?ch=a&code=code$state=state#?/home"
//然而公众号内静默授权的回调为
"zeno.name?ch=a#?/home&code=code$state=state"
```
公众号内静默授权并没有对锚点定位 `#` 做处理，相应的回调会导致 angular-route 认为 state 没有必要刷新，js 并不会重新执行一次，webapp 就这样 down 掉了

比较直接的解决方案为将angular route 作为参数,回调时再处理 href

```js
//为了直观理解，此处没有做encodeUrlComponent处理
var redirectUrl = "zeno.name?ch=a&route=?/home"
```
授权回调时

```js
var url = windows.location.href;
url += "#"+ UtilsService.getUrlParam("route");
windows.location.href = url;
```

这里只是提供了一个实现思路，并没有给出具体完美的方案