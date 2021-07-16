---
title: 入门
sidebarDepth: 0
---

## 创建 Store

每一个 Vuex 应用的核心就是 `store`（仓库）：

- `store` 本质上是一个容器，它包含着你的应用中大部分的状态（`state`）；

Vuex 和单纯的全局对象有什么区别呢？

- Vuex 的状态存储是响应式的
  - 当 Vue 组件从 `store` 中读取状态的时候，若 `store` 中的状态发生变化，那么相应的组件也会被更新；
- 你不能直接改变 `store` 中的状态
  - 改变 `store` 中的状态的唯一途径就显示提交 (`commit`) `mutation；`
  - 这样使得我们可以方便的跟踪每一个状态的变化，从而让我们能够通过一些工具帮助我们更好的管理应用的状态；
- 使用步骤：
  - 创建 `Store` 对象；
  - 在 app 中通过插件安装；

## 最简单的 Store

我们简单做一个计数器的案例:

- 创建状态管理文件夹(一般我们会创建一个 store 的目录)

创建过程直截了当——仅需要提供一个初始 `state` 对象和一些 `mutation`：

```js
// store/index.js
import { createStore } from "vuex";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
  },
});

export default store;
```

```js
// main.js
import store from "./store";

createApp(App)
  .use(store)
  .mount("#app");
```

配置完毕之后,我们在组件中进行使用

现在，你可以通过 `store.state` 来获取状态对象，并通过 `store.commit` 方法触发状态变更：

```html
<h2>当前计数:{{ state.count }}</h2>
<button @click="incrementt">+1</button>
<button @click="decrement">-1</button>
```

在 Vue 组件中， 可以通过 `this.$store` 访问`store`实例。

v3 提供了`useStroe` hook 可以访问`store`实例

```js
import { useStore } from "vuex";
const store = useStore();
const state = store.state;
const incrementt = () => {
  store.commit("increment");
};
const decrement = () => {
  store.commit("decrement");
};
```

![](/frame/vue/vuex/4.gif)

再次强调，我们通过提交 `mutation` 的方式，而非直接改变 store.state.count，是因为我们想要更明确地追踪到状态的变化。这个简单的约定能够让你的意图更加明显，这样你在阅读代码的时候能更容易地解读应用内部的状态改变。此外，这样也让我们有机会去实现一些能记录每次状态改变，保存状态快照的调试工具。有了它，我们甚至可以实现如时间穿梭般的调试体验。

:::tip 提示
意思就是使用 Vuex 必须遵循**单向数据流**的原则
:::

由于 `store` 中的状态是响应式的，在组件中调用 `store` 中的状态简单到仅需要在**计算属性**中返回即可。触发变化也仅仅是在组件的 `methods` 中提交 `mutation`.

那我们如果要使用 vuex 的 state 就可以把 state 定义在计算属性,然后使用计算属性就可以了

```js
const count = computed(() => {
  return store.state.count;
});
```

```html
<h2>当前计数:{{ count }}</h2>
```
