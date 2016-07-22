# Android 禁止截图

在 Activity 中加入

```java
@Override
public void onCreate(){
  //...
  
  //当该window在进行显示的时候，不允许截屏。
  getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
}
```

具体原因如 Android 源码 SurfaceView.java 所示

```java
/**
 * Control whether the surface view's content should be treated as secure,
 * preventing it from appearing in screenshots or from being viewed on
 * non-secure displays.
 *
 * <p>Note that this must be set before the surface view's containing
 * window is attached to the window manager.
 *
 * <p>See {@link android.view.Display#FLAG_SECURE} for details.
 *
 * @param isSecure True if the surface view is secure.
 */
public void setSecure(boolean isSecure) {
  if (isSecure) {
    mLayout.flags |= WindowManager.LayoutParams.FLAG_SECURE;
  } else {
    mLayout.flags &= ~WindowManager.LayoutParams.FLAG_SECURE;
  }
}
```