# @property

### 属性特性

|特性|功能|
|---|---|
|getter=\<name>,setter=\<name>|指定该属性所使用的存取器函数名称
|readwrite or readonly|指定该属性是否可写。default：readwrite|
|assign、retain or copy|决定为该属性生成的赋值函数的类型。assign：简单变量赋值。retain：在赋值到变量时会保留传入的参数。copy：复制传入值到成员变量。default：assign|
|nonatomic|指定生成的存取器函数是非原子性的，即非线程安全的。default：原子性的（线程安全的）|

- @synthesize: 使编译器生成为属性创建存取器函数的所有代码
- @dynamic: 编译器指望你为属性创建一对合适的存取器函数

	> 使用@dynamic指令创建存取器函数时，应该确保存取器函数旅行了在属性的特性中指定的约定。
	> 换句话说，如果指定的是 copy 属性，就必须确保存取器函数在设置属性时，履行复制传入的值。

#### 使用 nonatomic

```objective-c
//原子性存取器函数
- (NSString) *firstName
{
	[threadLock lock];
	NSString *result = [[firstName retain] autorelease];
	[threadLock unlock];
	retrun result;
}

//非原子性存取器函数
//略微提高性能
- (NSString) *firstName
{
	return [[firstName retain] autorelease];
}
```

#### 使用 assign、retain 和 copy 特性


> retain是指针拷贝，copy是内容拷贝。在拷贝之前，都会释放旧的对象。

- assign：简单赋值，不更改索引计数（Reference Counting）。
- copy：建立一个索引计数为1的对象，然后释放旧对象
- retain：释放旧的对象，将旧对象的值赋予输入对象，再提高输入对象的输入对象的索引计数为1

使用

- 使用assign：对基础数据类型（NSInteger）和C数据类型（int ,float,double,char等）
- 使用copy：对NSString
- 使用retain：对其他NSObject和其子类。