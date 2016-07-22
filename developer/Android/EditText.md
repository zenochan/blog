# EditText

####  修改Android EditText光标颜色
EditText有一个属性：android:textCursorDrawable，这个属性是用来控制光标颜色的

android:textCursorDrawable="@null"，"@null"作用是让光标颜色和text color一样

#### 取消edittext进入就获得焦点
在EditText的父级控件中找一个，设置成

```xml
android:focusable="true"
android:focusableInTouchMode="true" 
```
#### 把光标放在EditText中文本的末尾处

```java
Editable etext = mSubjectTextEditor.getText();
Selection.setSelection(etext, etext.length());
EditText et = (EditText)findViewById(R.id.inbox);
et.setSelection(et.getText().length());
```
#### 只允许输入数字

```java
dataText.setKeyListener(DigitsKeyListener.getInstance("0123456789"));
```