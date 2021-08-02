---
sidebarDepth: 0
---

# 动态路由

添加路由到你的路由上通常是通过 `routes` 配置来完成的，但是在某些情况下，你可能想在应用程序已经运行的时候添加或删除路由。

某些情况下我们可能需要动态的来添加路由：

- 比如根据用户不同的权限，注册不同的路由；
- 这个时候我们可以使用一个方法 `addRoute`；

添加顶层路由

```js
const article = {
  path: "/article",
  component: () => import("../pages/Article.vue"),
};

router.addRoute(article);
```

添加二级路由

```js
const dynamic = {
  path: "dynamic",
  component: () => import("../pages/Dynamic.vue"),
};
// 这个home是路由的name属性的值
router.addRoute("home", dynamic);
```

## 动态删除路由

删除路由有以下三种方式：

- 添加一个 `name` 相同的路由；
- 通过 `removeRoute` 方法，传入路由的名称；
- 通过 `addRoute` 方法的返回值回调；

```js
// 方式一
const article = {
  path: "/article",
  name: "article",
  component: () => import("../pages/Article.vue"),
};
const article2 = {
  path: "/article2",
  name: "article",
  component: () => import("../pages/Article.vue"),
};

router.addRoute(article);
router.addRoute(article2);
```

```js
// 方式二
router.removeRoute("article");
```

```js
// 方式三
const removeRoute = router.addRoute(article2);
removeRoute();
```

## 其他方法补充

router.hasRoute():检查路由是否存在

router.getRoutes():获取一个包含所有路由记录的数组

:::tip 提示
日常开发的话添加路由**用的比较多**,删除路由和其它方法可以做一个了解
:::
