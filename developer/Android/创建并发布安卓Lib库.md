# 创建并发布安卓Lib库

- 阅读[原文][1]查看完整说明，以及一篇翻译的不怎么好的[博文](2)可以参考。

[1]: https://medium.com/android-news/the-complete-guide-to-creating-an-android-library-46628b7fc879#.pqv8dp10x
[2]: http://www.cnblogs.com/tiantianbyconan/p/4388175.html "[Android]使用Gradle提交自己开源Android库到Maven中心库"

我总是疯狂的使用安卓开发社区里优秀的第三方库。很长一段时间，我也想贡献一些库，但是不知道怎么做。通过浏览别人关于怎么发布 Android 库的博客，发现三篇博文对细节描述的不够，提供了不一样信息。所以我通过这些信息成功发布了Android Lib，并记录于此。

---

![Android Studio](https://cdn-images-1.medium.com/max/800/1*kVYyI01LD39yGCO1OttgWA.png)  
首先，我使用 Android Studio，使用 gralde 作为官方的构建系统，创建我的所有安卓项目。确认你使用了最新版本的 [Android Studio](http://goo.gl/b3h6yc)。 

##  专业术语 - Terminology 
在开始之前需要熟悉一些专业术语。

**Project**
> Android Studio 中的项目，作为一个完整的Android App。Android Studio 项目由一个或几个 module 组成。一个 Android Studio 项目相当于 Eclipse 中的一个 workspace。

**Module**
> 一个模块（module）作为你应用的一个组件，作为构建、测试、DEBUG依赖。modules 包括 App 所需的源码和资源。Android Studio 中的 module 相当于 Eclipse 的 project。

**AAR**
> 'aar' 是 Android Library 项目的二进制打包文件。[AAR 包结构](http://goo.gl/4VDGcJ)安卓库项目主要输出为一个 .aar 包（支持安卓的打包文档）。.aar 由编码（.jar 或 .so 文件）和资源文件(manifest,res,assets)组成。

**Maven Central Repository**
> Maven 社区提供的库。包括大量的公用库。[搜索 Maven](http://search.maven.org)浏览maven库的内容。[Gradle, Please](http://gradleplease.appspot.com) 是另一个允许你搜索 Maven Center 的工具。Gradle 通过 `jCenter()`使用 jCener 库([关于 jCenter]())。Maven Central 或 Central Repository 均指的是 Maven Central Repository.

**Sonatype**
> Sonatype 是软件开源库集合(OSSRH - Open Source Software Repository Hosting) 服务于项目拥有者和贡献者发布他们的组件到 Center Repository。 It is a hosted deployment of Sonatype Nexus Professional with the [Nexus Staging Suite](http://books.sonatype.com/nexus-book/reference/staging.html) used for the deployment process and validation, combined with a sync process to the Central Repository content delivery network. ([Sonatype Producers](http://central.sonatype.org/pages/producers.html))

**GPG**
> [GNU]() Privacy Guard (GPG, also GnuPG), the [GNU project’s](http://www.gnu.org) free alternative to PGP, is encryption software that’s compliant with the OpenPGP ([RFC4880](http://www.ietf.org/rfc/rfc4880.txt)) standard. Using GPG you can encrypt (and decrypt) files that contain sensitive data, such as electronic protected health information (ePHI) regulated by the Health Insurance Portability and Accountability Act (HIPAA) privacy and security rules. For more on GPG, see the [GNU Privacy Guard website](https://www.gnupg.org).


# 准备你的 Android Library

我使用 [Trestle](https://github.com/lawloretienne/Trestle) 库举例。你需要根据情况修改配置，使你的项目能发布到Maven Central。

- 分离核心代码到库 Library model ，使用库的代码做为应用 model。我的项目中，将代码分离为 library 和 sample 两个 module。检出设置 [library module](https://goo.gl/axZu6u) 的提示。也许你需要重命名 modules。

- 确认在 **sample** module 中的 **build.gradle** 文件中包括  
	
	```groovy
	apply plugin: 'com.android.application'
	dependencies {
   		compile project(':library')
	}
	```
	
- 确认在 **library** module 中的 **build.gradle** 文件中包括 

	```groovy
	apply plugin: 'com.android.library'
	apply from: 'maven-push.gradle'
	``` 

- 在 **library** module 中添加 **gradle.properties** 文件, 添加如下内容

	```peroperties
	POM_NAME=ProjectName
	POM_ARTIFACT_ID=projectName
	POM_PACKAGING=aar
	```
	
- 在 **library** module 中添加 maven-push.gradle 文件, 添加如下内容

	```groovy
	/*
 	* Copyright 2013 Chris Banes
 	*
 	* Licensed under the Apache License, Version 2.0 (the "License");
 	* you may not use this file except in compliance with the License.
 	* You may obtain a copy of the License at
 	*
 	*     http://www.apache.org/licenses/LICENSE-2.0
 	*
 	* Unless required by applicable law or agreed to in writing, software
 	* distributed under the License is distributed on an "AS IS" BASIS,
 	* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 	* See the License for the specific language governing permissions and
 	* limitations under the License.
 	*/

	apply plugin: 'maven'
	apply plugin: 'signing'

	def isReleaseBuild() {
    	return VERSION_NAME.contains("SNAPSHOT") == false
	}

	def getReleaseRepositoryUrl() {
    	return hasProperty('RELEASE_REPOSITORY_URL') ? RELEASE_REPOSITORY_URL
            : "https://oss.sonatype.org/service/local/staging/deploy/maven2/"
	}

	def getSnapshotRepositoryUrl() {
    	return hasProperty('SNAPSHOT_REPOSITORY_URL') ? SNAPSHOT_REPOSITORY_URL
            : "https://oss.sonatype.org/content/repositories/snapshots/"
	}

	def getRepositoryUsername() {
    	return hasProperty('NEXUS_USERNAME') ? NEXUS_USERNAME : ""
	}

	def getRepositoryPassword() {
    	return hasProperty('NEXUS_PASSWORD') ? NEXUS_PASSWORD : ""
	}

	afterEvaluate { project ->
    	uploadArchives {
        	repositories {
            	mavenDeployer {
                beforeDeployment { MavenDeployment deployment -> signing.signPom(deployment) }

                pom.groupId = GROUP
                pom.artifactId = POM_ARTIFACT_ID
                pom.version = VERSION_NAME

                repository(url: getReleaseRepositoryUrl()) {
                    authentication(userName: getRepositoryUsername(), password: getRepositoryPassword())
                }
                snapshotRepository(url: getSnapshotRepositoryUrl()) {
                    authentication(userName: getRepositoryUsername(), password: getRepositoryPassword())
                }

                pom.project {
                    name POM_NAME
                    packaging POM_PACKAGING
                    description POM_DESCRIPTION
                    url POM_URL

                    scm {
                        url POM_SCM_URL
                        connection POM_SCM_CONNECTION
                        developerConnection POM_SCM_DEV_CONNECTION
                    }

                    licenses {
                        license {
                            name POM_LICENCE_NAME
                            url POM_LICENCE_URL
                            distribution POM_LICENCE_DIST
                        }
                    }

                    developers {
                        developer {
                            id POM_DEVELOPER_ID
                            name POM_DEVELOPER_NAME
                        }
                    }
                }
            	}
        	}
    	}

    	signing {
        	required { isReleaseBuild() && gradle.taskGraph.hasTask("uploadArchives") }
        	sign configurations.archives
    	}

    	//task androidJavadocs(type: Javadoc) {
    	//source = android.sourceSets.main.allJava
    	//}

    	//task androidJavadocsJar(type: Jar, dependsOn: androidJavadocs) {
    	//classifier = 'javadoc'
    	//from androidJavadocs.destinationDir
    	//}

    	task androidSourcesJar(type: Jar) {
        	classifier = 'sources'
        	from android.sourceSets.main.java.sourceFiles
    	}

    	artifacts {
        	archives androidSourcesJar
    	}
	}
	```