---
sidebarDepth: 0
---

# 路由懒加载

- 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载：
  - 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会
    更加高效；
  - 也可以提高首屏的渲染效率；

Vue Router 支持开箱即用的动态导入，这意味着你可以用动态导入代替静态导入：

```js
// 旧
import Home from "../components/Home";
import About from "../components/About";

// 新
const routes = [
  { path: "/home", component: () => import("../components/Home") },
  { path: "/about", component: () => import("../components/About") },
];
```

一般来说，对所有的路由都使用**动态导入**是个好主意。

:::warning 警告
**不要**在路由中使用异步组件。异步组件仍然可以在路由组件中使用，但路由组件本身就是动态导入的。
:::

## webpack

如果你使用的是 webpack 之类的打包器，它将自动从代码分割中受益。

默认分包后的文件名是无逻辑的

![](/frame/vue/100.png)

我们可以通过 webpack 的魔法注释来定义分包后文件的名称

```js
const routes = [
  {
    path: "/home",
    component: () =>
      import(/*webpackChunkName:"home-chunk"*/ "../components/Home"),
  },
  {
    path: "/about",
    component: () =>
      import(/*webpackChunkName:"about-chunk"*/ "../components/About"),
  },
];
```

使用路由懒加载前

![](/frame/vue/99.png)

使用路由懒加载后

![](/frame/vue/101.png)

## vite

当然 vite 也可以进行分包,vite 不需要使用魔法注释,在 vite 中使用了路由懒加载也会分包,而且打包后的文件名称也是很符合逻辑的

使用路由懒加载前

![](/frame/vue/102.png)

使用路由懒加载后

![](/frame/vue/103.png)
