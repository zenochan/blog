- [highlight.js](https://highlightjs.org/)

js 生成  .d.ts 文件

```bash
$ npm install dtsmake
$ dtsmake -s ./path/to/sourcefile.js
```

[global.d.ts 模板](http://www.tslang.cn/docs/handbook/declaration-files/templates/global-d-ts.html)

```ts
// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ If this library is callable (e.g. can be invoked as myLib(3)),
 *~ include those call signatures here.
 *~ Otherwise, delete this section.
 */
declare function myLib(a: string): string;
declare function myLib(a: number): number;

/*~ If you want the name of this library to be a valid type name,
 *~ you can do so here.
 *~
 *~ For example, this allows us to write 'var x: myLib';
 *~ Be sure this actually makes sense! If it doesn't, just
 *~ delete this declaration and add types inside the namespace below.
 */
interface myLib {
    name: string;
    length: number;
    extras?: string[];
}

/*~ If your library has properties exposed on a global variable,
 *~ place them here.
 *~ You should also place types (interfaces and type alias) here.
 */
declare namespace myLib {
    //~ We can write 'myLib.timeout = 50;'
    let timeout: number;

    //~ We can access 'myLib.version', but not change it
    const version: string;

    //~ There's some class we can create via 'let c = new myLib.Cat(42)'
    //~ Or reference e.g. 'function f(c: myLib.Cat) { ... }
    class Cat {
        constructor(n: number);

        //~ We can read 'c.age' from a 'Cat' instance
        readonly age: number;

        //~ We can invoke 'c.purr()' from a 'Cat' instance
        purr(): void;
    }

    //~ We can declare a variable as
    //~   'var s: myLib.CatSettings = { weight: 5, name: "Maru" };'
    interface CatSettings {
        weight: number;
        name: string;
        tailLength?: number;
    }

    //~ We can write 'const v: myLib.VetID = 42;'
    //~  or 'const v: myLib.VetID = "bob";'
    type VetID = string | number;

    //~ We can invoke 'myLib.checkCat(c)' or 'myLib.checkCat(c, v);'
    function checkCat(c: Cat, s?: VetID);
}
```

### ts 中加载js

```typescript
load():Promise<any>{
	let Echart_URL = "//cdn.bootcss.com/echarts/3.3.1/echarts/min.js';
	let p = new Promise((resolve,reject)=>{
		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.setAttribut('src',EChart_URL);
		script.onload = resolve;
		script.async = true;
		document.head.appendChild(script);
	});
}
```


 js异步加载css

 ```js
 function loadCSS(url){
                var cssLink = document.createElement("link");
                cssLink.rel = "stylesheet";
                cssLink.rev = "stylesheet";
                cssLink.type = "text/css";
                cssLink.media = "screen";
                cssLink.href = url;
                document.getElementsByTagName("head").appendChild(cssLink);
}