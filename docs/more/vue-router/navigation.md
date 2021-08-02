---
sidebarDepth: 0
---

# 编程式导航

除了使用 `router-link` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

## 导航到不同的位置

有时候我们希望通过代码来完成页面的跳转，比如点击的是一个按钮：

在 v2 在可以通过`$router.push`的方式来进行页面跳转(push 可以是一个函数,也可以是一个对象)

```html
<button @click="jumpToHome">跳转首页</button>
```

```js
methods: {
  jumpToHome() {
    this.$router.push("/home");
  },
```

![](/frame/vue/110.gif)

在 setup 中我们可以通过`useRouter` hook 来进行页面跳转

```js
import { useRouter } from "vue-router";
const router = useRouter();
const jumpToHome = () => {
  router.push("/home");
};
```

![](/frame/vue/110.gif)

我们也可以通过 query 的方式来传递参数

```js
import { useRouter } from "vue-router";
const router = useRouter();
const jumpToHome = () => {
  router.push({
    path: "/home",
    query: {
      name: "tao",
      age: 19,
    },
  });
};
```

之后我们在 Home 界面就在`$route.query`对象中拿到传递过来的参数

```html
<p>{{ $route.query.name }}-{{ $route.query.age }}</p>
```

![](/frame/vue/111.png)

## 替换当前位置

使用 push 的特点是压入一个新的页面，那么在用户点击返回时，上一个页面还可以回退，但是如果我们希望当前
页面是一个替换操作，那么可以使用`replace`

| 声明式                         |       编程式        |
| ------------------------------ | :-----------------: |
| router-link :to="..." replace> | router.replace(...) |

也可以直接在传递给 `router.push` 的 `routeLocation` 中增加一个属性 `replace: true` ：

```js
router.push({ path: "/home", replace: true });
// 相当于
router.replace({ path: "/home" });
```

## 横跨历史

该方法采用一个整数作为参数，表示在历史堆栈中前进或后退多少步，类似于 `window.history.go(n)`。

```js
// 向前移动一条记录，与 router.forward() 相同
router.go(1);

// 返回一条记录，与router.back() 相同
router.go(-1);

// 前进 3 条记录
router.go(3);

// 如果没有那么多记录，静默失败
router.go(-100);
router.go(100);
```
