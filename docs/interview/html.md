---
title: HTML
---

## 图片懒加载

**含义**: 当打开一个有很多图片的页面时，先只加载页面上看到的图片，等滚动到页面下面时，再加载所需的图片。

**作用**: 减少或者延迟网络请求,缓解服务器的压力,增强用户的体验

**原理**: 一张图片就是一个`img`标签，浏览器是否发起请求图片是根据`img`的 src 属性，所以实现懒加载的关键就是，在图片没有进入可视区域时，先不给 `img` 的 src 赋值，这样浏览器就不会发送请求了，等到图片进入可视区域再给 src 赋值

## h5 新特性

### 语义化标签

**常用**

- header
- nav
- main
- footer

### 多媒体标签

- video
- audio

### 表单元素

很多类型的表单,input 设置不同的 type 变为不同的表单,比如 submit,number,text

### 本地存储

- sessionStorage

- localStorage

## 块级元素和行内元素

**常见**

块级元素:

- div
- p
- form
- ul
- li
- hr

行内元素:

- br
- img
- input
- span

## svg 和 canvas

svg 是可缩放矢量图形

canvas 是用 JavaScript 来绘制 2D 图形的

## px,em,rem
