---
title: 处理css
---

## 处理普通的 css

- vite 可以直接支持 css 的处理
  - 直接导入 css 即可；

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script src="./src/app.js" type="module"></script>
  </body>
</html>
```

```css
/* src/css/style.css */
.title {
  font-size: 50px;
  color: red;
}
```

```js
// scc/app.js
import "./css/style.css";

const titleEl = document.createElement("div");

titleEl.className = "title";
titleEl.innerHTML = "Hello World";
document.body.appendChild(titleEl);
```

![](/frontEnd/Vite/5.png)

## 处理 css 预处理器

- vite 可以直接支持 css 预处理器，比如 less
  - 直接导入 less；
  - 之后安装 less 编译器；
  ```sh
  npm install less -D
  ```
- vite 直接支持 postcss 的转换：
  - 只需要安装 postcss，并且配置 postcss.config.js 的配置文件即可；
  ```sh
  npm install postcss postcss-preset-env -D
  ```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script src="./src/app.js" type="module"></script>
  </body>
</html>
```

```less
// src/css/title.less
@fontSize: 50px;
@Color: blue;

.title {
  font-size: @fontSize;
  color: @Color;

  user-select: none;
}
```

```js
// src/app.js
import "./css/title.less";

const titleEl = document.createElement("div");

titleEl.className = "title";
titleEl.innerHTML = "Hello World";
document.body.appendChild(titleEl);
```

```js
// postcss.config.js
module.exports = {
  plugins: [require("postcss-preset-env")],
};
```

![](/frontEnd/Vite/6.png)

![](/frontEnd/Vite/7.png)
