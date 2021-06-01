---
autoGroup-6: 事件处理
title: 事件系统
---

## 事件的介绍

- 什么时候会产生事件呢？

  - 小程序需要经常和用户进行某种`交互`，比如点击界面上的某个按钮或者区域，比如滑动了某个区域;
  - 这些交互都会产生各种各样的`事件`;

- 事件时如何处理呢？
  - 事件是通过 bind/catch 这个属性绑定在组件上的（和普通的属性写法很相似, 以 key=“value”形式）；
  - key 以 bind 或 catch 开发, 从 1.5.0 版本开始, 可以在 bind 和 catch 后加上一个冒号；
  - 同时在当前页面的 Page 构造器中定义对应的事件处理函数 tapName, 如果没有对应的函数, 触发事件时会报错
  - 当用户点击该 button 区域时，达到触发条件生成事件 tap，该事件处理函数 tapName 会被执行，同时还会收到一个事件对象 event。

## 常见事件类型

- **某些组件**会有自己特性的**事件类型**，大家可以在使用组件时具体查看对应的文档

  - 比如 input 有 bindinput/bindblur/bindfocus 等
  - 比如 scroll-view 有 bindscrolltowpper/bindscrolltolower 等

- 这里我们讨论几个组件都有的, 并且也比较常见的事件类型：

![](/applet/native/5.png)

```xml
<!--  pages/home/home.wxml -->
<view class="box"
      bindtouchstart="handleTouchStart"
      bindtouchmove="handleTouchMove"
      bindtouchend="handleTouchEnd"
      bindtouchcancel="handleTouchCancel"
      bindtap="handleTap"
      bindlongpress="handleLongPress"
      bindlongtap="handleLongTap"
></view>
```

```css
/* pages/home/home.wxss */
.box {
  width: 200px;
  height: 200px;
  background: red;
}
```

```js
// pages/home/home.js
handleTouchStart() {
  console.log('handleTouchStart')
},
handleTouchMove() {
  console.log('handleTouchMove')
},
handleTouchCancel() {
  console.log('handleTouchCancel')
},
handleTouchEnd() {
  console.log('handleTouchEnd')
},
handleTap() {
  console.log('handleTap')
},
handleLongPress() {
  console.log('handleLongPress')
},
handleLongTap() {
  console.log('handleLongTap')
},
```

**注意点**

- Touchcancle: 在某些特定场景下才会触发（比如来电打断等）
- tap 事件和 longpress 事件通常只会触发其中一个

## 事件对象介绍

- 当某个事件触发时, 会产生一个事件对象, 并且这个对象被传入到回调函数中, 事件对象有哪些常见的属性呢?
- 一般情况下 touches = changedTouches 的,target = currentTarget 的
- 后面会介绍两者之间的区别

## touches 和 changedTouches 的区别

### 在 touchend 中不同

```xml
<!--  pages/home/home.wxml -->
<button bindtouchstart="handleTouchStart">touchastart</button>
<button bindtouchend="handleTouchEnd">touchend</button>
```

```js
// pages/home/home.js
handleTouchStart(event) {
  console.log(event)
},
handleTouchEnd(event) {
  console.log(event)
},
```

- touches 表示当前屏幕上**所有触摸点**的列表
- changedTouches 表示触发事件后**改变的触摸点**的列表

touchend 表示手指触摸动作结束,当我点击按钮完会就会触发 touchend,表明当前屏幕就没有触摸点了,所以这个时候 touches != changedTouches

### 多手指触摸时不同

因为是模拟器,所以多手指就不容易演示,这里**讲一下大概的逻辑**

假如我们第一根手指点击了按钮,那么当前的 touches = changedTouches,但是接下来我又用两根手指点击了按钮,那么当前的 touches 就是 123 了,但是 changedTouches 是 23

## currentTarget 和 target 的区别

```xml
<!--  pages/home/home.wxml -->
<view class="father" bindtap="fatherBtn" id="father">
  father
  <view class="son" bindtap="sonBtn" id="son">
    son</view>
</view>
```

```css
/* pages/home/home.wxss */
.father {
  width: 300rpx;
  height: 300rpx;
  background: red;
  color: #fff;
}

.son {
  width: 100rpx;
  height: 100rpx;
  background: blue;
  color: #fff;
}
```

```js
// pages/home/home.js
fatherBtn(event) {
  console.log('fatherBtn', event)
},
sonBtn(event) {
  console.log('sonBtn', event)
},
```

