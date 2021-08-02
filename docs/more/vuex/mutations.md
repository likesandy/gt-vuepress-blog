---
title: Mutation
sidebarDepth: 0
---

# Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```js
mutations: {
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count--
  },
},
```

想要触发 `mutation` 方法,必须以相应的 type 调用 `store.commit` 方法

```js
import { useStore } from "vuex";
const store = useStore();
const increment = () => {
  store.commit("increment");
};
const decrement = () => {
  store.commit("decrement");
};
```

```html
<button @click="increment">+1</button> <button @click="decrement">-1</button>
```

## 提交载荷（Payload）

你可以向 `store.commit` 传入额外的参数，即 `mutation` 的载荷（payload）：

```js
mutations: {
  incrementN(state, payload) {
    state.count += payload
  }
},
```

```js
const incrementN = () => {
  store.commit("incrementN", 10);
};
```

```html
<button @click="incrementN">+10</button>
```

在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 `mutation` 会更易读：

```js
mutations: {
  incrementN(state, payload) {
    state.count += payload.number
  }
},
```

```js
const incrementN = () => {
  store.commit("incrementN", {
    number: 10,
  });
};
```

## 对象风格的提交方式

提交 `mutation` 的另一种方式是直接使用包含 type 属性的对象：

```js
const incrementN = () => {
  store.commit({
    type: "incrementN",
    number: 10,
  });
};
```

## 使用常量替代 Mutation 事件类型

定义变量是为了方便我们在写 type 的时候容易写错类型名称.使用常量就可以直接进行导入使用,写错的几率就会大大减低

```js
// mutation-types.js
export const INCREMENR = "INCREMENR";
export const DECREMENT = "DECREMENT";
export const INCREMENT_N = "INCREMENT_N";
```

```js
mutations: {
  [INCREMENR](state) {
    state.count++
  },
  [DECREMENT](state) {
    state.count--
  },
  [INCREMENT_N](state, payload) {
    state.count += payload.number
  }
},
```

用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做。

在组件使用也可以导入常量来减少写错的几率

```js
import { INCREMENR, DECREMENT, INCREMENT_N } from "./store/mutation-types";
const increment = () => {
  store.commit(INCREMENR);
};
const decrement = () => {
  store.commit(DECREMENT);
};
const incrementN = () => {
  store.commit({
    type: INCREMENT_N,
    number: 10,
  });
};
```
