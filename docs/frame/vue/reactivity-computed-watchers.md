---
title: 响应式计算和侦听
sidebarDepth: 3
---

## 计算值

有时我们需要依赖于其他状态的状态——在 Vue 中，这是用组件**计算属性**处理的，以直接创建计算值，我们可以使用 `computed` 方法：它接受 getter 函数并为 getter 返回的值返回一个**不可变**的响应式 `ref` 对象。

```js
import { computed } from "vue";
const count = ref(0);
const pulsOne = computed(() => count.value + 1);
console.log(pulsOne.value); // 1
pulsOne.value++; // warning: computed value is readonly
```

或者，它可以使用一个带有 `get` 和 `set` 函数的对象来创建一个可写的 `ref` 对象。

```js
import { computed } from "vue";
const count = ref(0);
const plusOne = computed({
  get: () => count.value + 1,
  set: (value) => (count.value = value - 1),
});
plusOne.value = 6;
console.log(count.value); // 5
```

## watchEffect

为了根据响应式状态自动应用和重新应用副作用，我们可以使用 `watchEffect` 方法。它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

```js
import { ref, watchEffect } from "vue";
const count = ref(0);
watchEffect(() => console.log(count.value)); // 0,1
setTimeout(() => {
  count.value++;
}, 1000);
```

### 停止侦听

当 `watchEffect` 在组件的 `setup` 函数或生命周期钩子被调用时，侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。

在一些情况下，也可以显式调用返回值以停止侦听：

```js
const count = ref(0);
const increment = () => {
  count.value++;
  if (count.value === 5) {
    stop();
  }
};
const stop = watchEffect(() => console.log(count.value));
```

### 清除副作用

有时副作用函数会执行一些异步的副作用，这些响应需要在其失效时清除 (即完成之前状态已改变了) 。所以侦听副作用传入的函数可以接收一个 `onInvalidate` 函数作入参，用来注册清理失效时的回调。当以下情况发生时，这个失效回调会被触发：

```js
const count = ref(0);
const increment = () => {
  count.value++;
  if (count.value > 5) {
    stop();
  }
};
const stop = watchEffect((onInvalidate) => {
  // 根据count的监听发送网络请求
  // 如果我们不清除副作用的话
  // 比如我们刚进来发送网络请求，count发送了变化，就会又发送一次网络请求，然后不断发生变化，就会一直发送网络请求
  // 那么就可能发送很多次的网络请求，所以要清除副作用（有点防抖的那个意思了)

  // 通过定时器模拟发送网络请求
  const timer = setTimeout(() => {
    console.log("网络请求成功");
  }, 2000);
  onInvalidate(() => {
    // 在这个函数中清除副作用
    clearTimeout(timer);
    console.log("清除上一次的网络请求");
  });
  console.log(count.value);
});
```

![](/frame/vue/97.gif)

我们之所以是通过传入一个函数去注册失效回调，而不是从回调返回它，是因为返回值对于异步错误处理很重要。

在执行数据请求时，副作用函数往往是一个异步函数：

### 副作用刷新时机

Vue 的响应性系统会缓存副作用函数，并异步地刷新它们，这样可以避免同一个“tick” 中多个状态改变导致的不必要的重复调用。在核心的具体实现中，组件的 `update` 函数也是一个被侦听的副作用。当一个用户定义的副作用函数进入队列时，默认情况下，会在所有的组件 `update` 前执行：

```js
const count = ref(0);
const increment = () => {
  count.value++;
};
watchEffect(() => {
  console.log(count.value);
});
```

在这个例子中：

- `count` 会在初始运行时同步打印出来
- 更改 `count` 时，将在组件更新前执行副作用。

如果需要在组件更新(例如：当与模板引用一起)后重新运行侦听器副作用，我们可以传递带有 flush 选项的附加 options 对象 (默认为 'pre')：
