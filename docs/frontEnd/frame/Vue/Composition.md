---
title: Composition
autoPrev: animation
sidebarDepth: 3
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
