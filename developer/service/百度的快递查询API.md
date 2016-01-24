###  [Http Client 使用百度物流 API 需求在 Cookie 中加入 BAIDUID](http://www.oschina.net/question/113627_211243?sort=time)

```java
String url = String.format("http://api.open.baidu.com" +
        "/pae/channel/data/asyncqury?appid=4001&com=%s&nu=%s", com, nu);
//nutz http client
Request request = Request.get(url);
Cookie cookie = request.getCookie();
cookie.set("BAIDUID", "1AA9368A0C47766490C4813104E2E078:FG=1");
request.setCookie(cookie);
Response response = Sender.create(request).send();
```