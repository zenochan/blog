# ng currency

显示 `-$10.00` 替换 `($10.00)`

```js
 app.config(function ($provide)
  {
    //replace ($10.00) with -$10.00
    $provide.decorator('$locale', ['$delegate', function ($delegate)
    {
      if ($delegate.id == 'en-us') {
        $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
        $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
      }
      return $delegate;
    }]);
  }
```