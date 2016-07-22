# RecyclerView.ItemDecoration


## GridSpacingItemDecoration

- [Android Recyclerview GridLayoutManager column spacing](http://stackoverflow.com/questions/28531996/android-recyclerview-gridlayoutmanager-column-spacing)

```java
public class GridSpacingItemDecoration extends RecyclerView.ItemDecoration {

    private int spanCount;
    private int spacing;
    private boolean includeEdge;

    public GridSpacingItemDecoration(int spanCount, int spacing, boolean includeEdge) {
        this.spanCount = spanCount;
        this.spacing = spacing;
        this.includeEdge = includeEdge;
    }

    @Override
    public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
        int position = parent.getChildAdapterPosition(view); // item position
        int column = position % spanCount; // item column

        if (includeEdge) {
            outRect.left = spacing - column * spacing / spanCount; // spacing - column * ((1f / spanCount) * spacing)
            outRect.right = (column + 1) * spacing / spanCount; // (column + 1) * ((1f / spanCount) * spacing)

            if (position < spanCount) { // top edge
                outRect.top = spacing;
            }
            outRect.bottom = spacing; // item bottom
        } else {
            outRect.left = column * spacing / spanCount; // column * ((1f / spanCount) * spacing)
            outRect.right = spacing - (column + 1) * spacing / spanCount; // spacing - (column + 1) * ((1f /    spanCount) * spacing)
            if (position >= spanCount) {
                outRect.top = spacing; // item top
            }
        }
    }
}
```

### 没有边距

```java
int spanCount = 3; // 3 columns
int spacing = 50; // 50px
boolean includeEdge = false;
recyclerView.addItemDecoration(new GridSpacingItemDecoration(spanCount, spacing, includeEdge));
```

![](http://i.stack.imgur.com/eWj7o.png)

### 有边距

```java
int spanCount = 3; // 3 columns
int spacing = 50; // 50px
boolean includeEdge = true;
recyclerView.addItemDecoration(new GridSpacingItemDecoration(spanCount, spacing, includeEdge));
```

![](http://i.stack.imgur.com/eWj7o.png)