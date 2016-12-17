# Laravel

- [MAC更新自带php版本到7.0](http://www.jianshu.com/p/153c4cfa71b7)

- [Composer 中国全量镜像](http://pkg.phpcomposer.com/)
  `composer config -g repo.packagist composer https://packagist.phpcomposer.com`

- [Laravel 精选资源大全（持续更新）](http://laravelacademy.org/post/153.html)

###### phpstorm 方法提示和智能补全

[利用PHPDoc發揮PhpStorm的威力](http://oomusou.io/phpstorm/phpstorm-ide-helper/)

```bash
$ composer require barryvdh/laravel-ide-helper

```


```json
  "require-dev": {
    "fzaninotto/faker": "~1.4",
    "mockery/mockery": "0.9.*",
    "phpunit/phpunit": "~5.0",
    "symfony/css-selector": "3.1.*",
    "symfony/dom-crawler": "3.1.*",
//    "barryvdh/laravel-ide-helper": "^2.2",
    "barryvdh/laravel-ide-helper": "dev-master",
    "doctrine/dbal": "^2.5"
  }
```

config/app.php

```php
'providers' => [
      ~~~~
  Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class,
],
```

```bash
$ php artisan ide-helper:generate
```


