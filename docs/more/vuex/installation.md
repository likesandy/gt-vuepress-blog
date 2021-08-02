---
title: 介绍
sidebarDepth: 0
---

# 安装


```sh
# vue3
npm install vuex --save
```

```sh
# vuex4
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

![](/more/vuex/1.png)
