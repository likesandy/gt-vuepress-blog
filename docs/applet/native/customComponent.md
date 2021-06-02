---
autoGroup-7: 自定义组件
title: 组件化开发
---

## 什么是组件化？

- 人面对复杂问题的处理方式：

  - 任何一个人处理信息的逻辑能力都是有限的
  - 所以，当面对一个非常复杂的问题时，我们不太可能一次性搞定一大
    堆的内容。
  - 但是，我们人有一种天生的能力，就是将问题进行拆解。
  - 如果将一个复杂的问题，拆分成很多个可以处理的小问题，再将其放
    在整体当中，你会发现大的问题也会迎刃而解。

- 组件化也是类似的思想：
  - 如果我们将一个页面中所有的处理逻辑全部放在一起，处理起来
    就会变得非常复杂，而且不利于后续的管理以及扩展。
  - 但如果，我们讲一个页面拆分成一个个小的功能块，每个功能块
    完成属于自己这部分独立的功能，那么之后整个页面的管理和维
    护就变得非常容易了。

![](/applet/native/25.png)

:::tip
现在前端基本都是组件化开发,像 Vue,React 里讲的组件化开发都是一样的
:::

## 小程序组件化思想

- 小程序在**刚刚推出**时是不支持组件化的, 也是为人诟病的一个点.

  - 但是从 **v1.6.3** 开始, 小程序开始支持自定义组件开发, 也让我们更加方便的在程序中使用组件化.

![](/applet/native/26.png)

- 组件化思想的应用：
  - 有了组件化的思想，我们在之后的开发中就要充分的利用它。
  - 尽可能的将页面拆分成一个个小的、`可复用`的组件。
  - 这样让我们的代码更加`方便组织和管理`，并且`扩展性也更强`。
- 所以，组件是目前小程序开发中，非常重要的一个篇章，要认真学习。

```xml
<!--components/my-cpn/my-cpn.wxml-->
<view class="title">我是自定义组件</view>
```

```css
/* components/my-cpn/my-cpn.wxss */
.title {
  font-size: 30rpx;
  color: red;
}
```

```json
// my-cpn.json

// 创建的时候会自动添加上开启自定义组件选项
{
  // 开启自定义组件选项
  "component": true,
  "usingComponents": {}
}
```

自定义组件就创建好了,接下来我们就在 home 界面中使用一下自定义组件

使用组件首先需要**先注册组件**

```json
// home.json
{
  // 注册组件
  "usingComponents": {
    // "key":"value"
    "自定义组建的标签名":"自定义组件的路径(相对/绝对)"
    "my-cpn":"/components/my-cpn/my-cpn"
  }
}
```

```xml
<!--  pages/home/home.wxml -->

<!-- 使用自定义组件 -->
<my-cpn/>
<my-cpn/>
<my-cpn/>
```

![](/applet/native/27.png)

## 使用自定义组件和细节注意事项

- 一些需要注意的细节：
  - 因为 WXML 节点标签名只能是 小写字母、中划线和下划线(我试了一下数字也可以) 的组合，所以自定义组件的标签名也只能包含这些
    字符。
  - 自定义组件也是可以引用自定义组件的，引用方法类似于页面引用自定义组件的方式（使用
    usingComponents 字段）。
  - 自定义组件和页面所在项目根目录名 不能以“wx-”为前缀，否则会报错。
  - 如果在 app.json 的 usingComponents 声明某个组件，那么所有页面和组件可以直接使用该组件。

下面先来试一下自定义组件中使用其他自定义组件

```xml
<!--components/cpn1/cpn1.wxml-->
<view class="title">我是cpn1</view>
```

```css
/* components/cpn1/cpn1.wxss */
.title {
  background: blue;
}
```

要在 my-cpn 组件中使用 cpn1 组件

```json
// my-cpn.json
{
  "component": true,
  "usingComponents": {
    "cpn1": "/components/cpn1/cpn1"
  }
}
```

```xml
<!--components/my-cpn/my-cpn.wxml-->
<view class="title">我是自定义组件</view>
<cpn1/>
```

```css
/* components/my-cpn/my-cpn.wxss */
.title {
  font-size: 30rpx;
  color: red;
}
```

最后在 home 中使用 my-cpn 组件

