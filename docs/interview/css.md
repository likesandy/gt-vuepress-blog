---
title: CSS
---

## 水平居中的方法

- 元素为⾏内元素，设置⽗元素 text-align:center
- 如果元素宽度固定，可以设置左右 margin 为 auto ;
- 如果元素为绝对定位，设置⽗元素 position 为 relative ，元素设 left:0;right:0;margin:auto;
- 使⽤ flex-box 布局，指定 justify-content 属性为 center
- display 设置为 tabel-cell

## 垂直居中的方法

我在开发中一般设置垂直居中会通过 line-height 的方式,因为这种方式是最简单的,

## 盒子水平垂直居中方案

### 定位

```html
<div class="father">
  <div class="son"></div>
</div>
```

#### 盒子必须有宽高,而且知道盒子的宽高

```css
.father {
  width: 300px;
  height: 300px;
  background-color: red;
  position: relative;
}

.son {
  width: 100px;
  height: 100px;
  background-color: blue;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}
```

#### 盒子必须有宽高,但是不用知道盒子的宽高

```css
.body {
  position: relative;
}

.box {
  width: 100px;
  height: 100px;
  background-color: red;
  box-sizing: border-box;
  text-align: center;
  line-height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

#### 盒子不需要宽高,内容会撑起盒子的大小

```css
.father {
  width: 300px;
  height: 300px;
  background-color: red;
  position: relative;
}

.son {
  width: 100px;
  height: 100px;
  background-color: blue;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### flex

```css
.father {
  width: 300px;
  height: 300px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
}

.son {
  width: 100px;
  height: 100px;
  background-color: blue;
}
```

### JavaScript

```css
.father {
  width: 300px;
  height: 300px;
  background-color: red;
  position: relative;
}

.son {
  width: 100px;
  height: 100px;
  background-color: blue;
}
```

```js
const father = document.querySelector(".father");
const son = document.querySelector(".son");
const fatherW = father.clientWidth;
const fatherH = father.clientHeight;
const sonW = son.clientWidth;
const sonH = son.clientHeight;
son.style.position = "absolute";
son.style.left = (fatherW - sonW) / 2 + "px";
son.style.top = (fatherH - sonH) / 2 + "px";
```

### 冷门

这种是来设置文本的,但是我们可以把盒子变成文本,但是要求父亲必须有明确的宽高,不能是百分比

```css
.father {
  width: 300px;
  height: 300px;
  background-color: red;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.son {
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: blue;
}
```

## CSS3 中的盒模型

## 前端的几大经典布局方案

## 定位

### 圣杯布局

### 双飞翼布局

圣杯布局和双飞翼原理都是差不多的,左右固定,中间自适应,**差别**我觉得是实现的方式不一样

### calc

之所以有圣杯布局和双飞翼布局,说白了是因为中间的宽度是不固定,只要我们把中间的宽度固定一下就好了,于是 CSS3 中提供了一个叫做 calc 的计算,通过公式来固定中间的宽度,但是在 CSS 中写这种公式在计算渲染的时候会比较慢

### flex

然后在学习中我发现了 flex,flex 在进行布局是非常方便的,所以我一直在用 flex 进行布局

### grid

还有一种是 grid 布局,这个我还不是很了解,没去学过

## 移动端响应式布局开发方案

### media

比如我们要写一个简单的产品介绍页,我在 pc 端长一行三列,在移动端要变成一行一列,我就会选择用 media 写不同样式就好了

### rem

但是说像那种京东啊 pc 端和移动端长得完全不一样,一般就做两套,pc 固定布局,不做响应式,移动端布局的话就用 rem 等比缩放的方式来写

### flex

常规的响应式布局方案就是 media 和 rem,部分布局的话我会选择用 flex 来做,虽然 flex 不是一个布局的方案,但是也能满足某种需求

### vw/vh

还有一些项目如何要使用百分比布局的话就用 vw 和 vh

## BFC

**含义**

在布局中有三大定位方案,普通流,浮动和定位,通常情况下我们编写的布局都是在普通流中进行编写的,BFC 是块级格式化上下文,它属于普通流,BFC 相当于在普通流中是一个盒子,盒子内部不会影响外部,

**触发 BFC 条件**

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

**特性和使用**

同一个 BFC 下边距会发生折叠

比如有两个 div 并列在 body 下,设置这两个 div 的宽度和高度为 100%,颜色为红色,外边距为 100px,正常情况下两个盒子的距离应该是 200px,但是因为两个 div 都处于同一个 BFC 下,所以两个盒子的距离是 100px,这不是 css 的 bug,而像是一种规范,如果我们想要避免外边距的重叠,可以把两个 div 放在不同的容器里

BFC 可以清除浮动,`BFC` 也可以阻止元素被浮动元素覆盖,浮动是在我刚学习 `css`的时候才学到了浮动,浮动虽好,但我感觉现在用浮动的地方都比较少,而且用了浮动还要清除浮动,浮动一旦脱离了文档流就无法撑起父元素,造成父级元素的高度塌陷,所以后来我就基本没有用浮动来布局了,然后在学习中我发现了 `flex`,`flex`在进行布局是非常方便的,所以我一直在用 `flex` 进行布局

## 清除浮动

额,我已经很久没用浮动来进行布局了,所以这个问题我不清楚

## position 属性

- 绝对定位 absolute(相对于第一个父元素进行定位)
- 相对定位 relative(相对于正常的位置进行定位)
- 绝对定位 fixed(相对于浏览器窗口进行定位)

## 隐藏元素的方式

- overflow:hidden(用来隐藏元素溢出的部分)

- opacity:0(opacity 是用来设置元素的透明度的,opacity:0 就相当隐藏元素,虽然是隐藏了,但是元素还是在 DOM 上,opacity 在读屏软件上是隐藏不了了,)

- visibility:hidden;(这个跟 opacity 差不多,但是这个在读屏软件上是会隐藏的)

- display:none(这个会彻彻底底的隐藏相当于消失)

- position：absolute,然后设置 left/top 那些为-值,元素就不在可视窗口内,相当于就隐藏了元素,这种方式会脱离标准流,所以不会影响我们的网页布局

- 可以将元素设置为绝对定位,然后设置 css 的层叠样式表 z-index 为-值,

- transform: scale(0,0)(设置元素的大小比例,-1-0 是缩小,0-1 是增大)

## flex

## 双栏布局

双栏布局是一个定宽的栏和一个自适应的栏,一般用 float+margin 来实现

## 三栏布局

三栏布局是一个两边定宽,中间自适应,一般用 position+margin 来实现

## 重排和重绘

## CSS 选择器

## CSS 动画

## CSS 实现三角形

## css 精灵图

## 伪类/伪元素
