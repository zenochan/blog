# 微信 App 支付

[Android接入指南](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=1417751808&token=&lang=zh_CN)

1. 下载 SDK [libammsdk.jar][tenpaysdk], 导入项目依赖

[tenpaysdk]: https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419319167&token=&lang=zh_CN

2. Manifest 中添加必要权限

```xml
  <uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
  <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
  <uses-permission android:name="android.permission.READ_PHONE_STATE"/>
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```
### 在代码中使用开发包

- 注册到微信

> 在程序入口 Activity 的 onCreate 回调函数处（或其他合适的地方）将你的应用 id 注册到微信。

```java
@Override
public void onCreate(...)
{
  String appId = "wx88888888";
  regToWx(this,appId);
}


private void regToWx(Context context, String appId)
{
  IWXAPI api = WXAPIFactory.createWXAPI(context, appId,true);
  api.registerApp(appId);
}
```

- 发送请求到微信终端

```java
//sendReq 是第三方 app 主动发送消息给微信
//发送完成之后会切回到第三方 app 界面
boolean sendReq(BaseReq req);
```
sendReq 实现示例

```java
//初始化一个 WXTextObject 对象
WXTextObject textObject = new WXTextObject();
textObj.text = text;

//用 WXTextObject 对象初始化一个 WXMediaObject 对象
WXMediaMessage msg = new WXMediaMessage();
msg.mediaObject = textObj;
msg.description = text;

//构造一个 Req
SendMessageToWx.Req req = new SendMessageToWx.Req();
req.transaction = String.valueOf(System.currentTimeMillis());//transaction 字段用于唯一标识一个请求
req.message = msg;

//调用 api 接口发送数据到微信
api.sendReq(req);
```
> 需要注意的是，SendMessageToWX.Req的scene成员，如果scene填WXSceneSession，那么消息会发送至微信的会话内。如果scene填WXSceneTimeline（微信4.2以上支持，如果需要检查微信版本支持API的情况， 可调用IWXAPI的getWXAppSupportAPI方法,0x21020001及以上支持发送朋友圈），那么消息会发送至朋友圈。scene默认值为WXSceneSession。

- 发送响应到微信终端

```java
//sendResp 是微信向第三方 app 请求数据
//第三方 app 回应数据之后会切回到微信界面
boolean sendResp(BasResp resp);
```

sendResp的实现与SendReq类似

```java

//初始化一个 WXTextObject 对象
WXTextObject textObject = new WXTextObject();
textObj.text = text;

//用 WXTextObject 对象初始化一个 WXMediaObject 对象
WXMediaMessage msg = new WXMediaMessage(textObj);
msg.description = text;

//构造一个 Resp
GetMessageFromWX.Resp resp = new GetMessageFromWX.Resp();
//将req的transation设置到 resp 对象中
//其中 bundle 为微信传递过来的 intent 所带的内容, 通过 getExtras() 方法获取
resp.transaction = new GetMessageFromWX.Req(bundle).transaction;
resp.message = msg;

//调用 api 接口响应数据到微信
```

> 具体要发送的内容由第三方app开发者定义，具体可参考微信开发工具包中的SDK Sample Demo源码。

- 接受微信的请求及返回值（**重要**）

在包名相应目录下新建一个 wxapi 目录，并在 wxapi 目录下新增一个 WXEntryActivity 类， 该类继承至 Activity, **并在 manifest 文件里面嘉善 exported 属性， 设置为true**

```xml
<activity
  android:name=".wxapi.WXEntryActivity"
  android:label="@string/app_name"
  android:exported="true"
  />
```

实现IWXAPIEventHandler接口，微信发送的请求将回调到 onReq 方法， 发送熬微信请求的响应结果将回调到 onResp 方法

在WXEntryActivity 中奖接收到的 intent 及实现了 IWXAPIEventHandler 接口的对象传递给 IWXAPI 接口的 handleIntent 方法

当微信发送请求到你的应用，将通过IWXAPIEventHandler接口的onReq方法进行回调，类似的，应用请求微信的响应结果将通过onResp回调。

## proguard 配置

```
-keep class com.tencent.mm.sdk.** {
   *;
}
```

