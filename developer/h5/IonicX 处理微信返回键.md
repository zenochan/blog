# [IonicX 无 hash 链接处理页面堆栈](http://zenochan.win/blogs/1511)
> - 使用 ionicx 开发微信h5, 由于某些原因(如授权url处理，刷新状态丢失，url变化jssdk需重签名等)，没有使用 hash url
> - 这时候如果要处理一些回退逻辑,遂问道度娘，找到了如下方式来处理 back 按钮

---

#### Window.history

```js
// 添加 back 事件监听
window.addEventListener("popstate",e=>{},false);
// 替换状态
window.history.replaceState(data,title,url)
// 压入状态
window.history.pushState(data,title,url)
// 获取 state data 对象
window.history.state
```

---
#### TODO
- [ ]


---
#### SHOW ME THE CODE
```ts
@IonicPage()
@Component({
selector: 'page-index',
templateUrl: 'index.html',
})
export class IndexPage
{
  ionViewDidLoad()
  {
    Back.onIonViewDidLoad(this);
  }

  ionViewWillUnload()
  {
    Back.onIonViewWillUnload(this);
  }
}
```

- back.ts
```ts
export class Back
{
  public static onIonViewDidLoad(page: any)
  {
    console.log('ionViewDidLoad', page.constructor.name);
    page.time = new Date().getTime();
    page.back = e => {
      // 这里获取到的 state 实际上是 popstate 后的 data, so 后面的代码需要替换前一个 state data
      if (window.history.state.time == page.time) {
        page.navCtrl.pop().catch(e => console.error(e));
        // 注销监听
        window.removeEventListener("popstate", page.back);
        page.back = null;

        // 处理其他需要操作的事件， 如 dismiss modal
      }
    };
    window.addEventListener("popstate", page.back, false);

    // 设置前一个和将要压入的 state data 数据
    window.history.replaceState({time: page.time, active: false}, null, null);
    window.history.pushState({time: page.time, active: true}, null, null);
  }

  public static onIonViewWillUnload(page: any)
  {
    console.log('ionViewWillUnload', page.constructor.name);
    // 注销监听器
    page.back && window.removeEventListener("popstate", page.back);
    if (window.history.state.time == page.time && window.history.state.active) {
      // 如果不是通过 back 回退的，需要手动回退一个状态
      window.history.back();
    }
  }
}

```


---

#### THANKS
- [iOS微信浏览器回退不刷新（监听浏览器回退事件）][0e5b7a45]
- [认识window.history][97172f22]

  [0e5b7a45]: https://blog.csdn.net/qq_17757973/article/details/70037985 "csdn"
  [97172f22]: https://blog.csdn.net/leafgw/article/details/50557062 "csdn"
