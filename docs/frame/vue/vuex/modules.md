---
title: Module
sidebarDepth: 0
---

# Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
// modules/home.js
export default {
  state() {
    return {
      homeCount: 1,
    };
  },
  getters: {},
  mutations: {},
  actions: {},
};
```

```js
// index.js
import { createStore } from 'vuex'
import homeModule from './modules/home';
const store = createStore({
  modules: {
    homeModule,
  }
}
```

获取模块的 state

```js
const homeCount = computed(() => store.state.homeModule.homeCount);
```

获取模块的 getters(默认情况下模块内的 getters 会被合并到全局下的 getters)

```js
const doubleHomeCount = computed(() => store.getters.doubleHomeCount);
```

获取模块的 mutations(默认情况下 commit 会执行所有名称相同的 mutation)

```js
const rootClick = () => {
  store.commit(INCREMENR);
};
const homeClick = () => {
  store.commit(INCREMENR);
};
```

```js
  [INCREMENR](state) {
    state.count++
  },
    [INCREMENR](state) {
  state.homeCount++
},
```

![](/frame/vue/vuex/5.gif)

同样 Actions 也会执行所有名称相同的 action

那我们用的时候才知道是用的全局的还是模块的,这样就很麻烦

所以就有了命名空间

## 命名空间

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：

```js
// state还是原来的样子
const homeCount = computed(() => store.state.homeModule.homeCount);
const doubleHomeCount = computed(
  () => store.getters["homeModule/doubleHomeCount"]
);
const homeClick = () => {
  store.commit("homeModule/INCREMENR");
};
const incrementAction = () => {
  store.dispatch("homeModule/incrementAction");
};
```

## 在带命名空间的模块内访问全局内容（Global Assets）

如果你希望使用全局 state 和 getter，rootState 和 rootGetters 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。

```js
// home.js
getters: {
  doubleHomeCount(state, getters, rootState, rootGetters) {
    console.log(state.homeCount)
    console.log(getters)
    console.log(rootState)
    console.log(rootGetters)
  }
},
```

若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。

```js
// home.js
actions: {
  incrementAction({ commit, dispatch, state, getters, rootState, rootGetters }) {
    commit(INCREMENR)
    commit(INCREMENR, null, { root: true })

    dispatch(xx)
    dispatch(xx, null, { root: true })
  },
}
```
