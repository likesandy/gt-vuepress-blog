## Mustache 语法(一)

- WXML 基本格式

  - `类似于HTML代码`：比如可以写成单标签，也可以写成双标签
  - `必须有严格的闭合`：没有闭合会导致编译错误
  - `大小写敏感`：class 和 Class 是不同的属性

- 开发中, 界面上展示的数据并不是写死的, 而是会根据服务器返回的数据,
  或者用户的操作来进行改变
  - 如果使用原生 JS 或者 jQuery 的话, 我们需要通过操作 DOM 来进行界
    面的更新
  - 小程序和 Vue/React 一样, 提供了插值语法: `Mustache语法(双大括号)`

**测试代码**

```css
/* wxml.wxss */
input {
  margin: 5px;
  border: 3px solid red;
}

.title {
  color: red;
}
```

```xml
<!-- wxml.wxml -->

<!-- 1.wxml的格式 -->
<!-- 只能使用内置的组件,不能使用类似html中的标签,比如div -->
<!-- 单标签必须要以/结尾,否则会报错 -->
<input type="text" />
<!-- 严格区分大小写 -->
<view class="title">Hello World</view>
<view Class='title'>Hello World</view>
```

**测试结果**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19ebd5b9fd6f4abf9b5cc041efddd0b2~tplv-k3u1fbpfcp-watermark.image)

## Mustache 语法(二)

- Mustache 语法不仅仅可以直接显示数据, 也可以使用表达式
- 并且可以绑定到属性

**测试代码**

```css
/* wxml.wxss */
.title {
  color: red;
}
```

```js
// wxml.js
data: {
  message: 'Hello World',
  firstName: 'nba',
  lastName: 'herden',
  age: 18,
  nowTime: new Date().toLocaleString(),
  isActive: false,
},
changeColor() {
  this.setData({
    isActive: !this.data.isActive
  })
},
```

```xml
<!-- wxml.wxml -->

<!-- 数据绑定(跟Vue一样) -->
<view>{{message}}</view>
<view>{{firstName}} {{lastName}}</view>
<view>{{firstName + ' ' + lastName}}</view>
<view>{{ age >= 18 ? '成年人' : '未成年人'}}</view>
<view>{{nowTime}}</view>
<view class="box {{isActive ? 'title' : ''}}">Hello World</view>
<button size="mini" bindtap="changeColor">切换颜色</button>
```

**测试效果**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41d39a5f8c2449d39f40ca91cbf5c9e2~tplv-k3u1fbpfcp-watermark.image)

## 逻辑判断

- 某些时候, 我们需要根据条件来决定一些内容是否渲染
  - 当条件为 true 时, view 组件会渲染出来
  - 当条件为 false 时, view 组件不会渲染出来
- 根据按钮点击, 决定是否渲染
- 也可以有多个条件

**测试代码**

```js
// wxml.js
data: {
  isShow: true,
  score: 50,
},
toggleCom() {
  this.setData({
    isShow: !this.data.isShow
  })
},
```

```xml
<!-- wxml.wxml -->

<!-- wx:if -->
<button size="mini" bindtap="toggleCom">切换组件</button>
<view wx:if="{{isShow}}">哈哈哈</view>
<!-- wx:elif/wx:else -->
<view wx:if="{{score >= 90}}">A</view>
<view wx:elif="{{score >= 60}}">B</view>
<view wx:else>C</view>
<button size="mini" bindtap="incremeent">分数+10</button>
```

**测试效果**

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cede50fd2e84cf3a84cf31575f31625~tplv-k3u1fbpfcp-watermark.image)

### hidden 属性

- hidden 是所有的组件都默认拥有的属性
- 当 hidden 属性为 true 时, 组件会被隐藏
- 当 hidden 属性为 false 时, 组件会显示出来
- **hidden 和 wx:if 的区别**
  - hidden 控制隐藏和显示是控制是否添加 hidden 属性
  - wx:if 是控制组件是否渲染的

**测试代码**

