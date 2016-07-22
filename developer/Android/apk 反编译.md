# .apk 反编译

## apktool

```
Exception in thread "main" brut.androlib.err.UndefinedResObject: resource 
```

解决

```
添加 --no-res 参数
```

我想修改frameworks中的android.policy.jar文件，用apktool和smali反编译出来的都是*.smali文件


>apktool d -d xxx.apk
用-d选项，同时使用1.3.2版本的apktool

[Android反编译——Mac篇](http://seniorzhai.github.io/2015/08/06/Android%E5%8F%8D%E7%BC%96%E8%AF%91%E2%80%94%E2%80%94Mac%E7%AF%87/)

## Jadx

运行

```bash
jadx-gui
```

## AndroidDecompiler