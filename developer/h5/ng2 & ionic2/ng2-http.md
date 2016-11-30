# ng2-interceptors

## post请求发送陈功第一版

```typescript
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class ApiService {
  options: RequestOptions;

  constructor(private http: Http) {

    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    this.options = new RequestOptions({
      headers: headers
    });
  }

  post() {
    this.http.post("http://t.churgo.com/supplierApi/", ApiService.serializeData({
      param: JSON.stringify({
        "head": {
          "channelCode": "1",
          "callTime": 1479997890254,
          "client": "1",
          "appVersion": "1.0",
          "supplierID": "2"
        },
        "sign": "7704354c260217bd2111a98019e7beb7",
        "body": {"plugins": "Orders", "status": 1, "pageNum": 20, "act": "list", "page": 1}
      })
    }), this.options).subscribe(res => console.log(res));
  }


  static serializeData(data) {
    // If this is not an object, defer to native stringification.
    if (typeof data != "object") {
      return ((data == null) ? "" : data.toString());
    }
    let buffer = [];
    // Serialize each key in the object.
    for (let name in data) {
      if (!data.hasOwnProperty(name)) {
        continue;
      }
      let value = data[name];
      buffer.push(
        encodeURIComponent(name) +
        "=" +
        encodeURIComponent((value == null) ? "" : value)
      );
    }
    // Serialize the buffer and clean it up for transportation.
    let source = buffer
      .join("&")
      .replace(/%20/g, "+");
    return (source);
  }
}

```

## [Angular2 Http拦截器 Interceptor 实现](http://www.jianshu.com/p/dcf4f4d7c9f4)  [git](https://github.com/voliva/angular2-interceptors)



