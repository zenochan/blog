- [tianzhijiexian/.../adapter.md][1]
- [tianzhijiexian/CommonAdapter][2]

[1]:https://github.com/tianzhijiexian/Android-Best-Practices/blob/master/2015.10/adapter/adapter.md 'GitHub'
[2]:https://github.com/tianzhijiexian/CommonAdapter 'GitHub'

---

### adapter到底是view还是controler呢？
> 
- adapter既不是v也不是c
- adapter就是一个数据和视图的绑定装置
- 数据、视图、绑定器三者的代码不应该缠在一起

---
### 需求
>
1. 数据不应知道adapter和view的存在
2. Adapter不应该成为一个独立的类，而是fragment、activity中的内部类
3. Adapter能支持多种item类型，能仅改动几行代码即可添加一个新的item
4. Adapter能对自身内部的item进行复用，不需要我们手动判断convertView是否为null
5. Adapter中对findviewById方法应该有优化，类似于ViewHolder
6. item能独立的处理自身的逻辑和点击事件，自身应具有极高的独立性和可维护性
7. item自身的setListener应仅设置一次，而不用在getView时重复建立
8. Adapter应该提供item的局部刷新功能
9. Listview的adapter应该在稍微修改后支持recyclerView，方便未来的过渡

---
### 解决方案
1. 数据不应该知道adapter和view的存在  
	
	建立这样一个超级简单的数据模型：
	
	```java
    public class DemoModel
    {
    
      public String content;
    
      public String type;
    
      /**
       * 这个model中决定数据类型的字段
       */
      public Object getDataType()
      {
        return type;
      }
    
    }
	```
	他就是一个`POJO`，没有任何特别之处，他完全不知道其他对象的


2. Adapter 是内部类
	
	```java
	listView.setAdapter(new CommonAdapter<DemoModel>(data) {
		@Override
		public AdapterItem<DemoModel> getItemView(Object type) {
			return new TextItem()
		}
	});
	```
3. Adapter 能支持多种 item 类型
	
	```java
	listView.setAdapter(new CommonAdapter<DemoModel>(data, 3) {
	
	    @Override
	    public Object getItemViewType(DemoModel demoModel) {
	        return demoModel.getDataType();
	    }
	
	    @Override
	    public AdapterItem<DemoModel> getItemView(Object type) {
	        switch ((String) type) {
	            case "text":
	                return new TextItem();
	            case "button":
	                return new ButtonItem();
	            case "image":
	                return new ImageItem();
	            default:
	                return new TextItem();
	        }
	    }
	});
	```
	
4. Adapter 能对自身内容的 item 进行自动复用
	
	AdapterItem
	
	```java
	
	/**
	 * adapter的所有item必须实现此接口.
	 * 通过返回{@link #getLayoutResId()}来自动初始化view，之后在  
	 * {@link #onBindViews(View)}中就可以初始化item的内部视图了。<br>
	 */
	public interface AdapterItem<T> {
	
	    /**
	     * @return item布局文件的layoutId
	     */
	    @LayoutRes
	    int getLayoutResId();
	
	    /**
	     * 初始化views
	     */
	    void onBindViews(final View root);
	
	    /**
	     * 设置view的参数
	     */
	    void onSetViews();
	
	    /**
	     * 根据数据来设置item的内部views
	     *
	     * @param model    数据list内部的model
	     * @param position 当前adapter调用item的位置
	     */
	    void onUpdateViews(T model, int position);
	}  
	```
	
	对 item 复用的优化
	
	```java
	LayoutInflater mInflater;
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
	    // 不重复创建inflater对象，无论你有多少item，我都仅仅创建一次
	    if (mInflater == null) {
	        mInflater = LayoutInflater.from(parent.getContext());
	    }
	
	    AdapterItem<T> item;
	    if (convertView == null) {
	        // 当convertView为null，说明没有复用的item，那么就new出来
	        item = getItemView(mType);
	        convertView = mInflater.inflate(item.getLayoutResId(), parent, false);
	        convertView.setTag(R.id.tag_item, item);
	        // 调用bindView进行view的findview。
	        // 可以看到仅仅是新new出来的view才会调用
	        item.onBindViews(convertView); 
	        // findview后开始setView。将绑定和设置分离，方便整理代码结构
	        item.onSetViews(); 
	    } else {
	        // 如果这个item是可以复用的，那么直接返回
	        item = (AdapterItem<T>) convertView.getTag(R.id.tag_item);
	    }
	    // 无论你是不是复用的item，都会在getView时触发updateViews方法，更新数据
	    item.onUpdateViews(mDataList.get(position), position);
	    return convertView;
	}
	```
	
