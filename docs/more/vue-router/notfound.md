---
title: NotFound
sidebarDepth: 0
---

# Not found 路由

对于哪些没有匹配到的路由，我们通常会匹配到固定的某个页面

比如 NotFound 的错误页面中，这个时候我们可编写一个动态路由用于匹配所有的页面

```js
{ path: '/:pathMatch(.*)', component: () => import('../pages/NotFound.vue') },
```

![](/frame/vue/106.png)

我们可以通过 `$route.params.pathMatch`获取到传入的参数：

```js
created() {
  console.log(this.$route.params.pathMatch);
},
```

![](/frame/vue/107.png)

当然在 v3 中也可以通过`useRoote`获取路由对象,然后在路由对象中获取路由信息

```js
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.params.pathMatch);
```

![](/frame/vue/107.png)

如果我们在 path 的后面多加一个\*,那么会把获取的参数转为数组,`,`表示分隔符,将分组进行分割开来

```js
{ path: '/:pathMatch(.*)*', component: () => import('../pages/NotFound.vue') },
```

![](/frame/vue/108.png)
