
# 支付宝App支付签名

```javascript
{
  app_id: "APP_ID",
  biz_content: {
    timeout_express: "30m",
    product_code: "QUICK_MSECURITY_PAY",
    totol_amount: "0.01",
    subject: "支付主题"，body: "支付内容",
    out_trade_no: "123123213"
  },
  charset: "utf-8",
  method: "alipay.trade.app.pay",
  sign_type: "RSA",
  timestamp: "2016-07-29 16:55:53",
  version: "1.0",
  notify_url:"http://admin.churgo.com/api"
}
```