5. Adapter 中对 findviewById 方法应该有优化， 类似 ViewHolder
	
	一行代码解决问题
	
	```java
    private DemoItemImageBinding b;

    @Override
    public void onBindViews(View root) {
        b = DataBindingUtil.bind(root);
    }
	```
	
	传统绑定
	
	```java
    TextView textView;
    @Override
    public void onBindViews(View root) {
        textView = (TextView) root.findViewById(R.id.textView);
    }
	```
	
	>
	强烈建议使用dataBinding做视图的绑定操作，因为它自动化程度很高，再也不用看到findviewById这种方法了。而且当你更改了view的id或者类型，它也会自动识别，大大增加了可维护性。  
	对于mvvm的支持力度在idea层面遇到了无法进行代码提示的问题，所以不建议将其用于视图绑定之外的数据绑定上。
	
6. item 能独立的处理自身的逻辑和点击事件，自身应该具有极高的独立性

	```java
	public class TextItem implements AdapterItem<DemoModel> {
	
	    public int getLayoutResId() {
	        return R.layout.demo_item_text;
	    }
	
	    TextView textView;
	
	    public void onBindViews(View root) {
	        textView = (TextView) root.findViewById(R.id.textView);
	    }
	
	    public void onSetViews() {}
	
	    public void onUpdateViews(DemoModel model, int position) {
	        textView.setText(model.content);
	    }
	}
	```
	
	>
	> - 这个item对于被哪个适配器绑定是不知情的，各个数据的更新应该全部由自己完成。现在，你可以将它放入不同的界面，只需要给他同样的数据模型即可。
	> - 强烈建议不要用itemOnListener做点击的判断，而是在每个item中做判断。这样的好处就是item自身知道自己的所有操作，而listview仅仅做个容器。现在RecyclerView的设计思路也是如此的，让item独立性增加，也更加符合我们现实生活中的逻辑。
	> - 我们生活中的认知是这样的：这个列表中支持普通的微博和官方推荐的广告，如果用户点了普通的微博则进入微博，如果点了广告就进入广告页面。所以点击的是微博还是广告应该是自己判断的，而不是交给容器来做。

7. item  自身的 setListenner 应仅设置一次，不用在 getView 时重复建立 

	```java
	/**
	 * @tips
	 * 优化小技巧：这个就等于一个viewHolder，用于复用，所以不会重复建立对象
	 */
	public class ButtonItem implements AdapterItem<DemoModel> {
	
	    private int mPosition;
	
	    @Override
	    public int getLayoutResId() {
	        return R.layout.demo_item_button;
	    }
	
	    private DemoItemButtonBinding b;
	
	    @Override
	    public void onBindViews(final View root) {
	        b = DataBindingUtil.bind(root);
	    }
	
	    /**
	     * @tips
	     * 优化小技巧：在这里直接设置按钮的监听器。
	     * 因为这个方法仅仅在item建立时才调用，所以不会重复建立监听器。
	     */
	    @Override
	    public void onSetViews() {
	        // 这个方法仅仅在item构建时才会触发，所以在这里也仅仅建立一次监听器，不会重复建立
	        b.button.setOnClickListener(new View.OnClickListener() {
	            @Override
	            public void onClick(View v) {
	                Toast.makeText(b.getRoot().getContext(), "pos = " + mPosition, Toast.LENGTH_SHORT).show();
	            }
	        });
	    }
	
	    @Override
	    public void onUpdateViews(DemoModel model, int position) {
	        // 在每次适配器getView的时候就会触发，这里避免做耗时的操作
	        mPosition = position;
	        b.button.setText(model.content);
	    }
	
	}  
	```
	
8. Adapter 应该提供 item 的局部刷新功能

	- recyclerView 中已经提供了这个功能
	- 网上流传比较多的是下面的代码做 listview 的单条刷新
	
	```java
	//其实就是手动调用了对应position的item的getView方法
	//笔者觉得不是很好，为何不直接使用recyclerView呢？
	private void updateSingleRow(ListView listView, long id) {  

        if (listView != null) {  
            int start = listView.getFirstVisiblePosition();  
            for (int i = start, j = listView.getLastVisiblePosition(); i <= j; i++)  
                if (id == ((Messages) listView.getItemAtPosition(i)).getId()) {  
                    View view = listView.getChildAt(i - start);  
                    getView(i, view, listView);  
                    break;  
                }  
        }  
    }  
	```
	
9. listview 的 adapter 应该在稍微修改后支持 recyclerView

	```java
	// ListView 的写法
	listView.setAdapter(new CommonAdapter<DemoModel>(data) {
	
	    @Override
	    public AdapterItem<DemoModel> getItemView(Object type) {
	        return new TextItem();
	    }
	});
	
	// RecyclerView 的写法
	recyclerView.setAdapter(new CommonRcvAdapter<DemoModel>(data) {
	    public AdapterItem<DemoModel> getItemView(Object type) {
	        return new TextItem();
	    }
	});
	```
	

