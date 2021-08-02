# `router-link` 的 `v-slot`

`router-link` 通过一个作用域插槽暴露底层的定制能力。这是一个更高阶的 API

:::tip 提示
一般开发的话如果使用路由编程式导航的话,这个高级 API 可能会用不上,但是也可以做一下了解
:::

插槽中的 props 有很多值,这里就列举一些简单的,具体还需查看文档

- href：解析后的 URL

- navigate：触发导航的函数

```html
<router-link to="/home" v-slot="props">
  <button @click="props.navigate">{{ props.href }}</button>
  <button @click="props.navigate">呵呵呵</button>
</router-link>
```

![](/frame/vue/112.gif)

页面也是可以跳转的,但是我们发现 router-link 还是被 a 元素包住了,本质上还是 a 元素触发了事件,但是如果想自定义,渲染两个按钮的话可以添加一个 custom 属性

```html
<router-link to="/home" v-slot="props" custom>
  <button @click="props.navigate">{{ props.href }}</button>
  <button @click="props.navigate">呵呵呵</button>
</router-link>
```

![](/frame/vue/113.png)
