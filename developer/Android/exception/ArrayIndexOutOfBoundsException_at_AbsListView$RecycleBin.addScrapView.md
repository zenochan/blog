```
10-21 20:18:16.231: E/AndroidRuntime(4475): java.lang.ArrayIndexOutOfBoundsException: length=3; index=3
10-21 20:18:16.231: E/AndroidRuntime(4475):     at android.widget.AbsListView$RecycleBin.addScrapView(AbsListView.java:6437)
10-21 20:18:16.231: E/AndroidRuntime(4475):     at android.widget.ListView.layoutChildren(ListView.java:1559)
10-21 20:18:16.231: E/AndroidRuntime(4475):     at android.widget.AbsListView.onLayout(AbsListView.java:2102)
10-21 20:18:16.231: E/AndroidRuntime(4475):     at se.davison.sodatools.widget.SectionListView.onLayout(SectionListView.java:147)
10-21 20:18:16.231: E/AndroidRuntime(4475):     at android.view.View.layout(View.java:13754)
10-21 20:18:16.231: E/AndroidRuntime(4475):     at android.view.ViewGroup.layout(ViewGroup.java:4362)
```

#### 在Android中给ListView写多个不同的item布局的时候，遇到了一个标题中的数组越界错误

>
给ListView编写多个item条目的时候，我们需要在Adapter适配器中重写 getItemViewType() 和 getViewTypeCoun() 两个方法，我们通常在 getItemViewType() 中给具体的item做区分（这两个方法的返回值类型都为 int 类型），以便在 getView() 加载不同的 layout 布局，而在 getViewTypeCount() 方法中定义一共有多少种不同的item，导致标题中的错误出现的原因，可以使用 StackOverflow 中的一句话来解释:“The item view type you are returning from getItemViewType() is >= getViewTypeCount().”；中文意思就是 getViewTypeCount() 的值必须大于 getItemViewType() 的值，反之，则会出现标题中的错误，通常，我们从 1 开始给不同的item设置 Type 类型，举个栗子来说，我们设置了 Type为1 和 Type为2的item类型，然后在 getViewTypeCount() 方法中返回了 2， 这样的话 getViewTypeCount() 的值就和Type为2的时候返回值相等了，于是出现了标题所示的数据越界错误，通常我们把 Type 值设置为从0开始计数即可保证最大值的 Type 类型也不会大于 getViewTypeCount() 方法的返回值，getItemViewType() 源码中的注释也提醒我们:”Integers must be in the range 0 to {@link #getViewTypeCount} - 1“。


@see

---

- [ArrayIndexOutOfBoundsException with custom Android Adapter for multiple views in ListView](http://stackoverflow.com/questions/2596547/arrayindexoutofboundsexception-with-custom-android-adapter-for-multiple-views-in 'stackoverflow')

- [at android.widget.AbsListView$RecycleBin.addScrapView(AbsListView.java:)](http://www.lai18.com/content/477264.html 'lai18.com')