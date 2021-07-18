---
title: Action
sidebarDepth: 0
---

# Action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

  让我们来注册一个简单的 action：

```js
actions: {
  incrementAction(context) {
    setTimeout(() => {
      context.commit(INCREMENR)
    }, 1000);
  },
}
```

Action 函数接受一个与 store 实例具有相同方法和属性的 `context` 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 `state` 和 `getters`。当我们在之后介绍到 Modules 时，你就知道 `context` 对象为什么不是 `store` 实例本身了。

实践中，我们会经常用到 ES2015 的参数解构来简化代码（特别是我们需要调用 `commit` 很多次的时候）：

```js
actions: {
  incrementAction({commit}) {
    setTimeout(() => {
      context.commit(INCREMENR)
    }, 1000);
  },
}
```

## 分发 Action

Action 通过 store.dispatch 方法触发：

```js
const incrementAction = () => {
  store.dispatch("incrementAction");
};
```

乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在 action 内部执行**异步**操作：

```js
actions: {
  incrementAction({commit}) {
    setTimeout(() => {
      context.commit(INCREMENR)
    }, 1000);
  },
}
```

Actions 支持同样的载荷方式和对象方式进行分发：

```js
const incrementActionN = () => {
  store.dispatch("incrementActionN", { number: -10 });
};

const incrementActionN = () => {
  store.dispatch({
    type: "incrementActionN",
    number: -10,
  });
};
```

## 组合 Action

Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，你需要明白 `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：

```js
actions: {
  getHomeBanner({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('http://123.207.32.32:8000/home/multidata').then(res => {
        commit(ADD_BANNER_DATA, res.data.data.banner.list)
        resolve(res.data.data.banner.list)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
```

现在你可以：

```js
onMounted(() => {
  store
    .dispatch("getHomeBanner")
    .then((value) => console.log(value))
    .catch((err) => console.log(err));
});
```

在另外一个 action 中也可以：

```js
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

最后，如果我们利用 async / await，我们可以如下组合 action：

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

一个 `store.dispatch` 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。
