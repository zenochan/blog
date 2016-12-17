Android 支付宝支付

```xml
    <activity
      android:name="com.alipay.sdk.app.H5PayActivity"
      android:configChanges="orientation|keyboardHidden|navigation"
      android:exported="false"
      android:screenOrientation="behind"/>
    <activity
      android:name="com.alipay.sdk.auth.AuthActivity"
      android:configChanges="orientation|keyboardHidden|navigation"
      android:exported="false"
      android:screenOrientation="behind"/>
```

权限

```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

正确的签名示例

>
_input_charset=\"utf-8\"&body=\"奇怪果园，水果订单\"&notify_url=\"http:\/\/api-2016-main.51qiguai.com\/ali-pay-notify\"&out_trade_no=\"QG2016-1000010112\"&partner=\"2088511027975131\"&payment_type=\"1\"&seller_id=\"qikuaixinxi@163.com\"&service=\"mobile.securitypay.pay\"&sign=\"eAreD7N3BWjQUw6mvLXuWYCQBvt3936YKKeeprKQzPW3gPHMTEpcygY0kSHTO354Jr%2B4FRkLgYxDwJBFJcGSO4EzmrfNttRn8C955hILqEaGGoeDMSVNlqmtwFej7lHMFrUmt52sPZyO1uBnnXVpVB7iCJSWbncTtydQpPNn6aY%3D\"&sign_type=\"RSA\"&subject=\"奇怪果园-订单编号:1000010112\"&total_fee=\"49.00\"
