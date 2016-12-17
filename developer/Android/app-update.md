# App 升级服务端设计

#### App 版本信息表 `t_app_version`

|column|type|value|desc|
|------|----|-----|----|
|id|bigint|1|主键|
|identify|varchar(128)|com.churgo.market|应用id|
|platform|tinyint|1|平台，1：Android,2:iOS|
|version_code|varchar(64)|20161217|版本号|
|version_name|varchar(64)|1.0.0|版本名称|
|title|varchar(64)|新版本可用|更新标题|
|content|varchar(64)|新功能巴拉巴拉。。bug修复巴拉巴拉|升级信息详情|
|verifying|tinyint|0|1：审核中，0：已发布(用于iOS审核时功能hook)|
|must_update|tinyint|0|1:需要更新后才能使用|
|download_url|varchar(64)|http://.../apk/market_1.2.1.apk|下载链接|
|created_at|timestamp|2016-12-17 12:51:48|创建时间|
|updated_at|timestamp|2016-12-17 12:51:48|更新时间|

CONSTRINT  APP_UPDATE_MESSAGE  PRIMARY  KEY(identify,platform,version_code) --把APP_ID和VERSION_CODE作为组合主键约束，两者组合不能重复

#### 请求接口必要参数

- versionCode
- versionName
- platform
- identify


#### 接口返回

- version :{....}// 相应平台最新版本信息
- minVersion: 20161217//最低可用版本
- mustUpdate: [20161123，20161131，20161217]//必须更新后才能使用的版本
