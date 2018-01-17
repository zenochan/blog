# [BigBang]()

#### [android 6.0之后 android.permission.SYSTEM_ALERT_WINDOW使用方法变动](http://blog.csdn.net/chenlove1/article/details/52047105)

  > 在 Service 中不能请求权限，以及弹窗，此处开启了一个 Activity 来做权限处理和弹窗操作

  ```java
  void showAlert(){
    if (! Settings.canDrawOverlays(MainActivity.this)) {
        Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                Uri.parse("package:" + getPackageName()));
        startActivityForResult(intent,10);
    }else{
      // show dialog
    }
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == 10) {
      if (!Settings.canDrawOverlays(this)) {
        // SYSTEM_ALERT_WINDOW permission not granted...
        Toast.makeText(MainActivity.this,"not granted",Toast.LENGTH_SHORT);
      }else{
        // show dialog
      }
    }
  }
  ```

#### `Android O` 中 `Alert Window` 显示变化
- 在声明SYSTEM_ALERT_WINDOW 权限后，选择使用TYPE_SYSTEM_ALERT等来使弹窗显示在其他应用之上；
- 在Android O系统上都将显示在TYPE_APPLICATION_OVERLAY类型的窗口之下。
- 而targetSdkVersion为android O的应用直接使用TYPE_APPLICATION_OVERLAY显示Alter Window。这样你的弹框可能还是在别人的弹窗之下。

> [值得你关注的Android8.0(Android O)上的重要变化Z](http://blog.csdn.net/w7849516230/article/details/68935953)
