---
title: 组合式API
autoGroup-4: 可复用 & 组合
---

## 介绍

### 什么是组合式 API?

#### Options API 的弊端

- 在 Vue2 中，我们编写组件的方式是 Options API：
  - Options API 的一大特点就是在对应的属性中编写对应的功能模块；
  - 比如 `data` 定义数据、`methods` 中定义方法、`computed` 中定义计算属性、`watch` 中监听属性改变，也包括生命
    周期钩子；
- 但是这种代码有一个很大的弊端：
- 当我们实现某一个功能时，这个功能对应的代码逻辑会被拆分到各个属性中；
- 当我们组件变得更大、更复杂时，逻辑关注点的列表就会增长，那么同一个功能的逻辑就会被拆分的很分散；
- 尤其对于那些一开始没有编写这些组件的人来说，这个组件的代码是难以阅读和理解的（阅读组件的其他人）；
- 下面我们来看一个非常大的组件，其中的逻辑功能按照颜色进行了划分：
  - 这种碎片化的代码使用理解和维护这个复杂的组件变得异常困难，并且隐藏了潜在的逻辑问题；
  - 并且当我们处理单个逻辑关注点时，需要不断的跳到相应的代码块中；

#### 大组件的逻辑分散

![](/frame/vue/67.png)

- 如果我们能将同一个逻辑关注
  点相关的代码收集在一起会更
  好。
- 这就是 Composition API 想
  要做的事情，以及可以帮助我
  们完成的事情。
- 也有人把 Vue Composition
  API 简称为**VCA**。

> 我理解为 setup 在生命周期中的表现是 setup 会在 beforeCreate 之前进行回调

### 组合式 API 基础

既然我们知道了为什么，我们就可以知道怎么做。为了开始使用组合式 API，我们首先需要一个可以实际使用它的地方。在 Vue 组件中，我们将此位置称为 setup。

#### `setup` 组件选项

新的 `setup` 选项在组件创建之前执行，一旦 `props` 被解析，就将作为组合式 API 的入口。

> 我理解为 setup 在生命周期中的表现是 setup 会在 beforeCreate 之前就会回调

::: warning
在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例。`setup` 的调用发生在 `data` property、`computed` property 或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取。
:::

> 我理解为 setup 中没有像 data 和 methods 那样绑定 this,所以 setup 中的 this 为是 undefined

```vue {13}
<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      name: "tao",
    };
  },
  setup() {
    console.log(this); // undefined
  },
};
</script>

<style scoped></style>
```

`setup` 选项是一个接收 `props` 和 `context` 的函数，我们将在之后进行讨论。此外，我们将 `setup` 返回的所有内容都暴露(return)给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。

#### 带 ref 的响应式变量

在 setup 函数中定义数据是没有响应式的,如图所示:

```vue
<template>
  <div>
    <h2>{{ counter }}</h2>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "tao",
    };
  },
  setup() {
    let counter = 0;
    const increment = () => {
      counter++;
      console.log(counter);
    };
    return {
      counter,
      increment,
    };
  },
};
</script>

<style scoped></style>
```

![](/frame/vue/90.gif)

在 Vue 3.0 中，我们可以通过一个新的 `ref` 函数使任何响应式变量在任何地方起作用，如下所示：

```js
import { ref } from "vue";

const counter = ref(0);
```

ref 接收参数并将其包裹在一个带有 value property 的对象中返回，然后可以使用该 property 访问或更改响应式变量的值：

```vue {9,17,19,20}
<template>
  <div>
    <h2>{{ counter }}</h2>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  data() {
    return {
      name: "tao",
    };
  },
  setup() {
    let counter = ref(0);
    const increment = () => {
      counter.value++;
      console.log(counter);
    };
    return {
      counter,
      increment,
    };
  },
};
</script>

<style scoped></style>
```

![](/frame/vue/91.gif)
