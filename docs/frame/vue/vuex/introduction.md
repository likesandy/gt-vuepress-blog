---
title: 介绍
sidebarDepth: 0
---

## Vuex 的状态管理

管理不断变化的 `state` 本身是非常困难的：

- 状态之间相互会存在依赖，一个状态的变化会引起另一个状态的变化，View 页面也有可能会引起状态的变化；
- 当应用程序复杂时，`state` 在什么时候，因为什么原因而发生了变化，发生了怎么样的变化，会变得非常难以控
  制和追踪；

因此，我们是否可以考虑将组件的内部状态抽离出来，以一个全局单例的方式来管理呢？

- 在这种模式下，我们的组件树构成了一个巨大的 “视图 View”；
- 不管在树的哪个位置，任何组件都能获取状态或者触发行为；
- 通过定义和隔离状态管理中的各个概念，并通过强制性的规则来维护视图和状态间的独立性，我们的代码边会
  变得更加结构化和易于维护、跟踪;

这就是 Vuex 背后的基本思想，它借鉴了 Flux、Redux、Elm（纯函数语言，redux 有借鉴它的思想）：

![](/frame/vue/vuex/2.png)

## 安装

我们这里使用的是 vuex4.x，安装的时候需要添加 next 指定版本；

```sh
npm install vuex@next
```

## Vue devtool

vue 其实提供了一个 devtools，方便我们对组件或者 vuex 进行调试：

我们需要安装 beta 版本支持 vue3

- 可以科学上网的话[跳转下载界面](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=zh-CN)

- 不能科学上网的话[详情下载界面](https://chrome.zzzmh.cn/info?token=ljjemllljcmogpfapbkkighbhhppjdbg)

基本演示

```js
import { ref } from "vue";
let message = ref("Hello World");
let age = 19;
```

![](/frame/vue/vuex/3.png)
