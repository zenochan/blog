[Android KITKAT 以上实现沉浸式状态栏](http://www.jianshu.com/p/f8374d6267ef)

[Android 4.4 上实现透明导航栏和状态栏 Translucent system bar](http://segmentfault.com/a/1190000000403651)



---

1.设置主题 values-v19



    <!-- translucent system bars -->

    <item name="android:windowTranslucentStatus">true</item>

    <item name="android:windowTranslucentNavigation">true</item>

	<item name="android:fitsSystemWindows">true</item>

	<item name="android:clipToPadding">true</item>

  

2.设置颜色和设置padding



	private void initSystemBar() {

    	if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {

        	setTranslucentStatus(true);

        	SystemBarTintManager tintManager = new SystemBarTintManager(this);

        	tintManager.setStatusBarTintEnabled(true);

        	tintManager.setStatusBarTintResource(R.color.actionbar_bg);

        	SystemBarConfig config = tintManager.getConfig();

        	listViewDrawer.setPadding(0, config.getPixelInsetTop(true), 0, config.getPixelInsetBottom());

    	}

	}





[Android开发基础教程（九）为Action Bar添加Style](http://www.kwstu.com/ArticleView/kwstu_201408210540445115) 



### Material Theme

--- 



- [Material Theme](http://blog.csdn.net/xyz_lmn/article/details/35569793)

1. 系统 widgets 设置调色板

	![](http://img.blog.csdn.net/20140628172230000)

	

		<style name="AppTheme" parent="android:Theme.Material">  

			<item name="android:textColorPrimary">@color/white</item>

        	<item name="android:windowBackground">@color/default_bg</item>

        	<!-- requires API level 21-->

        	<!--   your app's branding color (for the app bar) -->

        	<item name="android:colorPrimary">@color/main</item>

        	<!--   darker variant of colorPrimary (for status bar, contextual app bars) -->

        	<item name="android:colorPrimaryDark">@color/main</item>

        	<!--   theme UI controls like checkboxes and text fields -->

        	<item name="android:colorAccent">@color/black_a87</item>

        </style>



 

### Android 设置全屏的 3 种方式

---



1. 在onCreate方法中添加代码  

		//必须在setContentView之前才是有效的，否则会报错

		requestWindowFeature(Window.FEATURE_NO_TITLE);

		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,WindowManager.LayoutParams.FLAG_FULLSCREEN);

		

2. AndroidMainfest.xml里面使用android自带的theme来设置

		android:theme="@android:style/Theme.NoTitleBar.Fullscreen"

		

3. style.xml中我们使用自定义的theme来设置

		

		<item name="android:windowNoTitle">true</item>

        <item name="android:windowFullscreen">true</item>

        <item name="android:background">#fff</item>

