# Gilde

- [glide的配置](http://blog.csdn.net/lijinhua7602/article/details/45624157)
- [Glide 一个专注于平滑滚动的图片加载和缓存库](http://www.jianshu.com/p/4a3177b57949)

- [图片加载框架Glide解析](http://blog.csdn.net/u011228356/article/details/45026431)

- [Android开发：使用Glide动态加载圆形图片和圆角图片](http://www.9sou.net/?a=url&k=2d865afb&u=aHR0cDovL3d3dy5hcGtidXMuY29tL2FuZHJvaWQtMjQ1MjU3LTEtMS5odG1sP19kc2lnbj02MGY4YTFhZg==&t=QW5kcm9pZOW8gOWPkTrkvb@nlKhHbGlkZeWKqOaAgeWKoOi9veWchuW9ouWbvueJh!WSjOWchuinkuWbvueJhyAtIEFuZHJvaWTlrp7kvosuLi4=&s=YW5kcm9pZCBnbGlkZSDlnIbop5I=)

    ﻿![](http://img.blog.csdn.net/20150730093826299)

### 监听加载完成

```java
//加载完成后获得 bitmap
Glide.with(this).load("http://.....***.jpg").asBitmap()
    .into(new BitmapImageViewTarget(bgIv)
    {
      @Override
      public void onResourceReady(Bitmap resource, GlideAnimation<Bitmap> glideAnimation)
      {
        super.onResourceReady(resource, glideAnimation);
        // resolve resource  at here
      }
    });

// glide 3.6.1
Glide.with(this).load("http://......jpg").asBitmap()
    .into(new BitmapImageViewTarget(bgIv)
          {
            @Override
            public void onResourceReady(Bitmap resource, GlideAnimation<? super Bitmap> glideAnimation)
            {
              super.onResourceReady(resource, glideAnimation);
              cn.qiguai.android.utils.BitmapUtil.blur(resource, maskView);
            }
          }
    );

//加载完成后获得 drawable       
Glide.with(context).load("http://.....***.jpg")
    .into(new DrawableImageViewTarget(holder.avatarIv)
    {
      @Override
      public void onResourceReady(Drawable resource, GlideAnimation<Drawable> animation)
      {
        super.onResourceReady(resource, animation);
        userAvatar = resource;
      }
    });

// glide 3.6.1
Glide.with(context).load(CookieUtil.getLoginUser().getAvatar())
    .into(new ImageViewTarget<GlideDrawable>(holder.avatarIv)
    {
      @Override
      protected void setResource(GlideDrawable resource)
      {
        userAvatar = resource;
      }
    });
    
```

## 清除缓存

```java
Glide.get(this).clearDiskCache();//只能在子线程执行
Glide.get(this).clearMemory();//只能在 UI 线程执行
```


## [使用Glide加载图片系列之一从不同的数据源加载图片](http://www.jianshu.com/p/31c82862ef19)
> 根据view 大小选择下载源
