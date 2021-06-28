---
title: transition
autoGroup-3: 动画
---

## 认识动画

- 在开发中，我们想要给一个组件的显示和消失添加某种过渡动画，可以很好的增加用户体验：
  - React 框架本身并**没有提供任何动画相关的 API**，所以在 React 中使用过渡动画我们需要使用一个**第三方库 react-transition-group**；
  - Vue 中为我们提供**一些内置组件和对应的 API**来完成动画，利用它们我们可以**方便的实现过渡动画效果**；
- 我们来看一个案例：
  - Hello World 的显示和隐藏；
  - 通过下面的代码实现，是不会有任何动画效果的；

```vue
<template>
  <div>
    <button @click="handover">切换</button>
    <h2 v-if="isShow">Helo World</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    handover() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style scoped></style>
```

- 没有动画的情况下，整个内容的显示和隐藏会非常的生硬：
  - 如果我们希望给**单元素或者组件实现过渡动画**，可以**使用 transition 内置组件**来完成动画；

## Vue 的 transition 动画

- Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡：
  - 条件渲染 (使用 v-if)条件展示 (使用 v-show)
  - 动态组件
  - 组件根节点

```vue
<template>
  <div>
    <button @click="handover">切换</button>

    <transition name="tao">
      <h2 v-if="isShow">Helo World</h2>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    handover() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style scoped>
.tao-enter-from,
.tao-leave-to {
  opacity: 0;
}
.tao-enter-to,
.tao-leave-from {
  opacity: 1;
}
.tao-enter-active,
.tao-leave-active {
  transition: opacity 500ms ease;
}
</style>
```

![](/frame/vue/55.gif)

## transition 组件的原理

- 我们会发现，Vue 自动给 h2 元素添加了动画，这是什么原因呢？
- 当插入或删除包含在 transition 组件中的元素时，Vue 将会做以下处理：
  - 自动嗅探**目标元素是否应用了 CSS 过渡或者动画**，如果有，那么**在恰当的时机添加/删除 CSS 类名**；
  - 如果 transition 组件提供了**JavaScript 钩子函数**，这些钩子函数将在恰当的时机被调用；
  - 如果**没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 插入、删除操作将会立即执行**；
- 那么都会添加或者删除哪些 class 呢？
