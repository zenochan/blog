[阅读原文](http://www.tuicool.com/articles/7JfQV3)  
[how-do-i-add-a-library-project-to-the-android-studio](http://stackoverflow.com/questions/16588064/how-do-i-add-a-library-project-to-the-android-studio 'stackoverflow')

## 举例

- 库： https://github.com/AltBeacon/android-beacon-library.git
- 主工程: https://github.com/AltBeacon/android-beacon-library-reference.git

1. File->Import Project:先导入android-beacon-library-reference工程
2. File->Import Module:导入android-beacon-library作为module,module名为:android-beacon-library
3. 这个时候gradle文件sync是不成功的。因为默认会在主工程目录下寻找android-beacon-library目录，找不到。所以要在setting.gradle里加上

	```groovy
	project(':android-beacon-library').projectDir = new File('../android-beacon-library')
	```
4. setting.gradle里包含新的库
	
	```groovy
	include ':app', ':android-beacon-library'  
	```
	
5. android-beacon-library-reference的app模块下的build.gradle把引用aar改为引用工程
	
	```groovy
	dependencies {
	    compile project(':android-beacon-library')
	   //compile 'org.altbeacon:android-beacon-library:2+@aar'
	} 
	```