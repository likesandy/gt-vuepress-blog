---
title: Composition API
autoPrev: animation
---

## Mixin

### 认识 Mixin

- 目前我们是使用组件化的方式在开发整个 Vue 的应用程序，但是组件和组件之间有时候会存在相同的代码逻辑，我
  们希望对相同的代码逻辑进行抽取。
- 在 Vue2 和 Vue3 中都支持的一种方式就是使用 Mixin 来完成：
  - Mixin 提供了一种非常灵活的方式，来**分发 Vue 组件中的可复用功能**；
  - 一个 Mixin 对象可以包含**任何组件选项**；
  - 当组件使用 Mixin 对象时，所有**Mixin 对象的选项将被 混合 进入该组件本身的选项中**；

### Mixin 的基本使用

```js
// mixins/demoMixin.js
export const demoMixin = {
  data() {
    return {
      title: "Hello World",
    };
  },
  methods: {
    say() {
      console.log("Hello Mixin");
    },
  },
  created() {
    console.log("执行了demoMixin的created");
  },
};
```

```vue {9,11}
<template>
  <div>
    <h2>{{ title }}</h2>
    <button @click="say">按钮</button>
  </div>
</template>

<script>
import { demoMixin } from "./mixins/demoMixin";
export default {
  mixins: [demoMixin],
};
</script>

<style scoped></style>
```

![](/frontEnd/frame/vue/63.png)

### Mixin 的合并规则

- 如果 Mixin 对象中的选项和组件对象中的选项发生了冲突，那么 Vue 会如何操作呢？
  - 这里**分成不同的情况**来进行处理；
- 情况一：如果是 data 函数的返回值对象
  - 返回值对象默认情况下会**进行合并**；
  - 如果 data 返回值对象的属性发生了冲突，那么会**保留组件自身的数据**；
- 情况二：如何生命周期钩子函数
  - 生命周期的钩子函数**会被合并到数组**中，都会被调用；
- 情况三：值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。
  - 比如都有**methods 选项**，并且都定义了方法，那么**它们都会生效**；
  - 但是如果**对象的 key 相同**，那么**会取组件对象的键值对**；

```js
// mixins/demoMixin.js
export const demoMixin = {
  data() {
    return {
      title: "Hello World",
    };
  },
  methods: {
    say() {
      console.log("Hello Mixin");
    },
  },
  created() {
    console.log("执行了demoMixin的created");
  },
};
```

```vue
<template>
  <div>
    <h2>{{ title }}</h2>
    <button @click="say">按钮</button>
  </div>
</template>

<script>
import { demoMixin } from "./mixins/demoMixin";
export default {
  mixins: [demoMixin],
  data() {
    return {
      title: "Hello CodeTao",
    };
  },
  created() {
    console.log("执行了App的created");
  },
  methods: {
    say() {
      console.log("Hello CodeTao");
    },
  },
};
</script>

<style scoped></style>
```

![](/frontEnd/frame/vue/64.png)

### 全局混入 Mixin

- 如果组件中的某些选项，是所有的组件都需要拥有的，那么这个时候我们可以使用**全局的 mixin**：
  - 全局的 Mixin 可以使用 **应用 app 的方法 mixin** 来完成注册；
  - 一旦注册，那么**全局混入的选项将会影响每一个组件**；

```js
const app = createApp(App);

app.mixin({
  data() {
    return {};
  },
  created() {
    console.log("执行全局mixin的created");
  },
});

app.mount("#app");
```

![](/frontEnd/frame/vue/65.png)

## extends

- 另外一个类似于 Mixin 的方式是通过 extends 属性：
  - 允许声明扩展另外一个组件，**类似于 Mixins**；

```vue
// extends/basePage.vue
<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      name: "codertao",
    };
  },
  methods: {
    say() {
      console.log("Hello World");
    },
  },
};
</script>

<style scoped></style>
```

```vue
<template>
  <div>
    <p>{{ name }}</p>
    <button @click="say">按钮</button>
  </div>
</template>

<script>
import basePage from "./extends/basePage.vue";
export default {
  extends: basePage,
};
</script>

<style scoped></style>
```

![](/frontEnd/frame/vue/66.png)

:::tip
在开发中 extends 用的非常少，在 Vue2 中比较推荐大家使用 **Mixin**，而在 Vue3 中推荐使用 **Composition API**。
:::

## Composition API

### Options API 的弊端

- 在 Vue2 中，我们编写组件的方式是 Options API：
  - Options API 的一大特点就是在**对应的属性**中编写**对应的功能模块**；
  - 比如 **data 定义数据、methods 中定义方法、computed 中定义计算属性、watch 中监听属性改变**，也包括**生命周期钩子**；
- 但是这种代码有一个很大的弊端：
  - 当我们**实现某一个功能**时，这个功能**对应的代码逻辑**会被**拆分到各个属性**中；
  - 当我们**组件变得更大、更复杂**时，**逻辑关注点的列表**就会增长，那么**同一个功能的逻辑就会被拆分的很分散**；
  - 尤其对于那些一开始没**有编写这些组件的人**来说，这个组件的代码是**难以阅读和理解**的（阅读组件的其他人）；
- 下面我们来看一个非常大的组件，其中的逻辑功能按照颜色进行了划分：
  - 这种**碎片化的代码**使用**理解和维护这个复杂的组件**变得异常困难，并且**隐藏了潜在的逻辑问题**；
  - 并且当我们**处理单个逻辑关注点**时，需要不断的**跳到相应的代码**块中；

### 大组件的逻辑分散

![](/frontEnd/frame/vue/67.png)

- 如果我们能将**同一个逻辑关注点相关的代码** 收集**在一起**会更
  好。
- 这就是 Composition API 想
  要做的事情，以及可以帮助我
  们完成的事情。
- 也有人把 Vue Composition
  API 简称为**VCA**。

### 认识 Composition API

- 那么既然知道 Composition API 想要帮助我们做什么事情，接下来看一下到底是怎么做呢？
  - 为了开始使用 Composition API，我们需要有一个可以实际使用它 **（编写代码的地方**；
  - 在 Vue 组件中，这个位置就是 **setup 函数**；
- setup 其实就是组件的另外一个选项：
  - 只不过这个选项强大到我们可以**用它来替代之前所编写的大部分其他选项**；
  - 比如**methods、computed、watch、data、生命周期**等等；
- 接下来我们一起学习这个函数的使用：
  - 函数的参数
  - 函数的返回值

### setup 函数的参数

- 我们先来研究一个 setup 函数的参数，它主要有两个参数：
  - 第一个参数：**props**
  - 第二个参数：**context**
- props 非常好理解，它其实就是父组件传递过来的属性会被放到 props 对象中，我们在 setup 中如果需要使用，那么就可
  以直接通过 props 参数获取：
  - 对于**定义 props 的类型**，我们还是**和之前的规则是一样的，在 props 选项中定义**；
  - 并且**在 template 中**依然是可以**正常去使用 props 中的属性**，比如 message；
  - 如果我们**在 setup 函数中想要使用 props**，那么**不可以通过 this 去获取**（后面我会讲到为什么）；
  - 因为 props 有直接**作为参数传递到 setup 函数**中，所以我们可以**直接通过参数**来使用即可；
- 另外一个参数是 context，我们也称之为是一个 SetupContext，它里面包含三个属性：
  - **attrs**：所有的非 prop 的 attribute；
  - **slots**：父组件传递过来的插槽（这个在以渲染函数返回时会有作用，后面会讲到）；
  - **emit**：当我们组件内部需要发出事件时会用到 emit（因为我们不能访问 this，所以不可以通过 this.\$emit 发出事件）；
