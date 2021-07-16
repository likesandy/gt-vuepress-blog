---
title: 前言
sidebarDepth: 0
---

## 认识前端路由

路由其实是网络工程中的一个术语：

- 在架构一个网络时，非常重要的两个设备就是**路由器**和**交换机**.
- 当然，目前在我们生活中**路由器**也是越来越被大家所熟知，因为我们生活中都会用到**路由器**：
- 事实上，路由器主要维护的是一个映射表；
- **映射表**会决定数据的流向；

路由的概念在软件工程中出现，最早是在后端路由中实现的，原因是 web 的发展主要经历了这样一些阶段：

- 后端路由阶段；
- 前后端分离阶段；
- 单页面富应用（SPA）；

## 后端路由阶段

早期的网站开发整个 HTML 页面是由服务器来渲染的.

- 服务器直接**生产渲染好对应的 HTML 页面**, 返回给客户端进行展示.

但是, 一个网站, 这么多页面服务器如何处理呢?

- 一个页面有自己对应的网址, 也就是**URL**；
- URL 会发送到服务器, 服务器会通过**正则对该 URL 进行匹配**, 并且最后交给**一个 Controller 进行处理**；
- Controller 进行各种处理, 最终生成 **HTML 或者数据**, 返回给前端.

上面的这种操作, 就是后端路由：

- 当我们页面中需要**请求不同的路径内容**时, 交给服务器来进行处理, 服务器渲染好**整个页面**, 并且将**页面返回给客户端**.
- 这种情况下渲染好的页面, **不需要单独加载任何的 js 和 css**, 可以直接**交给浏览器展示**, 这样也**有利于 SEO 的优化**.

后端路由的缺点:

- 一种情况是**整个页面的模块由后端人员来编写和维护**的；
- 另一种情况是**前端开发人员如果要开发页面, 需要通过 PHP 和 Java 等语言来编写页面代码**；
- 而且通常情况下 **HTML 代码和数据以及对应的逻辑会混在一起**, 编写和维护都是非常糟糕的事情；

## 前后端分离阶段

前端渲染的理解：

- 每次请求涉及到的静态资源都会从静态资源服务器获取，这些资源包括 HTML+CSS+JS，然后**在前端对这些请求回来的资源进行渲染**；
- 需要注意的是，客户端的每一次请求，都会**从静态资源服务器请求文件**；
- 同时可以看到，和之前的后端路由不同，这时后端只是**负责提供 API** 了；

前后端分离阶段：

- 随着 Ajax 的出现, 有了**前后端分离的开发模式**；
- 后端只提供 API 来返回数据，前端**通过 Ajax 获取数据**，并且可以**通过 JavaScript 将数据渲染到页面**中；
- 这样做最大的优点就是**前后端责任的清晰，后端专注于数据上，前端专注于交互和可视化**上；
- 并且当**移动端(iOS/Android)**出现后，后端不需要进行任何处理，依然使用之前的一套 API 即可；
- 目前比较少的网站采用这种模式开发（jQuery 开发模式）；

## URL 的 hash

前端路由是如何做到 URL 和内容进行映射呢？监听 URL 的改变。

- URL 的 hash 也就是锚点(#), 本质上是改变 window.location 的 href 属性；
- 我们可以通过直接赋值 location.hash 来改变 href, 但是页面不发生刷新；

```html
<div id="app">
  <a href="#/home">首页</a>
  <a href="#/about">关于</a>
  <div class="router-view">首页</div>
</div>
```

```js
const routerViewEl = document.querySelector(".router-view");

window.addEventListener("hashchange", () => {
  switch (location.hash) {
    case "#/home":
      routerViewEl.innerHTML = "首页";
      break;
    case "#/about":
      routerViewEl.innerHTML = "关于";
      break;
    default:
      routerViewEl.innerHTML = "首页";
  }
});
```

hash 的优势就是兼容性更好，在老版 IE 中都可以运行，但是缺陷是有一个#，显得不像一个真实的路径。

## HTML5 的 History

history 接口是 HTML5 新增的, 它有 l 六种模式改变 URL 而不刷新页面：

- replaceState：替换原来的路径；
- pushState：使用新的路径；
- popState：路径的回退；
- go：向前或向后改变路径；
- forward：向前改变路径；
- back：向后改变路径；

```html
<div id="app">
  <a href="/home">home</a>
  <a href="/about">about</a>

  <div class="content">Default</div>
</div>
```

```js
const contentEl = document.querySelector(".content");

const changeContent = () => {
  console.log("-----");
  switch (location.pathname) {
    case "/home":
      contentEl.innerHTML = "Home";
      break;
    case "/about":
      contentEl.innerHTML = "About";
      break;
    default:
      contentEl.innerHTML = "Default";
  }
};

const aEls = document.getElementsByTagName("a");
for (let aEl of aEls) {
  aEl.addEventListener("click", (e) => {
    e.preventDefault();

    const href = aEl.getAttribute("href");
    // history.pushState({}, "", href);
    history.replaceState({}, "", href);

    changeContent();
  });
}

window.addEventListener("popstate", changeContent);
```
