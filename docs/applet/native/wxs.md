---
title: wxs
autoGroup-5: WXSS&WXML&WXS
autoPrev: wxss
---

## 邂逅 wxs

- **WXS**（WeiXin Script）是小程序的一套脚本语言，结合 **WXML**，可以构建出页面的结构
  - 官方：WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致。（不过`基本一致`）
- **为什么**要设计 WXS 语言呢？
  - 在 WXML 中是不能直接调用 Page/Component 中定义的函数的
  - 但是某些情况, 我们可以希望使用函数来处理 WXML 中的数据(可以看做类似于 Vue 的`计算属性`)，这个时候就使用 WXS 了
- WXS 使用的**限制**和**特点**
  - WXS 的运行环境和其他 JavaScript 代码是隔离的，WXS 中不能调用其他 JavaScript 文件中定义的函数，也
    不能调用小程序提供的 API
  - WXS 函数不能作为组件的事件回调
  - 由于运行环境的差异，在 iOS 设备上小程序内的 WXS 会比 JavaScript 代码快 `2 ~ 20` 倍。在 android 设备
    上二者运行效率无差异

```xml
<!-- wxs.wxml -->

<!-- 过滤数字 -->
<!-- <view>{{12.345.toFixed(2)}}</view> -->
<view>{{numberFixed(12.345)}}</view>
```

```js
// wxs.js
numberFixed(number) {
  return number.toFixed(2);
}
```

![](/applet/native/21.png)

虽然没有报错,但是界面没有任何效果

## wxs 的写法

### 方式一

在 wxml 中编写 xws 代码

```xml
<!-- wxs.wxml -->

<wxs module="info">
  // js代码
  var name = "codertao";
  var age = 19;
  module.exports = {
    name:name,
    age:age
  }
</wxs>

<view>{{info.name}}</view>
<view>{{info.age}}</view>
```

![](/applet/native/22.png)

::: warning
wxs 不支持 es6 语法
:::

### 方式二

在 xms 文件中编写 xms 代码

```xml
<!-- wxs.wxml -->
<wxs src="./info.wxs" module="info" />
<view>{{info.name}}</view>
<view>{{info.age}}</view>
```

```js
// info.js
var name = "codertao";
var age = 19;
module.exports = {
  name: name,
  age: age,
};
```

![](/applet/native/23.png)

::: tip
开发中推荐第二种做法
:::

## 案例练习

```xml
<!-- wxs.wxml -->
<wxs src="./format.wxs" module="format" />
<view>{{format.priceFormat(12.3456)}}</view>
<view>{{format.priceFormat(12.3456,3)}}</view>
```

```js
// format.wxs

// 价格格式化
function priceFormat(price, number) {
  var number = number || 2;
  return price.toFixed(number);
}

module.exports = {
  priceFormat: priceFormat,
};
```

![](/applet/native/24.png)

:books: [官方文档](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/)
