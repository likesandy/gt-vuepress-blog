---
title: 资源打包
---

## 加载图片案例准备

- 为了演示我们项目中可以加载图片，我们需要在项目中使用图片，比较常见的使用图片的方式是两种：
  - img 元素，设置 src 属性；
  - 其他元素（比如 div），设置 background-image 的 css 属性；

```js
// src/element.js
// import 'css-loader!../css/style.css';
import "../css/style.css";
import "../css/title.less";
import "../css/image.css";

export function element() {
  const divEl = document.createElement("div");
  const bgEl = document.createElement("div");
  divEl.className = "title";
  divEl.innerHTML = "Hello World";
  bgEl.className = "image-bg";

  document.body.appendChild(divEl);
  document.body.appendChild(bgEl);
}
```

```css
/* src/images/image.css */
.image-bg {
  background-image: url("../images/sandy.jpg");
  width: 200px;
  height: 200px;
}
```

![](/frontEnd/webpack/6.png)

## file-loader

- 要处理 jpg、png 等格式的图片，我们也需要有对应的 loader：file-loader
  - file-loader 的作用就是帮助我们处理 import/require()方式引入的一个文件资源，并且会将它放到我们输出的文
    件夹中；
  - 当然我们待会儿可以学习如何修改它的名字和所在文件夹；
- 安装 file-loader：

```sh
npm install file-loader -D
```

- 配置处理图片的 Rule：

```js
{
  test: /\.(png|jpe?g|gif|svg)$/i,
  loader: "file-loader"
}
```
