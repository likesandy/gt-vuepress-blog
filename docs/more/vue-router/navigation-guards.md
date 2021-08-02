---
title: 导航守卫
sidebarDepth: 0
---

## 导航守卫

正如其名，vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。这里有很多方式植入路由导航中：全局的，单个路由独享的，或者组件级的。

## 全局前置守卫

你可以使用 `router.beforeEach` 注册一个全局前置守卫：

它有两个参数：

- to：即将跳转到的 Route 对象；
- from：即将离开的路由 Route 对象；

它有返回值：

- false：取消当前导航(那也不跳,留在原地)
- 不返回或者 undefined：进行默认导航；
- 返回一个路由地址：
  - 可以是一个 string 类型的路径；
  - 可以是一个对象，对象中包含 path、query、params 等信息；

可选的第三个参数：`next`

- 在 Vue2 中我们是通过 `next` 函数来决定如何进行跳转的；
- 但是在 Vue3 中我们是通过返回值来控制的，不再推荐使用 `next` 函数，这是因为开发中很容易调用多次 `next`；

## 登录守卫功能

比如我们做一个网页,让用户进去就必须进入,点击哪个界面都必须先登录,只能登录了再能跳转到其它界面

```vue
<template>
  <div>
    <button @click="loginClick">登录</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const loginClick = () => {
  window.localStorage.setItem("token", "tao");
  router.push("./Home.vue");
};
</script>
```

```js
router.beforeEach((to, from) => {
  if (to.path !== "/login") {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return "/login";
    }
  }
});
```

## 其他导航守卫

Vue 还提供了很多的其他守卫函数，目的都是在某一个时刻给予我们回调，让我们可以更好的控制程序的流程或者功能：

- [详情](https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html)

:::tip 提示
用得最多的还是 beforeEach,后续项目中用到其它的守卫再来进行补充
:::
