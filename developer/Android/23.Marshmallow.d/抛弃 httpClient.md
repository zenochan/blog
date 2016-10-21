### android api23 抛弃了httpClient，许多基于httpClient第三方库怎么办？



---



```

// Apache Http

android {

    useLibrary 'org.apache.http.legacy'

}

// Header

dependencies {

    compile "org.apache.httpcomponents:httpcore:4.3.2"

}

```



libs中导入org.apache.http.legacy.jar

该jar包在：**\sdk\platforms\android-23\optional下

