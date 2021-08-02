---
title: State
sidebarDepth: 0
---

## 单一状态树

Vuex 使用单一状态树：

- 用一个对象就包含了全部的应用层级状；
- 采用的是 SSOT，Single Source of Truth，也可以翻译成**单一数据源**；
- 这也意味着，每个应用将仅仅包含一个 `store` 实例；
- 单状态树和模块化并不冲突，后面我们会讲到 module 的概念；

单一状态树的优势：

- 如果你的状态信息是保存到多个 `Store` 对象中的，那么之后的管理和维护等等都会变得特别困难；
- 所以 Vuex 也使用了单一状态树来管理应用层级的全部状态；
- 单一状态树能够让我们最直接的方式找到某个状态的片段，而且在之后的维护和调试过程中，也可以非常方便
  的管理和维护；

## mapState 辅助函数

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：

但是我觉得`mapState`属于是 v2 的 API,在 v3 不适用,如果你真的想要使用的话也可以

在 setup 中使用`mapState`

```html
<h2>当前计数:{{ count }}</h2>
```

```js
import { computed } from "vue";
import { useStore, mapState } from "vuex";
export default {
  setup(props) {
    const store = useStore();
    const stateFns = mapState(["count", "name", "age"]);
    const states = {};
    Object.keys(stateFns).forEach((fnKey) => {
      states[fnKey] = computed(stateFns[fnKey].bind({ $store: store }));
    });
    const incrementt = () => {
      store.commit("increment");
    };
    const decrement = () => {
      store.commit("decrement");
    };
    return {
      ...states,
      incrementt,
      decrement,
    };
  },
};
```

在 script setup 中可以这样使用

```html
<h2>当前计数:{{ count }}</h2>
```

```js
import { computed } from "vue";
import { useStore, mapState } from "vuex";
const store = useStore();
const stateFns = mapState(["count", "name", "age"]);
const states = {};
Object.keys(stateFns).forEach((fnKey) => {
  states[fnKey] = computed(stateFns[fnKey].bind({ $store: store }));
});
const { count } = states;
const incrementt = () => {
  store.commit("increment");
};
const decrement = () => {
  store.commit("decrement");
};
```

:::warning 警告
在 script setup 中这样来使用,个人感觉非常的冗余

我查了很久的文档和翻阅资料,v3 使用 vux4 的 map\*有问题

map\* 助手不适用于 setup 中的组合 API，因为它们依赖于“this”：

转载:[https://github.com/vuejs/vuex/issues/1948](https://github.com/vuejs/vuex/issues/1948)

因为现在 script setup 已经定稿合并了,以后可能 script setup 用的比较多,所以我个人的话我不会选择 mapxxx,我会使用 计算属性的形式,本来我想着用 toRefs 来进行解构,但感觉下来不符合规律,暂时还是先用着 computed,后期可能还会有 vuex5 的出现,带来全面的提升,让我们拭目以待

最后还是不决定在 v3 中使用 map\*,期待 Vuex5🎉🎉
:::

```js
const count = computed(() => store.state.count);
```
