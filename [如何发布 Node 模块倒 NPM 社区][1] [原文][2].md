# [如何发布 Node 模块倒 NPM 社区][1] [原文][2]

[1]:http://cnodejs.org/topic/5364dcde31a870830700b847
[2]:http://weizhifeng.net/how-to-publish-a-node-module.html


## 创建 repository

在 github 上创建 module 所需要的 repository ，用来托管 module 的代码，并方便用户报告 bug， 最重要的是可以让其他开发者向 module 共享代码， 这也是乐趣所在

## 初始化 package.json

```bash
$ mkdir easy_mongo && cd easy_mongo
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (node) easy_mongo
version: (0.0.0) 0.1.0
description: An easy mongodb client for node.js based on native mongodb driver.
entry point: (index.js) 
test command: make test
git repository: https://github.com/JeremyWei/easy_mongo.git
keywords: Mongodb node easy 
author: JeremyWei
license: (BSD-2-Clause) MIT
```

输入完成之后，系统会要你确认文件的内容是否有误，如果没有问题直接输入yes，那么package.json就创建好了。
npm init创建的package.json文件只包含了基本的信息，我们还需要加入对其他module的依赖关系：

```
  "dependencies": {
    "@angular/core": "^2.3.0",
    "@types/showdown": "^1.4.31",
    "showdown": "^1.5.1"
  }
```

完成了上面的步骤之后，我们接下来要在www.npmjs.org注册一个账号，这个账号会被添加到npm本地的配置中，用来发布module用。

```bash
$ npm adduser	
Username: your name
Password: your password
Email: 513500085@qq.com
```
如果出现以下错误，可能是你的npm版本太低，通过sudo npm install -g npm升级一下。

```bash
npm WARN adduser Incorrect username or password
npm WARN adduser You can reset your account by visiting:
npm WARN adduser 
npm WARN adduser     http://admin.npmjs.org/reset
npm WARN adduser 
npm ERR! Error: forbidden may not mix password_sha and pbkdf2
npm ERR! You may need to upgrade your version of npm:
npm ERR!   npm install npm -g
npm ERR! Note that this may need to be run as root/admin (sudo, etc.)
```

成功之后，npm会把认证信息存储在~/.npmrc中，并且可以通过以下命令查看npm当前使用的用户：

```bash
$ npm whoami 
```

以上完成之后，我们终于可以发布自己的module了：

```bash
$ npm publish --tag 0.1.0
npm http PUT https://registry.npmjs.org/easy_mongo
npm http 201 https://registry.npmjs.org/easy_mongo
+ easy_mongo[@0](/user/0).1.0
```

npm社区版本号规则采用的是semver(语义化版本)，主要规则如下：

> 版本格式：主版号.次版号.修订号，版号递增规则如下：  
> 	主版号：当你做了不相容的 API 修改，  
> 	次版号：当你做了向下相容的功能性新增，  
> 	修订号：当你做了向下相容的问题修正。  
> 	先行版号及版本编译资讯可以加到「主版号.次版号.修订号」的后面，作为延伸。  
> 
至此，我们已经成功把module发布到了npmjs.org，是不是很简单，快动手把自己的module也贡献出来吧。