```json
// home.json
{
  "usingComponents": {
    "my-cpn": "/components/my-cpn/my-cpn"
  }
}
```

```xml
<my-cpn/>
<my-cpn/>
<my-cpn/>
```

![](/applet/native/28.png)

如果一个组件想要在多个页面被使用,一个一个注册就很麻烦,这个时候就可以在 app.json 里面全局注册

```json
// home.json
{
  "usingComponents": {}
}
```

```json
// app.json
{
  "usingComponents": {
    "my-cpn": "/components/my-cpn/my-cpn"
  }
}
```

```xml
<!--  pages/home/home.wxml -->
<my-cpn/>
<my-cpn/>
<my-cpn/>
```

![](/applet/native/28.png)

## 组件的样式细节

- 课题一：组件内的样式 对 外部样式 的影响
  - 结论一：组件内的 class 样式，只对组件 wxml 内的节点生效, 对于引用组件的 Page 页面不生效。
  - 结论二：组件内不能使用 id 选择器、属性选择器、标签选择器
- 课题二：外部样式 对 组件内样式 的影响
  - 结论一：外部使用 class 的样式，只对外部 wxml 的 class 生效，对组件内是不生效的
  - 结论二：外部使用了 id 选择器、属性选择器不会对组件内产生影响
  - 结论三：外部使用了标签选择器，会对组件内产生影响
- 整体结论:
  - 组件内的 class 样式和组件外的 class 样式, 默认是有一个隔离效果的；
  - 为了防止样式的错乱，官方不推荐使用 id、属性、标签选择器；

```xml
<!--components/my-style/my-style.wxml-->
<view class="title">我是标题</view>
```

```css
/* components/my-style/my-style.wxss */
.title {
  font-weight: 600;
  color: red;
}
```

```json
// home.json
{
  "usingComponents": {
    "my-style": "/components/my-style/my-style"
  }
}
```

```xml
<!--  pages/home/home.wxml -->
<view class="title">Hello World</view>
<my-style/>
```

```css
/* pages/home/home.wxss */
.title {
  font-size: 50rpx;
  color: blue;
}
```

![](/applet/native/29.png)

## 样式的相互影响

- 课题三：如何让 class 可以相互影响
- 在 Component 对象中，可以传入一个 options 属性，其中 options 属性中有一个 styleIsolation（隔离）属性。
  styleIsolation 有三个取值：
  - isolated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（默认取值）；
  - apply-shared 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
  - shared 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置
    了

```js
// components/my-style/my-style.js
options: {
  // 默认
  // styleIsolation: 'isolated'
  styleIsolation: "apply-shared",
  // styleIsolation: "shared",
  },
```

![](/applet/native/30.png)

```js
// components/my-style/my-style.js
options: {
  // 默认
  // styleIsolation: 'isolated'
  // styleIsolation: "apply-shared",
  styleIsolation: "shared",
  },
```

![](/applet/native/31.png)

## 组件和页面通信

- 很多情况下，组件内展示的内容（数据、样式、标签），并不是在组件内写死的，而且可以由使用者来决定

![](/applet/native/32.png)

### 向组件传递数据 - properties

- 给组件传递数据(父组件传子组件)：
  - 大部分情况下，组件只负责布局和样式，内容是由使用组件的对象决定的。
  - 所以，我们经常需要从外部传递数据给我们的组件，让我们的组件来进行展示。如何传递呢？
  - 使用 `properties` 属性：
- 支持的类型：
  - String、Number、Boolean
  - Object、Array、null（不限制类型）

### 向组件传递样式 - externalClasses

- 给组件传递样式：
  - 有时候，我们不希望将样式在组件内固定不变，而是外部可以决定样式。
  - 这个时候，我们可以使用 externalClasses 属性：
    - 在 Component 对象中，定义 externalClasses 属性
    - 在组件内的 wxml 中使用 externalClasses 属性中的 class
    - 在页面中传入对应的 class，并且给这个 class 设置样式

```xml
<!--components/my-prop/my-prop.wxml-->
<view class="my-class">{{title}}</view>
```

```js
// components/my-prop/my-prop.js
properties: {
  // title:String
  title: {
    type: String,
    value: '我是默认的标题',
    observer(newValue, oldValue) {
      console.log(oldValue, newValue)
    },
  },
},
externalClasses: ['my-class'],
```

