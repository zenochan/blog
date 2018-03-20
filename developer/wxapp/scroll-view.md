# [scroll-view](https://mp.weixin.qq.com/debug/wxadoc/dev/component/scroll-view.html)
可滚动视图区域。




## 滚动到顶部

| 属性名     | 类型   | 默认值 | 说明         |
|------------|--------|--------|--------------|
| scroll-top | Number | false  | 滚动条的位置 |

- [微信小程序-scroll-view滚动到索引位置(二)][10ad3a8d]

  [10ad3a8d]: http://blog.csdn.net/zhaoyazhi2129/article/details/53787695 "csdn"

## 实现滚动到底部加载更多

- <font color=red>使用竖向滚动时，需要给`<scroll-view/>`一个固定高度，通过 WXSS 设置 height。</font>
- 通过 js 加 onLoad 时获取窗口高度

| 属性名             | 类型        | 默认值 | 说明                                                            |
|--------------------|-------------|--------|-----------------------------------------------------------------|
| scroll-y           | Boolean     | false  | 允许纵向滚动                                                    |
| lower-threshold    | Number      | 50     | 距底部/右边多远时（单位px），触发 scrolltolower 事件            |
| enable-back-to-top | Boolean     | false  | iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向 |
| bindscrolltolower  | EventHandle |        | 滚动到底部/右边，会触发 scrolltolower 事件                      |



- SHOW ME CODE

  > ```js
  > // index.js
  > Page({
  >   data: {
  >     //...
  >     height: 600
  >   },
  >
  >   //...
  >
  >   onLoad: function () {
  >     wx.getSystemInfo({
  >       success: res => {
  >         this.data.height = res.windowHeight
  >         this.setData({
  >           height: res.windowHeight
  >         });
  >       }
  >     });
  >
  >     // ...
  >   },
  >
  >   loadMore:function(){
  >     // do something
  >   }
  > }
  > ```
  >
  > ```xml
  > <!-- index.wxml -->
  > <import src="/towxml/entry.wxml"/>
  > <scroll-view scroll-y="true" style="height:{{height}}px;" bindscrolltolower="loadMore"
  >              class="page">
  >   <view style="height:{{height}}px;">
  >     <view wx:for="{{articles}}" wx:key="id" wx:for-item="blog" class="item-blog">
  >       <template is="entry" data="{{...blog.blog}}"/>
  >     </view>
  >   </view>
  > </scroll-view>
  > ```
