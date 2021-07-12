---
sidebarDepth: 0
---

# 动态路由基本匹配

- 很多时候我们需要将给定匹配模式的路由映射到同一个组件：
  - 例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，但是用户的 ID 是不同的；
  - 在 Vue Router 中，我们可以在路径中使用一个动态字段来实现，我们称之为 路径参数；

```js
{ path: '/user/:username/:userage', component: () => import('../pages/User.vue') },
```

现在像 /user/johnny 和 /user/jolyne 这样的 URL 都会映射到同一个路由。

当一个路由匹配成功的时候,组件内部会绑定一个`$route`对象,这是 router 内部帮我们做的事情

你可以在同一个路由中设置有多个 路径参数，它们会映射到 `$route.params` 上的相应字段。例如：

| 匹配模式                 |   匹配路径   |                   \$route.params |
| ------------------------ | :----------: | -------------------------------: |
| /user/:username          |  /user/tao   |              { username: 'tao' } |
| /user/:username/:userage | /user/tao/19 | { username: 'tao', userage: 19 } |

除了 `$route.params` 之外，`$route` 对象还公开了其他有用的信息,具体详情请查看官方文档

在 router-link 中进行如下跳转：

```html
<router-link to="/user/tao/19">user</router-link>
```

![](/frame/vue/104.png)

界面跳转是没问题的,那么我们怎么获取路由的参数喃

## 获取动态路由的值

- 在 v2 中通过`$route.params` 获取动态路由的信息

- 在 v3 中通过 `useRoute` 函数获取动态路由的信息

### v2

```html
<h2>欢迎你:{{ user.username }}-{{ user.userage }}</h2>
```

```js
  data() {
    return {
      user: this.$route.params,
    };
  },
```

![](/frame/vue/105.png)

### v3

```html
<h2>欢迎你:{{ user.username }}-{{ user.userage }}</h2>
```

```js
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const user = ref(route.params);
```

![](/frame/vue/105.png)
