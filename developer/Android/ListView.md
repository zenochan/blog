# ListView
---
### 加载更多
---
```java
mListView.setOnScrollListener(new AbsListView.OnScrollListener()
{
    @Override
    public void onScrollStateChanged(AbsListView view, int scrollState) { }

    @Override
    public void onScroll(AbsListView view, int firstVisibleItem, int visibleItemCount, int totalItemCount)
    {
        //滚动到倒数第三个以后
        if (totalItemCount - (firstVisibleItem + visibleItemCount) < 3) {
            //TODO : 加载更多
        }
    }
});
```