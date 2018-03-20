## Exception

```java
java.lang.RuntimeException: Unable to start receiver com.churgo.market.receiver.BootCompletedReceiver: java.lang.IllegalStateException: Not allowed to start service Intent { cmp=com.churgo.market/.service.ListenClipboardService }: app is in background uid UidRecord{e9d7181 u0a216 RCVR idle procs:1 seq(0,0,0)}
	at android.app.ActivityThread.handleReceiver(ActivityThread.java:3264)
	at android.app.ActivityThread.-wrap17(Unknown Source:0)
	at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1682)
	at android.os.Handler.dispatchMessage(Handler.java:105)
	at android.os.Looper.loop(Looper.java:251)
	at android.app.ActivityThread.main(ActivityThread.java:6563)
	at java.lang.reflect.Method.invoke(Native Method)
	at com.android.internal.os.Zygote$MethodAndArgsCaller.run(Zygote.java:240)
	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:767)
Caused by: java.lang.IllegalStateException: Not allowed to start service Intent { cmp=com.churgo.market/.service.ListenClipboardService }: app is in background uid UidRecord{e9d7181 u0a216 RCVR idle procs:1 seq(0,0,0)}
	at android.app.ContextImpl.startServiceCommon(ContextImpl.java:1505)
	at android.app.ContextImpl.startService(ContextImpl.java:1461)
	at android.content.ContextWrapper.startService(ContextWrapper.java:644)
	at android.content.ContextWrapper.startService(ContextWrapper.java:644)
	at com.churgo.market.receiver.BootCompletedReceiver.onReceive(Unknown Source:29)
	at android.app.ActivityThread.handleReceiver(ActivityThread.java:3257)
```



## Solution

[Android 8.0: java.lang.IllegalStateException: Not allowed to start service Intent][7f7e5d2e]

I got solution, For pre 8.0 devices you have to just use startService() but post 7.0 devices you have to use startForgroundService(). Here is sample for code to start service.

```java
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
  context.startForegroundService(new Intent(context, ServedService.class));
} else {
  context.startService(new Intent(context, ServedService.class));
}
```

And in service class please add below for notification:

```java
@Override
public void onCreate() {
  super.onCreate();
  startForeground(1,new Notification());
}
```

Where N_MR1 is android version 25.

Hope it will solve IllegalArgumentException!.

Happy coding!!.



  [7f7e5d2e]: https://stackoverflow.com/questions/46445265/android-8-0-java-lang-illegalstateexception-not-allowed-to-start-service-inten "stackoverflow"
