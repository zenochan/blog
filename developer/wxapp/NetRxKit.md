- [RxJs 核心概念之Observable][e135936f]

```js
import * as Rx from "../libs/rxjs-wx/Rx"

export class Api {
  //封装 get 方法
  get(url) {
    return Rx.Observable.create(sub => {
      let request = wx.request({
        url: url,
        success: res => sub.next(res),
        fail: e => sub.error(e),
        complete: () => sub.complete()
      })

      // 返回取消订阅的操作句柄
      return () => {
        request.abort()
        console.log(`[GET | CANCELED] ${url}`)
      }
    })
  }
}

module.exports = new Api()
```
  [e135936f]: https://segmentfault.com/a/1190000005051034 "sf.gg"
