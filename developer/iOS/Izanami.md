[伊邪那美](http://baike.baidu.com/link?url=VgsH25pd_b3fZS8BsUNxKPiYsVymhCnYlymaCF3kxcfrz_1T5wOOGC4xsq2vywI9zhoBcu7ZC1Lv2kSrD2ZNfbi5mTgttrR1syaIMkTj9yi)

> 伊邪那美可以在目光不必对视的情况下让对方中招，一旦中招就会陷入无限的循环之中，此忍术无法被破解，只有中招者承认施术者的目的时，伊邪那美会自动解除，因此中招者的心智会发生改变。  
> \#不学点OC你都不知道为什么是死循环#

ps: 有人说 `Objective C` 里的 `slef` 相当于 `JAVA` 里的 `this` ~~~   
看看下面代码的执行结果~~~

![](./Izanami.gif)

```objectivec
// main.m
#import <Foundation/Foundation.h>
#import "Izanami.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        NSLog(@"Hello, World!");
        Izanami *izanami = [[Izanami alloc] init];
        izanami.izanami = 9;
        int i = izanami.izanami;
    }

    return 0;
}
```

```objectivec
// Izanami.h
#import <Foundation/Foundation.h>

@interface Izanami : NSObject {
    int izanami;
}

- (int)izanami;

- (void)setIzanami:(int)izanami;
@end
```

```objectivec
// Izanami.m
#import "Izanami.h"

@implementation Izanami {

}
- (int)izanami {
    NSLog(@"%@", @"Hello,old friend~");
    return self.izanami;
}

- (void)setIzanami:(int)izanami {
    NSLog(@"%@", @"Hello,new friend~");
    self.izanami = izanami;
}

@end
```