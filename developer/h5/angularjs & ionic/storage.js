/**
 * $rootScope, cookie, localstage
 * @author xiaojing
 */
BaseService.factory('StorageService', function ($cookieStore, $cookies, $rootScope, $window)
{

  return {
    //获得全局变量
    getGlobal: function (key)
    {
      var value = $rootScope[key];

      if (!value) {
        value = this.getLocal(key);
      }

      if (!value) {
        value = this.getCookie(key);
      }

      return value;
    },
    //设置全局变量
    setGlobal: function (key, value, ignore_cookie)
    {
      $rootScope[key] = value;
      this.setLocal(key, value);

      if (ignore_cookie) {
        return false;
      }

      this.setCookie(key, value);
    },
    //获得全局变量对象
    getGlobalObject: function (key)
    {
      var value = $rootScope[key];

      if (!value) {
        value = this.getLocalJSON(key);
      }

      if (!value) {
        value = this.getCookieObject(key);
      }

      return value;
    },
    //设置全局变量对象
    setGlobalObject: function (key, value, ignore_cookie)
    {
      $rootScope[key] = value;
      this.setLocalJSON(key, value);

      if (!ignore_cookie) {
        return false;
      }

      this.setCookieObject(key, value);
      return true;
    },
    //清空所有存储
    clearAll: function ()
    {
      this.clearLocal();
      this.clearCookies();
    },
    //保存cookie，会替换已有cookie
    setCookie: function (key, value)
    {
      if (this.getCookie(key)) {
        $cookieStore.remove(key);
      }

      //$cookieStore.put(key, value);

      var expire_date = new Date();
      expire_date.setYear(expire_date.getFullYear() + 1); //1年有效
      document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) +
        ';expires=' + expire_date.toGMTString() + ';path=/;domain=51qiguai.com';

    },
    //读取cookie
    getCookie: function (key)
    {
      // var value = null;
      // try {
      //     value = $cookieStore.get(key);
      // }
      // catch(e) {
      // }

      // return value;

      var result = null;

      key += '=';
      for (var ca = document.cookie.split(/;\s*/), i = ca.length - 1; i >= 0; i--) {
        if (!ca[i].indexOf(key)) {
          result = ca[i].replace(key, '');
        }
      }

      // var myCookie = ''+document.cookie+';';
      // var searchName = ''+key+'=';
      // var startOfCookie = myCookie.indexOf(searchName);
      // var endOfCookie;

      // if(startOfCookie != -1){
      //    startOfCookie += searchName.length;
      //    endOfCookie = myCookie.indexOf(';', startOfCookie);

      //    result = (myCookie.substring(startOfCookie, endOfCookie));
      // }

      result = decodeURIComponent(result);

      //qlog(result);

      if (result == '' || result == 'null') {
        result = null;
      }

      if (result) {
        result = result.replace(/(^\"*)|(\"*$)/g, "");
        result = result.replace(/\\\"/g, '"');
      }

      //qlog("After: " + result);

      return result || null;
    },
    //清空所有cookie
    clearCookies: function ()
    {
      angular.forEach($cookies, function (v, k)
      {
        var r = $cookieStore.remove(k);
      });
    },
    //保存JSON对象
    setCookieObject: function (key, json_object)
    {
      this.setCookie(key, JSON.stringify(json_object));
    },
    //返回JSON对象
    getCookieObject: function (key)
    {
      var u = this.getCookie(key);

      try {
        if (u && u != 'undefined') {
          return JSON.parse(u);
        }
      }
      catch (e) {
        qlog('ERROR: ' + e.message);
        qlog(u);
      }

      return null;
    },
    //保存LocalStorage
    setLocal: function (key, value)
    {
      $window.localStorage[key] = value;
    },
    //读取LocalStorage
    getLocal: function (key)
    {
      return $window.localStorage[key] || null;
    },
    //保存JSON对象到LocalStorage
    setLocalJSON: function (key, json_object)
    {
      this.setLocal(key, JSON.stringify(json_object));
    },
    //返回LocalStorage的JSON对象
    getLocalJSON: function (key)
    {
      var u = this.getLocal(key);

      if (u) {
        return JSON.parse(u);
      }

      return null;
    },
    removeLocalJSON: function (key)
    {
      if ($window.localStorage[key]) {
        delete $window.localStorage[key];
      }
    },
    clearLocal: function ()
    {
      $window.localStorage.clear();
    }
  };
});
