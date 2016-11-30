# GULP

[官方文档](http://www.gulpjs.com.cn/docs/getting-started/)
## 安装Gulp

1. 全局安装 gulp：  

	```bash
	$ npm install --global gulp
	```
2. 作为项目的开发依赖（devDependencies）安装：

	```bash
	$ npm install --save-dev gulp
	```
3. 在项目根目录下创建一个名为 gulpfile.js 的文件：

	```javascript
	var gulp = require('gulp');
	
	gulp.task('default', function() {
	  // 将你的默认的任务代码放在这
	});
	```
4. 运行 gulp

	```bash
	$ gulp
	```
	默认的名为 default 的任务（task）将会被运行，在这里，这个任务并未做任何事情。

	想要单独执行特定的任务（task），请输入 

	```bash
	gulp <task> <othertask>
	```

## gulp插件介绍

> 那些常用的gulp插件

1. [run-sequence](https://www.npmjs.com/package/run-sequence)  推荐指数：★★★★★  
  让gulp任务，可以相互独立，解除任务间的依赖，增强task复用


1. [browser-sync](http://www.browsersync.io/)  推荐指数：★★★★★  
  静态文件服务器，同时也支持浏览器自动刷新


1. [del](https://www.npmjs.com/package/del)  推荐指数：★★★★★  
  删除文件/文件夹

1. [gulp-coffee](https://github.com/wearefractal/gulp-coffee)  推荐指数：★★★★  
  编译coffee代码为Js代码，使用coffeescript必备


1. [coffee-script](https://www.npmjs.com/package/coffee-script)  推荐指数：★★★  
  gulpfile默认采用js后缀，如果要使用gulpfile.coffee来编写，那么需要此模块


1. [gulp-nodemon](https://www.npmjs.com/package/gulp-nodemon)  推荐指数：★★★★★  
  自动启动/重启你的node程序，开发node服务端程序必备

1. [yargs](https://www.npmjs.com/package/yargs)  推荐指数：★★★  
  用于获取启动参数，针对不同参数，切换任务执行过程时需要

1. [gulp-util](https://www.npmjs.com/package/gulp-util)  推荐指数：★★★★★  
  gulp常用的工具库

1. [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)  推荐指数：★★★★  
  通过UglifyJS来压缩JS文件

1. [gulp-concat](https://www.npmjs.com/package/gulp-concat)  推荐指数：★★★★  
  合并JS

1. [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)  推荐指数：★★★★  
  处理JS时，生成SourceMap

1. [gulp-less](https://www.npmjs.com/package/gulp-less)  推荐指数：★★★★  
  将less预处理为css

1. [gulp-sass](https://www.npmjs.com/package/gulp-sass)  推荐指数：★★★★  
  将sass预处理为css

1. [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)  推荐指数：★★★★  
  使用Autoprefixer来补全浏览器兼容的css。

1. [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)  推荐指数：★★★★
  压缩css。

1. [connect-history-api-fallback](https://www.npmjs.com/package/connect-history-api-fallback) 推荐指数：★★★   
  开发angular应用必须，用于支持HTML5 history API.

## sample

一般的gulpfile文件（采用coffee编写）

#### 首先是，node应用程序：

```javascript
gulp = require('gulp')
runSequence = require('run-sequence')

coffee = require('gulp-coffee')
gutil = require('gulp-util')
del = require('del')
nodemon = require('gulp-nodemon')
argv = require('yargs').argv
rename = require('gulp-rename')
browserSync = require('browser-sync')
reload = browserSync.reload

```
#### 处理参数

---

```javascript
isDebug = not (argv.r || false)
```
##### 入口任务

```javascript
gulp.task(‘default‘, (callback)->
  runSequence(
    ['clean']
    ['coffee-server', 'copy-serve', 'copy-client', 'coffee-client', 'copy-views']
    'serve'
    ['browserSync', 'watch']
    callback
  )
)
```
##### 构建相关任务

```js
gulp.task('clean', (callback)->
  del(['./dist/'], callback)
)

gulp.task('coffee-server', ->
  gulp.src([
    './src/**/*.coffee'
    '!./src/public/**/*.coffee'
    '!./src/views/**'               //*/
  ])
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(gulp.dest('./dist/'))
)

gulp.task('copy-server', ->
  gulp.src([
    './src/config*/*.json'    //*/
    './src/database*/*.*'			//*/
  ])
  .pipe(gulp.dest(‘./dist/‘))
)

gulp.task('copy-client', ->
  gulp.src([
    './src/public*/**/*'				
    '!./src/public*/**/*.coffee'
  ])
  .pipe(gulp.dest('./dist/'))
)

gulp.task('coffee-client', ->
  gulp.src([
    './src/public*/**/*.coffee'
  ])
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(gulp.dest('./dist/'))
)

gulp.task('copy-views', ->
  gulp.src('./src/views/**/*.html')
  .pipe(rename({extname: '.vash'}))
  .pipe(gulp.dest('./dist/views'))
)
```


##### 启动程序,打开浏览器任务

```js
nodemon_instance = undefined
gulp.task('serve', (callback)->
  called = false
  if not nodemon_instance
    nodemon_instance = nodemon({
      script: './dist/index.js'
      ext: 'none'
    })
    .on('restart', ->
      console.log('restart server......................')
    )
    .on('start', ->
      if not called
        called = true
        callback()
    )
  else
    nodemon_instance.emit("restart")
    callback()
  nodemon_instance
)

gulp.task('browserSync', ->
  browserSync({
    proxy: 'localhost:3000'
    port: 8888
  #files: ['./src/public/**/*']
    open: true
    notify: true
    reloadDelay: 500 # 延迟刷新
  })
)
```


##### 监视任务

```javascript
gulp.task('watch', ->
  gulp.watch([
    './src/**/*.*'
    '!./src/**/*.coffee'
  ], ['reload-client'])
  gulp.watch('./src/**/*.coffee', ['reload-server'])
)

gulp.task('reload-client', (callback) ->
  runSequence(
    ['copy-client', 'coffee-client', 'copy-views']
    'bs-reload'
    callback
  )
)

gulp.task('reload-server', (callback) ->
  runSequence(
    ['copy-server', 'coffee-server']
    'serve'
    'bs-reload'
    callback
  )
)

gulp.task('bs-reload', ->
  browserSync.reload()
)
```

#### 接下来是前端网站

```javascript
gulp = require('gulp')
gutil = require('gulp-util')
coffee = require('gulp-coffee')
del = require('del')
runSequence = require('run-sequence')
browserSync = require('browser-sync')
historyApiFallback = require('connect-history-api-fallback')
```
##### 入口点

```javascript
gulp.task(‘default‘, ->
  runSequence(
    [‘clean‘]
    [‘copy‘]
    [‘serve‘]
  )
)

gulp.task('copy', ->
  gulp.src([
    './src/**/*.*'
    '!./src/**/*.coffee'
    '!./src/**/*.less'
  ])
  .pipe(gulp.dest('./dist'))
)

gulp.task('clean', (callback)->
  del(['./dist/'], callback)
)

gulp.task('serve', ->
  browserSync({
    server: {
      baseDir: "./dist"
      middleware: [historyApiFallback]
    }
    port: 2222
  })
)

gulp.task('watch', ->
  # do something...
)
```