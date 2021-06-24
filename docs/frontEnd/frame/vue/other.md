---
title: 其它
---

## render

### 认识 h 函数

- Vue 推荐在绝大数情况下使用模板来创建你的 HTML，然后一些特殊的场景，你真的需要 JavaScript 的完全编程的
  能力，这个时候你可以使用 渲染函数 ，它比模板更接近编译器；
  - 前面我们讲解过 **VNode** 和 **VDOM** 的改变：
  - Vue 在生成真实的 DOM 之前，会将**我们的节点转换成 VNode**，而 VNode 组合在一起形成**一颗树结构**，就是**虚拟 DOM（VDOM）**；
  - 事实上，我们之前编写的 template 中的 HTML 最终也是**使用渲染函数**生成**对应的 VNode**；
  - 那么，如果你想充分的利用 JavaScript 的编程能力，我们可以自己来**编写 createVNode 函数**，生成**对应的 VNode**；
- 那么我们应该怎么来做呢？使用 h()函数：
  - **h() 函数**是一个用于**创建 vnode 的一个函数**；
  - 其实更准备的命名是 **createVNode() 函数**，但是为了简便在 Vue 将之**简化为 h() 函数**；

#### h()函数 如何使用呢？

h()函数 如何使用呢？它接受三个参数：

![](/frontEnd/frame/vue/81.png)

```js
h("div", {}, [
  "Some text comes first.",
  h("h1", "A headline"),
  h(MyComponent, {
    someProp: "foobar",
  }),
]);
```

- 注意事项：
  - 如果**没有 props**，那么通常可以**将 children 作为第二个参数传入**；
  - 如果会产生歧义，可以**将 null 作为第二个参数传入**，将**children 作为第三个参数传入**；

### h 函数的基本使用

- h 函数可以在两个地方使用：
- **render** 函数选项中；
- **setup** 函数选项中（setup 本身需要是一个函数类型，函数再返回 h 函数创建的 VNode）；

```js
<script>
import { h } from "vue";
export default {
  render() {
    return h("h2", { class: "title" }, "Hello World");
  },
};
</script>
```

```js
<script>
import { h, ref } from "vue";
export default {
  setup() {
    let counter = ref(0);
    return () => {
      return h("div", { class: "app" }, [
        h("h2", null, `当前计数:${counter.value}`),
        h("button", { onclick: () => counter.value++ }, "+1"),
        h("button", { onclick: () => counter.value-- }, "-1"),
      ]);
    };
  },
};
</script>
```

### 函数组件和插槽的使用

```js
<script>
import { h } from "vue";
import Home from "./Home.vue";
export default {
  render() {
    return h(
      Home,
      {},
      {
        default: (props) => h("p", {}, `我是App传给Home的内容:${props.name}`),
      }
    );
  },
};
</script>
```

```js
<script>
import { h } from "vue";
export default {
  render() {
    return h("div", {}, [
      h("h2", {}, "Hello World"),
      this.$slots.default
        ? this.$slots.default({ name: "tao" })
        : h("p", {}, "我是Home默认的值"),
    ]);
  },
};
</script>

```

## jsx

```vue
<script lang="jsx">
import { ref, defineComponent } from "vue";
import Home from "./Home.jsx";
export default defineComponent({
  setup() {
    let counter = ref(0);
    const increment = () => counter.value++;
    const decrement = () => counter.value--;
    return () => (
      <div>
        <h2>当前计数:{counter.value}</h2>
        <button onclick={increment}>+1</button>
        <button onclick={decrement}>-1</button>
        <Home>{{ default: (props) => <button>按钮</button> }}</Home>
      </div>
    );
  },
});
</script>
```

```jsx
import { defineComponent } from "vue";
export default defineComponent({
  render() {
    return (
      <div>
        <h2>Home</h2>
        {this.$slots.default ? this.$slots.default() : <span>默认内容</span>}
      </div>
    );
  },
});
```
