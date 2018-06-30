# [API 签名设计](http://zenochan.win/blogs/124)

- 对参数 json 窜整体签名，保证参数完整性
- restful API 可以也把 url 加入签名部分
- version: 2017-04-05 22:34:28

## Retrofit Interceptor

####  添加请求头字段
```
@Override
public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();
        //添加请求头
        request = request.newBuilder()
                .addHeader("V", "appvesron")
                .build()
         return chain.proceed(request);
}
```

#### GET 请求添加公共参数
```
@Override
public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();
        if (request.method().equals("GET")) {
          //添加公共参数
        HttpUrl httpUrl = request.url()
                .newBuilder()
                .addQueryParameter("clienttype","1")
                .addQueryParameter("imei", "imei")
                .addQueryParameter("version", "VersionName")
                .addQueryParameter("timestamp", String.valueOf(System.currentTimeMillis()))
                .build();
        request = request.newBuilder().url(httpUrl).build();

        }
        return chain.proceed(request);
}
```

#### POST 请求添加公共参数
```
@Override
public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();
        if (request.method().equals("POST")) {

       if (request.body() instanceof FormBody) {
            FormBody.Builder bodyBuilder = new FormBody.Builder();
            FormBody formBody = (FormBody) request.body();

            //把原来的参数添加到新的构造器，（因为没找到直接添加，所以就new新的）
            for (int i = 0; i < formBody.size(); i++) {
                bodyBuilder.addEncoded(formBody.encodedName(i), formBody.encodedValue(i));
            }

            formBody = bodyBuilder
                    .addEncoded("clienttype", "1")
                    .addEncoded("imei", "imei")
                    .addEncoded("version", "VersionName")
                    .addEncoded("timestamp", String.valueOf(System.currentTimeMillis()))
                    .build();

            request = request.newBuilder().post(formBody).build();
        }
         return chain.proceed(request);
}
```


####  添加 Cookie
```
@Override
public Response intercept(Chain chain) throws IOException {
        Request request = chain.request();
        //添加cookie
         request = request.newBuilder().addHeader("Cookie", "cookie").build();
         return chain.proceed(request);
}
```


####  添加签名和公共参数

```
  //post 添加签名和公共参数
    private Request addPostParams(Request request) throws UnsupportedEncodingException {
        if (request.body() instanceof FormBody) {
            FormBody.Builder bodyBuilder = new FormBody.Builder();
            FormBody formBody = (FormBody) request.body();

            //把原来的参数添加到新的构造器，（因为没找到直接添加，所以就new新的）
            for (int i = 0; i < formBody.size(); i++) {
                bodyBuilder.addEncoded(formBody.encodedName(i), formBody.encodedValue(i));
            }

            formBody = bodyBuilder
                    .addEncoded("ctype", String.valueOf(NetConstants.CLIENT_TYPE_ANDROID))
                    .addEncoded("ver","" )
                    .addEncoded("time", String.valueOf(System.currentTimeMillis()))
                    .build();

            Map<String, String> bodyMap = new HashMap<>();
            List<String> nameList = new ArrayList<>();

            for (int i = 0; i < formBody.size(); i++) {
                nameList.add(formBody.encodedName(i));
                bodyMap.put(formBody.encodedName(i), URLDecoder.decode(formBody.encodedValue(i), "UTF-8"));
            }


            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < nameList.size(); i++) {
                builder.append("&").append(nameList.get(i)).append("=")
                        .append(URLDecoder.decode(bodyMap.get(nameList.get(i)), "UTF-8"));
            }

            formBody = bodyBuilder.
                    addEncoded("sign", MD5Util.MD5(builder.toString()))
                    .build();
            request = request.newBuilder().post(formBody).build();
        }
        return request;
    }
```


## Thanks
-  [retrofit/okhttp添加拦截器公共参数签名，打印详情响应](http://blog.csdn.net/spinchao/article/details/52932145)
