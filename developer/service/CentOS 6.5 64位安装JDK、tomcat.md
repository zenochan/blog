[阅读原文](http://www.52itstyle.com/thread-2052-1-1.html)

### 安装 JDK

---

- 检查系统是否安装 jdk

```bash
# rpm -qa|grep jdk
```

- 如果有，卸载

```bash
# rpm -e  --nodeps  jdk-1.6.0_10-fcs 
```

- 下载 jdk，安装

```bash
rpm -ivh jdk-7u67-linux-x64.rpm
```

- 配置环境变量

```bash
# vi /etc/profile
# jdk enviroment var
export  java_HOME=/usr/java/jdk1.7.0_25
export  CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export  PATH=$PATH:$JAVA_HOME/bin
# source /etc/profile
```

### 安装 tomcat6

---

```bash
# yum install -y tomcat6
```