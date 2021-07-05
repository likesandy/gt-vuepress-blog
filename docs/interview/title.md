---
title: 前端面试题
---

## HTMl

### 语义化

**含义**: 语义化的标签,旨在让标签有自己的含义

**作用**:

- 代码结构清晰,方便阅读,有利于团队合作开发
- 方便其他设备解析(比如屏幕阅读器/移动设备)以语义的方式来渲染网页
- 有利于 seo 优化

**常见标签**

- title
- h1-h6
- ul
- li
- header
- main
- footer
- nav

### H5 是什么?

广义上表示 HTML5,狭义上表示互动形式的多媒体广告页面

## CSS

### 盒子水平

## JavaScript

### 防抖与节流

**含义**: 防抖和节流都是优化高频率执行 js 代码的一种手段

**作用**: 减少代码执行次数,提高网页性能

**常见场景**: `oninput`/`onmousemove`/`onscroll`/`onresize` 等事件

#### 推荐文章

- [查看详情](https://mp.weixin.qq.com/s?__biz=Mzg5MDAzNzkwNA==&mid=2247483852&idx=1&sn=eb7312d1b12cd255b59c89614a26151a&chksm=cfe3f233f8947b25d8e1fd1591c96f9a7f3e0a81d8c544742d013e971ffe509f14a64163549c&scene=178&cur_album_id=1566035091556974596#rd)

#### 防抖

**示例**

```html
<input type="text" class="input" />
```

```js
const input = document.querySelector(".input");
let timer = null;
input.addEventListener("input", () => {
  // console.log('发送了网络请求');
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    console.log("发送了网络请求");
  }, 1000);
});
```

### 节流

函数防抖和函数节流的**区别**

- 函数防抖是让连续的高频操作时函数只执行**最后一次**

- 函数节流是**减少**连续高频操作时函数执行的次数

**示例**

```css
body {
  height: 2000px;
}
```

```js
let timer = null;
let flag = true;
window.addEventListener("scroll", () => {
  // console.log('scoll');
  if (!flag) {
    return;
  }
  flag = false;
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    console.log("scroll");
    flag = true;
  }, 1000);
});
```

### 闭包

**含义**: 闭包是一种特殊的函数,简单来说当一个内部函数引用了外部函数的变量或者函数时,那么内部的函数就是闭包,所以只要满足是函数嵌套,内部函数引用外部函数的数据的话那么就是一个闭包

**特点**: 只要闭包还在使用外部函数的数据,那么外部的数据就不会销毁,也就是说延长了外部函数的数据的生命周期

**作用**:

- 模块化开发,防止污染全局变量
- 可以实现封装,属性私有化

**注意点**: 当后续不再使用闭包的时候,一定要把闭包设置为 null,因为闭包会保留它们包含的函数作用域,所以比其他函数更占用内存,过度使用闭包可能导致内存过度占用,因此建议仅在十分必要时才使用闭包

```js
function test() {
  const name = "tao";
  return function() {
    console.log(name);
  };
}
let fn = test();
fn();
```

### 立即执行函数

**含义**: 声明一个匿名函数,并马上进行调用

**作用**: 立即执行函数会形成一个单独的作用域,我们可以封装一些局部变量,避免污染全局变量

**应用场景**: 你的代码在页面加载完成之后，不得不执行一些设置工作，比如时间处理器，创建对象等等。