```js
// wxml.wxml
data: {
  isShow: false,
},
toggleCom() {
  this.setData({
    isShow: !this.data.isShow
  })
},
```

```xml
<!-- wxml.wxml -->

<!-- hidden属性 -->
<!-- wx:if会把元素直接干掉 -->
<!-- hidden只是将元素隐藏掉,但是依旧存在在DOM中 -->
<!-- 应用场景:显示和隐藏频繁使用hidden,不频繁使用wx:if -->
<!-- 跟vue中的v-show和v-if差不多是一个原理 -->
<button bindtap="toggleCom" size="mini">按钮</button>
<view hidden="{{isShow}}">哈哈哈</view>
```

**测试效果**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23d0862a729b4045887dfe7dc6c7aee8~tplv-k3u1fbpfcp-watermark.image)

## 列表渲染

- 为什么使用 wx:for

  - 我们知道，在实际开发中，服务器经常返回各种列表数据，我们不可能一一从列表中取出数据进行展示；
  - 需要通过 for 循环的方式，遍历所有的数据，一次性进行展示

- 在组件中，我们可以使用 wx:for 来遍历一个数组 （字符串 - 数字）
  - 默认情况下，遍历后在 wxml 中可以使用一个变量 index，保存的是当前遍历数据的下标值
  - 数组中对应某项的数据，使用变量名 item 获取

### block 标签

- 什么是 block 标签？

  - 某些情况下，我们需要使用 wx:if 或 wx:for 时，可能需要`包裹一组组件标签`
  - 我们希望对这一组组件标签`进行整体的操作`，这个时候怎么办呢？

- 方式一：使用一个 view 组件包裹
- 方式二：使用 block 标签

- block 标签的意义
  - <block/> `并不是一个组件`，它仅仅是一个`包装元素`，不会在页面中做任何渲染，只接受控制属性
  - 使用 block 有两个好处
    - 将需要进行遍历或者判断的内容进行包裹
    - 将遍历和判断的属性放在 block 便签中，不影响普通属性的阅读，提高代码的`可读性`

### item/index 名称

- 默认情况下，item – index 的名字是固定的
  - 但是某些情况下，我们可能想`使用其他名称`
  - 或者当出现`多层遍历时，名字会重复`
- 这个时候，我们可以指定 item 和 index 的名称

### key 作用

- 我们看到，使用 wx:for 时，会报一个警告

  - 这个提示告诉我们，可以添加一个 key 来`提高性能`

- `为什么需要这个 key 属性呢（了解）`

  - 这个其实和小程序内部也使用了虚拟 DOM 有关系（和 Vue、React 很相似）

- 当某一层有很多相同的节点时，也就是列表节点时，我们希望`插入一个新的节点`
  - 我们希望可以在 B 和 C 之间加一个 F，Diff 算法默认执行起来是这样的
  - 即把 C 更新成 F，D 更新成 C，E 更新成 D，最后再插入 E，是不是很没有效率
- 所以我们需要使用 key 来给每个节点`做一个唯一标识`
  - Diff 算法就可以正确的识别此节点
  - 找到正确的位置区插入新的节点
- 所以一句话，`key 的作用主要是为了高效的更新虚拟 DOM`

**测试代码**

```js
// wxml.js
data: {
  isShow: false,
  nums: [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15]
  ]
},
```

```xml
<!-- wxml.wxml -->

<!-- 遍历数组/字符串/数字 -->
<view wx:for="{{['abc','cba','nba']}}" wx:key='*this'>{{index}}.{{item}}</view>
<view wx:for="abc" wx:key='*this'>{{index}}.{{item}}</view>
<view wx:for="{{4}}" wx:key='*this'>{{index}}.{{item}}</view>
<!-- 使用 wx:for-item 可以指定数组当前元素的变量名， -->
<!-- 使用 wx:for-index 可以指定数组当前下标的变量名： -->
<view wx:for="{{['大话西游','唐伯虎点秋香','功夫','国产凌凌漆']}}" wx:for-item='movies' wx:for-index='i' wx:key='*this'>
  {{i+1}}.{{movies}}</view>
<!-- 应用场景:多层遍历 -->
<!-- 两个item就显得很奇怪,为了起到见名思意的作用就可以自定义名称和下标 -->
<block wx:for="{{nums}}" wx:for-item='innerNums' wx:key='*this'>
  <block wx:for="{{innerNums}}" wx:key='*this'>
    <view>{{item}}</view>
  </block>
</block>
```

