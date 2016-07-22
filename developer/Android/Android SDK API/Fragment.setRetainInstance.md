- [doc: setRetainInstance(boolean)](http://developer.android.com/reference/android/app/Fragment.html#setRetainInstance(boolean))
- [Android应用开发：Fragment的非中断保存setRetaineInstance](http://blog.csdn.net/airk000/article/details/38557605)

# 引言
首先，要明确什么叫“非中断保存”。熟悉Fragment的开发人员都知道，Fragment是依附于Activity的。当Activity销毁时，Fragment会随之销毁。而当Activity配置发生改变（如屏幕旋转）时候，旧的Activity会被销毁，然后重新生成一个新屏幕旋转状态下的Activity，自然而然的Fragment也会随之销毁后重新生成，而新生成的Fragment中的各个对象也与之前的那个Fragment不一样，伴随着他们的动作、事件也都不一样。所以，这时候如果想保持原来的Fragment中的一些对象，或者想保持他们的动作不被中断的话，就迫切的需要将原来的Fragment进行非中断式的保存。

# 生命周期
Activity的生命周期在配置发生改变时：

```
onPuase->onStop->onDestroy->onStart->onResume
```

比如在Activity中发生屏幕旋转，其生命周期就是如此。而在onDestroy中，Activity会将其FragmentManager所包含的Fragment都销毁掉（默认状态），即Fragment的生命周期为：

```
onDestroyView->onDestroy->onDetach
```

通过查看FragmentManager.java的代码，可以发现在Fragment生命周期执行到onDestroyView时候，状态会由正常的ACTIVITY_CREATED变为CREATED。而到了onDestroy生命周期时候，执行的代码出现了有意思的事情：

```java
if (!f.mRetaining) {
    f.performDestroy();
}
f.mCalled = false;
f.onDetach();
if (!f.mCalled) {
    throw new SuperNotCalledException("Fragment " + f
        + " did not call through to super.onDetach()");
}
if (!keepActive) {
   if (!f.mRetaining) {
        makeInactive(f);
   } else {
        f.mActivity = null;
        f.mParentFragment = null;
        f.mFragmentManager = null;
   }
}
```
来源： <https://github.com/android/platform_frameworks_base/blob/master/core/java/android/app/FragmentManager.java>

当Fragment的mRetaining被置true的时候，Destroy生命周期并不会执行，而Fragment的mRetaining状态是通过其retainNonConfig()来配置的，配置条件是Fragment不为空且Framgnet的mRetainInstance为true。到这里就能看到，如果想要自己的Fragment不被销毁掉，就要让这个mRetainInstance为true。

通过查阅Fragment.java源码发现，通过API setRetainInstance和getRetainInstance可以对其进行操作。同样，Android文档中对这两个接口也有了一定的描述。

总结
这里结合Fragment.java中setRetainInstance的注释进行一下Fragment非中断保存的总结。原注释如下：

```java
/**
     * Control whether a fragment instance is retained across Activity
     * re-creation (such as from a configuration change).  This can only
     * be used with fragments not in the back stack.  If set, the fragment
     * lifecycle will be slightly different when an activity is recreated:
     * <ul>
     * <li> {@link #onDestroy()} will not be called (but {@link #onDetach()} still
     * will be, because the fragment is being detached from its current activity).
     * <li> {@link #onCreate(Bundle)} will not be called since the fragment
     * is not being re-created.
     * <li> {@link #onAttach(Activity)} and {@link #onActivityCreated(Bundle)} <b>will</b>
     * still be called.
     * </ul>
     */
    public void setRetainInstance(boolean retain) {
        if (retain && mParentFragment != null) {
            throw new IllegalStateException(
                    "Can't retain fragements that are nested in other fragments");
        }
        mRetainInstance = retain;
    }
```

如果想叫自己的Fragment即使在其Activity重做时也不进行销毁那么就要设置setRetainInstance(true)。进行了这样的操作后，一旦发生Activity重组现象，Fragment会跳过onDestroy直接进行onDetach（界面消失、对象还在），而Framgnet重组时候也会跳过onCreate，而onAttach和onActivityCreated还是会被调用。需要注意的是，要使用这种操作的Fragment不能加入backstack后退栈中。并且，被保存的Fragment实例不会保持太久，若长时间没有容器承载它，也会被系统回收掉的。