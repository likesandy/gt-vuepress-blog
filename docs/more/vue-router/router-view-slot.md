# `router-view` 的 `v-slot`

`router-view` 暴露了一个 `v-slot` API，主要使用 `transition` 和 `keep-alive`组件来包裹你的路由组件。

```html
<router-view v-slot="props">
  <keep-alive>
    <transition name="tao">
      <component :is="props.Component"></component>
    </transition>
  </keep-alive>
</router-view>
```

```css
.tao-enter-from,
.tao.leave-to {
  opacity: 0;
}

.tao-enter-active,
.tao-leave-active {
  transition: opacity 1s ease;
}
```

- Component: 要传递给 `component` 的 VNodes 是 prop。

- route: 解析出的标准化路由地址。

![](/frame/vue/114.gif)