```json
// home.json
{
  "usingComponents": {
    "my-prop": "/components/my-prop/my-prop"
  }
}
```

```xml
<!--  pages/home/home.wxml -->
<view class="title">Hello World</view>
<my-prop title='哈哈哈' my-class='red' />
<my-prop title='呵呵呵' my-class='blue' />
<my-prop titleClass='pink' />
```

```css
/* pages/home/home.wxss */
.title {
  font-size: 50rpx;
  color: blue;
}

.red {
  color: red;
}

.blue {
  color: blue;
}

.pink {
  color: pink;
}
```

![](/applet/native/34.png)

![](/applet/native/33.png)

### 组件向外传递事件 – 自定义事件

- 有时候是自定义组件内部发生了事件，需要告知使用者，这个时候可以使用自定义事件

```xml
<!--components/my-event/my-event.wxml-->
<button size="mini" bindtap="increment">+1</button>
```

```js
// components/my-event/my-event.js
increment() {
  // console.log('+1')
  this.triggerEvent('increment', { name: 'codertao', age: 19 })
}
```

```json
// home.json
{
  "usingComponents": {
    "my-event": "/components/my-event/my-event"
  }
}
```

```xml
<!--  pages/home/home.wxml -->
<view>当前计数:{{count}}</view>
<my-event bind:increment="increment" />
```

```js
// pages/home/home.js
data: {
  count: 0
},
increment(event) {
  // console.log('+1')
  this.setData({
    count: this.data.count + 1
  })
  console.log(event.detail)
},
```

![](/applet/native/36.png)

![](/applet/native/35.png)

## 自定义组件练习

我们做一个导航栏最常见的一个小功能

![](/applet/native/37.png)

```xml
<!--components/t-tab/t-tab.wxml-->
<view class="container">
  <block wx:for="{{titles}}" wx:key="*this">
    <view class='item {{currentIndex == index ? "active": ""}}' bindtap="itemClick" data-index="{{index}}">
      <text>{{item}}</text>
    </view>
  </block>
</view>
```

```css
/* components/t-tab/t-tab.wxss */
.container {
  display: flex;
  height: 88rpx;
  line-height: 88rpx;
}

.item {
  flex: 1;
  text-align: center;
}

.active {
  color: red;
}

.active text {
  padding: 10rpx 0;
  border-bottom: 5rpx solid red;
}
```

```js
// components/t-tab/t-tab.js
properties: {
  titles: {
    type: Array,
    value: []
  }
},
data: {
  currentIndex: 0
},
methods: {
  itemClick(event) {
  // console.log('+++')
  const index = event.currentTarget.dataset.index
  const title = this.properties.titles[index]
  this.setData({
    currentIndex: index
  })
  this.triggerEvent('tab-item-click', { title })
}
},
```

```json
// home.json
{
  "usingComponents": {
    "t-tab": "/components/t-tab/t-tab"
  }
}
```

```xml
<!--  pages/home/home.wxml -->
<t-tab titles="{{['流行','新款','精选']}}" bind:tab-item-click="tabItemClick" />
```

```js
// pages/home/home.js
tabItemClick(event) {
  console.log(event.detail.title)
},
```

![](/applet/native/38.png)

## 页面直接调用组件方法

```xml
<!--components/my-sel/my-sel.wxml-->
<view>当前计数:{{count}}</view>
```

```js
// components/my-sel/my-sel.js
data: {
  count: 0
},
```

```json
// home.json
{
  "usingComponents": {
    "my-sel": "/components/my-sel/my-sel"
  }
}
```

```xml
<!--pages/home/home.wxml-->
<my-sel id="selId" class="selClass"/>
<button size="mini" bindtap="increment">+1</button>
```

```js
increment() {
  // console.log('------')
  // 获取sel组件对象
  // 调用时需要传入一个匹配选择器(class或者id或者其他)(推荐用id,class在写样式的时候容易出现重复,而id是唯一的)
  // const mySel = this.selectComponent('.selClass')
  const mySel = this.selectComponent('#selId')
  const selCount = mySel.data.count
  // console.log(mySel)

  // 调用sel组件的setData修改组件count的值
  mySel.setData({
    count: selCount + 1
  })
},
```

![](/applet/native/39.png)