**测试效果**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/730873f30bdc487e988673a12bbfc194~tplv-k3u1fbpfcp-watermark.image)

## 模板用法

- WXML 提供**模板（template）**，可以在模板中定义代码片段，在不同的地方调用。(是一种 wxml 代码的复用机制)
  - 使用 `name 属性`，作为模板的名字, 然后在 template 内定义代码片段

**测试代码**

```xml
<!-- wxml.wxml -->

<!-- 之前小程序不支持自定义组件,为了进行代码的复用,就可以使用template -->
<!-- 模板中包裹的内容,在没有被使用前,是不会进行任何渲染的 -->
<!-- 给模板定义一个name,然后使用的时候通过is来调用对应的contenItem -->
<template name='contenItem'>
  <button size="mini">按钮</button>
  <view>哈哈哈</view>
</template>
<template is='contenItem' />

<!-- 如果模板中有模板语法,就需要在调用的时候通过data,key:value的形式传入对应的值 -->
<template name="contenItem2">
  <button size="mini">{{btnText}}</button>
  <view>{{Text}}</view>
</template>

<template is='contenItem2' data="{{btnText:'按钮',Text:'哈哈哈'}}" />
<template is='contenItem2' data="{{btnText:'提示',Text:'嘿嘿嘿'}}" />
<template is='contenItem2' data="{{btnText:'警告',Text:'呵呵呵'}}" />
```

**测试效果**

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67bd7c89e3a24b2390a53704edf57d62~tplv-k3u1fbpfcp-watermark.image)

## wxml 的引入

### import

- Import 引入：import 可以在该文件中使用目标文件定义的 template
- 注意：wxml 中不能递归引入（也就是 A 引入了 B 的 template，不会引入 B 中引入 C 的 template）

**测试代码**

```xml
<!-- template.wxml -->
<import src='/wxml/abc.wxml'/>
<template name="contenItem">
  <button size="mini">{{btnText}}</button>
  <view>{{Text}}</view>
</template>
```

```xml
<!-- abc.wxml -->
<template name='abc'>
  <view>我是abc</view>
</template>
```

```xml
<!-- wxml.wxml -->
<import src="/wxml/template.wxml" />
<template is='contenItem' data="{{btnText:'按钮',Text:'哈哈哈'}}" />
<template is='contenItem' data="{{btnText:'提示',Text:'嘿嘿嘿'}}" />
<template is='contenItem' data="{{btnText:'警告',Text:'呵呵呵'}}" />
<template is='abc' />
```

**测试效果**

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7dd81cf4ea340348e07b20fe7cd1a15~tplv-k3u1fbpfcp-watermark.image)

### include

- include 可以将目标文件中除了 template ,wxs 外的整个代码引入，相当于是拷贝到 include 位置

**测试代码**

```xml
<!-- footer.wxml -->
<view>footer内容</view>
```

```xml
<!-- header.wxml -->
<include src='./footer.wxml'/>
<view>header内容</view>
```

```xml
<!-- wxml.wxml -->
<include  src='/wxml/header.wxml'/>
```

**测试结果**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9f2885695b24bffb941c619c80955f5~tplv-k3u1fbpfcp-watermark.image)

::: details 总结

```js
import导入
  1.主要是导入template
  2.不能就那些递归导入
include导入
  1.将公共的wxml中的组件抽取到一个文件中
  2.不能导入template/wxs,可以进行递归导入
```

:::

:books: [官方文档](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/)
