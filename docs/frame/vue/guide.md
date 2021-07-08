---
title: 入门
---

## 路由的基本使用步骤

- 创建路由组件的组件(一般我们会创建一个 pages/views 的目录)
- 配置路由
  - 导入对应的组件
  - 配置映射关系
  - 创建路由对象

```js
// router/index.js

import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
// 导入对应的组件
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";

// 配置映射关系
const routes = [
  { path: "/home", component: Home },
  { path: "/about", component: About },
];

// 创建路由对象
const router = createRouter({
  routes,
  history: createWebHistory(),
});

// 导出路由对象
export default router;
```

- 在 main.js 中导入路由对象进行使用

```js
// main.js

import router from "./router";
createApp(App)
  .use(router)
  .mount("#app");
```

- 使用路由
  - 通过 `router-link` 和 `router-view` 来进行路由的跳转和显示

```html
<!-- App.vue -->

<router-link to="/home">home</router-link>
<router-link to="/about">about</router-link>
<router-view />
```

![](/frame/vue/98.gif)