![](/applet/native/3.png)

![](/applet/native/4.png)

点击的是 son 的区域,图一 sonBtn 的打印结果 target = currentTarget,但是因为事件会冒泡,冒泡到了 fatherBtn,fatherBtn 的打印结果是 target != currentTarget,这就说明了

- target 表示**产生事件**的对象
- currentTarget 表示**触发事件**的对象

## 事件参数的传递

- 当视图层发生事件时，某些情况需要事件**携带一些参数到执行的函数**中, 这个时候就可以通过**data-属性**来完成：
  - 格式：`data-属性`的名称(属性名称可以自定义)
  - 获取：`e.currentTarget.dataset.属性`的名称

```xml
<!--  pages/home/home.wxml -->
<view class="container">
  <block wx:for="{{movies}}" wx:key='*this'>
    <view class="item"
          bindtap="itemClick"
          data-index="{{index}}"
          data-item="{{item}}">{{item}}</view>
  </block>
</view>
```

```css
/* pages/home/home.wxss */
.container {
  display: flex;
}

.item {
  flex: 1;
  text-align: center;
}
```

```js
// pages/home/home.js
data: {
  movies: ['大话西游', '唐伯虎点秋香', '功夫'],
},
itemClick(event) {
  console.log(event)
  const dataset = event.currentTarget.dataset
  const item = dataset.item
  const index = dataset.index
  console.log(index)
  console.log(item)
},
```

![](/applet/native/1.png)

## 事件冒泡和事件捕获

- 当界面产生一个事件时，事件分为了**捕获阶段**和**冒泡阶段**。

```xml
<!--  pages/home/home.wxml -->
<view class="grandpa" capture-bind:tap='grandpaCaptue' bindtap="grandpaTap">
  爷爷
  <view class="father" capture-bind:tap='fatherCaptue' bindtap="fatherTap">
    爸爸
    <view class="son" capture-bind:tap='sonCaptue' bindtap="sonTap">
      儿子
    </view>
  </view>
</view>
```

```css
/* pages/home/home.wxss */
.son {
  width: 100rpx;
  height: 100rpx;
  background: red;
  color: #fff;
}

.father {
  width: 200rpx;
  height: 200rpx;
  background: blue;
  color: #fff;
}

.grandpa {
  width: 400rpx;
  height: 400rpx;
  background: pink;
  color: #fff;
}
```

```js
// pages/home/home.js
grandpaCaptue() {
  console.log('grandpaCaptue')
},
fatherCaptue() {
  console.log('fatherCaptue')
},
sonCaptue() {
  console.log('sonCaptue')
},
grandpaTap() {
  console.log('grandpaTap')
},
fatherTap() {
  console.log('fatherTap')
},
sonTap() {
  console.log('sonTap')
},
```

事件会先捕获然后冒泡

![](/applet/native/2.png)

下面来做几道题来理解一下 bind 和 catch 的区别

- catch 和 bind 的区别
  - bind:一层层传递
  - catch:阻止事件的进一步传递

```xml
<view class="grandpa" capture-catch:tap='grandpaCaptue' bindtap="grandpaTap">
  爷爷
  <view class="father" capture-bind:tap='fatherCaptue' bindtap="fatherTap">
    爸爸
    <view class="son" capture-bind:tap='sonCaptue' bindtap="sonTap">
      儿子
    </view>
  </view>
</view>
```

::: details 点击查看结果

```css
grandpaCaptue
```

:::

```xml
<view class="grandpa" capture-bind:tap='grandpaCaptue' bindtap="grandpaTap">
  爷爷
  <view class="father" capture-bind:tap='fatherCaptue' bindtap="fatherTap">
    爸爸
    <view class="son" capture-catch:tap='sonCaptue' bindtap="sonTap">
      儿子
    </view>
  </view>
</view>
```

::: details 点击查看结果

```css
grandpaCaptue
fatherCaptue
sonCaptue
```

:::

```xml
<view class="grandpa" capture-bind:tap='grandpaCaptue' bindtap="grandpaTap">
  爷爷
  <view class="father" capture-bind:tap='fatherCaptue' catchtap="fatherTap">
    爸爸
    <view class="son" capture-bind:tap='sonCaptue' bindtap="sonTap">
      儿子
    </view>
  </view>
</view>
```

::: details 点击查看结果

```css
grandpaCaptue
fatherCaptue
sonCaptue
sonTap
fatherTap
```

:::

:books: [官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)
