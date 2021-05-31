## 页面样式写法

- 页面样式的**三种写法**

  - 行内样式、页面样式、全局样式
  - 三种样式都可以作用于页面的组件

- 如果有**相同的样式**
  - 优先级依次是：行内样式 > 页面样式 > 全局样式

**测试代码**

```css
/* app.wxss */
.container {
  color: pink;
  font-size: 50px;
}
```

```css
/* wxss.wxss */
.box {
  color: blue;
  font-size: 50px;
}
```

```xml
<!-- wxss.xml -->

<!-- 行内(内联)样式 -->
<view style="color:red;font-size:50px">哈哈哈</view>
<!-- 页内样式 -->
<view class="box">哈哈哈</view>
<!-- 全局样式 -->
<view class="container">哈哈哈</view>
<!-- 三种样式作用于同一个组件 -->
<view class="box container" style="color:red">哈哈哈</view>
```

**测试结果**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71f93f4939704e31b25fde37ea0b5a8a~tplv-k3u1fbpfcp-watermark.image)

## 支持的选择器

wxss 和 css 基本是一致的,所以选择器的内容和 css 都是**差不多**的

作为一个前端工程师,css 我这里应该可以不必过多赘述了吧,忘了的看我前面 css 的博客文章来复习一下

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb4ffda7ded444f0b83ca71fce270e2a~tplv-k3u1fbpfcp-watermark.image)

## wxss 的扩展 – 尺寸单位

- 尺寸单位

  - rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为 750rpx。
  - 如在 iPhone6 上，屏幕宽度为 375px，共有 750 个物理像素，则 750rpx = 375px = 750 物理像素，1rpx =
    0.5px = 1 物理像素

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29a615796699466885b6630fc6ce56cc~tplv-k3u1fbpfcp-watermark.image)

- **建议**： 开发微信小程序时设计师可以用 **iPhone6** 作为视觉稿的标准

**测试代码**

```css
/* wxss.wxss */
.box1 {
  width: 100px;
  height: 100px;
  background: red;
}

.box2 {
  width: 200rpx;
  height: 200rpx;
  background: blue;
}
```

```xml
<!-- xmss.wsml -->

<!-- 前端也需要进行配置尺寸的适配: em/rem/vw/vn -->
<view class="box1"></view>
<view class="box2"></view>
```

**测试结果**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a495d6578c2b42c19cbb0ac1b3358d7d~tplv-k3u1fbpfcp-watermark.image)

## wxss 的扩展 – 样式导入

- 为什么使用样式导入？

  - 在某些情况下，我们可能会`将样式分在多个wxss文件`中，方便对
    样式的管理。
  - 这个时候，我们就可以使用样式导入，来让单独的 wxss 生效

- 我们可以在一个 wxss 中导入另一个 wxss 文件

  - 使用`@import`进行导入
  - @import 后跟需要导入的外联样式表的相对路径（或者绝对路
    径也可以），用;表示语句结束

- 导入的位置在哪里
  - 可以在 app.wxss 中导入这个样式
  - 也可以在 page.wxss 导入这个样式

**测试代码**

```css
/* box.wxss */
.box1 {
  width: 100px;
  height: 100px;
  background: red;
}

.box2 {
  width: 200rpx;
  height: 200rpx;
  background: blue;
}
```

```css
/* wxss.wxss */
@import "./style/box.wxss";
```

**测试结果**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a495d6578c2b42c19cbb0ac1b3358d7d~tplv-k3u1fbpfcp-watermark.image)

## 官方样式库

- 为了减少开发者样式开发的工作量，小程序官方提供了 [WeUI.wxss](https://github.com/Tencent/weui-wxss)基本样式库
- 比如搜索框,在开发中如果我们想要实现搜索框的功能是比较麻烦的
- 这个时候就可以使用样式库来减少我们的工作量

下面就通过使用样式库的搜索框来讲解 weui 的使用

```css
/* wxss.wxss */

/* 搜索框旁边有个搜索的icon,所以要引入对应的icon文件 */
@import "./icon/weui-icon.wxss";
@import "./style/weui-searchbar.wxss";
```

```xml
<!-- wxss.wxml -->
<view class="weui-search-bar {{inputShowed ? 'weui-search-bar_focusing' : ''}}" id="searchBar">
  <form class="weui-search-bar__form">
    <view class="weui-search-bar__box">
      <i class="weui-icon-search"></i>
      <input type="text" class="weui-search-bar__input" placeholder="搜索" value="{{inputVal}}" focus="{{inputShowed}}"
        bindinput="inputTyping" />
      <span class="weui-icon-clear" wx:if="{{inputVal.length > 0}}" bindtap="clearInput"></span>
    </view>
    <label class="weui-search-bar__label" bindtap="showInput">
      <i class="weui-icon-search"></i>
      <span class="weui-search-bar__text">搜索</span>
    </label>
  </form>
  <view class="weui-search-bar__cancel-btn" bindtap="hideInput">取消</view>
</view>
```

```js
// wxss.js

// 在搜索框中用到了很多数据,所以也要导入搜索框对应的js文件
  data: {
    inputShowed: false,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
```

**测试效果**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1dccb0508d26464cbe652e582db96e96~tplv-k3u1fbpfcp-watermark.image)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99819c00b96e47e282aef28fe3c1bb9b~tplv-k3u1fbpfcp-watermark.image)

:books: [官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)
