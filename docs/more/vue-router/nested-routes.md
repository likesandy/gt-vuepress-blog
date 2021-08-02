---
sidebarDepth: 0
---

# 嵌套路由

- 什么是路由的嵌套呢？
  - 目前我们匹配的 Home、About、User 等都属于底层路由，我们在它们之间可以来回进行切换；
  - 但是呢，我们 Home 页面本身，也可能会在多个组件之间来回切换：
    - 比如 Home 中包括 Shops、Message，它们可以在 Home 内部来回切换；
  - 这个时候我们就需要使用嵌套路由，在 Home 中也使用 `router-view` 来占位之后需要渲染的组件；

## 路由的嵌套配置

```html
<h2>Home页面</h2>
<router-link to="/home/message">消息</router-link>
<router-link to="/home/shops">商品</router-link>
<router-view />
```

```js
{
  path: '/home', component: () => import('../pages/Home.vue'), children: [
    { path: 'message', component: () => import('../pages/HomeMessage.vue') },
    { path: 'shops', component: () => import('../pages/HomeShops.vue') },
  ]
},
```

![](/frame/vue/109.gif)
