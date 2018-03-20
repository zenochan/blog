# 抽屉菜单 [wx-drawer - zhongjie-chen](https://github.com/zhongjie-chen/wx-drawer)

- 收录于：2018年01月11日
- 通过 `postion:fixed` 和 `left` 属性实现
- <font color=red>在复杂的页面表现比较卡顿</font>


![](https://github.com/zhongjie-chen/blog/blob/gh-pages/img/wx-drawer.gif?raw=true)

- 监听view touch 事件
  - `bindtouchstart`
  - `bindtouchmove`
  - `bindtouchcancel`
  - `bindtouchend`
  - `bindtap`

#### 在 `onLoad()` 中获取 `windowWidth`, 并计算 `drawer` 宽度

- 修改了触发区域，左屏四分之一滑动才会触发
- 修改了 draw 特性，改为完全隐藏
- <font color=red>与小程序自身体的侧滑返回/关闭冲突，建议改为右侧滑出/按钮出发或者使用 `ActionSheet` 代替</font>


#### SHOW ME CODE
```js
// /base/drawer.js
const MENU_WIDTH_SCALE = 0.75
const FAST_SPEED_SECOND = 300
const FAST_SPEED_DISTANCE = 5
const FAST_SPEED_EFF_Y = 50


export class DrawOptions {
  windowWidth = null
  menuWidth = 0
  offsetLeft = 0
  tStart = true
}

export class Drawer {
  options = new DrawOptions()
  handle = false

  constructor() {
    let res = wx.getSystemInfoSync()
    this.windowWidth = res.windowWidth;
    this.options.menuWidth = this.windowWidth * MENU_WIDTH_SCALE;
    this.options.offsetLeft = 0;
    this.options.windowWidth = res.windowWidth;
  }

  onTouchStart(e) {
    let {clientX, clientY} = e.touches[0];
    if (clientX > this.windowWidth * 0.15 && this.options.offsetLeft < this.options.menuWidth) return
    this.handle = true

    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.tapStartTime = e.timeStamp;
    this.startX = clientX;
    this.options.tStart = true;
    // this.setData({ui: this.data.ui})
  }

  onTouchMove(e) {
    if (this.handle === false) return

    let {clientX} = e.touches[0];
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    this.options.offsetLeft -= offsetX;
    if (this.options.offsetLeft <= 0) {
      this.options.offsetLeft = 0;
    } else if (this.options.offsetLeft >= this.options.menuWidth) {
      this.options.offsetLeft = this.options.menuWidth;
    }
    // this.setData({ui: ui})
  }

  onTouchEnd(e) {
    if (this.handle === false) return
    this.handle = false

    this.options.tStart = false;
    // this.setData({ui: this.data.ui})
    let ui = this.options;
    let {clientX, clientY} = e.changedTouches[0];
    let endTime = e.timeStamp;
    //快速滑动
    if (endTime - this.tapStartTime <= FAST_SPEED_SECOND) {
      //向左
      if (this.tapStartX - clientX > FAST_SPEED_DISTANCE) {
        ui.offsetLeft = 0;
      } else if (this.tapStartX - clientX < -FAST_SPEED_DISTANCE && Math.abs(this.tapStartY - clientY) < FAST_SPEED_EFF_Y) {
        ui.offsetLeft = ui.menuWidth;
      } else {
        if (ui.offsetLeft >= ui.menuWidth / 2) {
          ui.offsetLeft = ui.menuWidth;
        } else {
          ui.offsetLeft = 0;
        }
      }
    } else {
      if (ui.offsetLeft >= ui.menuWidth / 2) {
        ui.offsetLeft = ui.menuWidth;
      } else {
        ui.offsetLeft = 0;
      }
    }
    // this.setData({ui: ui})
  }

}

module.exports = Drawer
```

```css
/*
/base/drawer.xxss
@import "/base/drawer.wxss";
*/
.drawer-content {
  z-index: 10;
  position: fixed;
  bottom: 0;
  top: 0;
}


.drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  /*left: 0;*/
  background-color: white;
  border-right: 1px solid #dbdbdb;
  box-sizing: border-box;
}

.withAnimate {
  transition: all 300ms ease;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -ms-perspective: 1000;
  perspective: 1000;
}
```


```js
// /index/index.js
//获取应用实例
const app = getApp()
const Drawer = require("../../base/drawer")

Page({
  data: {
    //...
    drawer: null
  },

  onLoad: function () {
    //...

    this.drawer = new Drawer()
    this.setData({drawer: this.drawer.options})

    this.onTouchStart = function (e) {
      this.drawer.onTouchStart(e)
      this.setData({drawer: this.drawer.options})
    }
    this.onTouchMove = function (e) {
      this.drawer.onTouchMove(e)
      this.setData({drawer: this.drawer.options})
    }
    this.onTouchEnd = function (e) {
      this.drawer.onTouchEnd(e)
      this.setData({drawer: this.drawer.options})
    }
  }
})
```


```xml
<!-- index/index.wxml -->
<view bindtouchstart="onTouchStart" bindtouchmove="onTouchMove" bindtouchend="onTouchEnd"
      class="drawer-content"
      style="left:{{drawer.offsetLeft}}px;width: {{drawer.windowWidth}}px;"
>
    <scroll-view style="height:100%">
        <import src="/towxml/entry.wxml"/>
        <template is="entry" data="{{...article}}"/>
    </scroll-view>
</view>
<view bindtouchstart="onTouchStart" bindtouchmove="onTouchMove" bindtouchend="onTouchEnd"
      class="drawer"
      style="width: {{drawer.menuWidth}}px;left:{{-drawer.menuWidth + drawer.offsetLeft}}px">
</view>
```
