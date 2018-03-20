# 小程序开发注意事项


#### 服务端 API

- accesstoken


#### 服务器域名配置

在`小程序后台-设置-开发设置-服务器域名`中配置

- 域名只支持 https (request、uploadFile、downloadFile) 和 wss (connectSocket) 协议；
- 域名不能使用 IP 地址或 localhost，且不能带端口号；
- 域名必须经过 ICP 备案；
- 出于安全考虑，api.weixin.qq.com 不能被配置为服务器域名，相关API也不能在小程序内调用。开发者应将 appsecret 保存到后台服务器中，通过服务器使用 appsecret 获取 accesstoken，并调用相关 API。


#### HTTPS 证书
- <font color=red>小程序必须使用 HTTPS 证书</font>
- 为了保证小程序的兼容性，建议开发者按照最高标准进行证书配置，并<font color=red>使用相关工具检查现有证书是否符合要求</font>。
- 阿里系证书 <font color=red>单域名 2600(OV)/5000(DV) 一年</font>

#### 返回说明

- 正常返回的JSON数据包
```json
{
  "openid": "OPENID",
  "session_key": "SESSIONKEY",
  "unionid": "UNIONID"
}
```
- 错误时返回JSON数据包(示例为Code无效)
```json
{
  "errcode": 40029,
  "errmsg": "invalid code"
}
```

#### [获取小程序码][1]
- <font color=red>必须时审核通过的页面才可以生成小程序码</font> 审核前就别忙这接口了
- 和微信公众号二维码类似，永久二维码 10w 条，临时二维码不限制

[1]: https://mp.weixin.qq.com/debug/wxadoc/dev/api/qrcode.html
