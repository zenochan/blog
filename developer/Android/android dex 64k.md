# android dex 64k

[Configure Apps with Over 64K Methods](https://developer.android.com/studio/build/multidex.html)

- 添加依赖

```groovy
dependencies {
    compile fileTree(include: ['*.jar'], dir: 'libs')
    compile 'com.android.support:multidex:1.0.0'
}
```

- 开启multiDex

```groovy
defaultConfig {
	applicationId "com.vieboo.test"
	minSdkVersion 14
	targetSdkVersion 21
	versionCode 1
	versionName "1.0"

	// Enabling multidex support.
	multiDexEnabled true
}
```

- 在 AndroidManifest.xml 中的  application 标签中添加

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.vieboo.test">
     <application
        ...
         android:name="android.support.multidex.MultiDexApplication">
        ...
    </application>
</manifest>
```

- 提示：如果你的应用程序继承 Application , 那么你需要重写并继承 MultiDexApplication

```java
/**
 * 分割 Dex 支持
* @param base
*/
@Override
protected void attachBaseContext(Context base) {
  super.attachBaseContext(base);
  MultiDex.install(this);
}
```