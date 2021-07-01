---
title: Setup
---

## 参数

- props
- context

### Props

`props` 非常好理解，它其实就是父组件传递过来的属性会被放到 `props` 对象中，我们在 `setup` 中如果需要使用，那么就可
以直接通过 `props` 参数获取

```js
export default {
  props: {
    title: String,
  },
  setup(props) {
    console.log(props.title);
  },
};
```

::: warning 警告
但是，因为 `props` 是响应式的，你不能使用 ES6 解构，它会消除 `prop` 的响应性。
:::

如果需要解构`props`，可以在 `setup` 函数中使用 `toRefs` 函数来完成此操作：

```js {1,7}
import { toRefs } from "vue";
export default {
  props: {
    title: String,
  },
  setup(props) {
    const { title } = toRefs(props);
    console.log(title.value);
  },
};
```

如果 title 是可选的 prop，则传入的 `props` 中可能没有 title 。在这种情况下，`toRefs` 将不会为 title 创建一个 ref 。你需要使用 `toRef` 替代它

```js {1,7}
import { toRef } from "vue";
export default {
  props: {
    title: String,
  },
  setup(props) {
    const title = toRef(props, "title");
    console.log(title.value);
  },
};
```

### Context

#### 参数

- `attrs`
  - 所有的非 prop 的 attribute
- `slots`
  - 父组件传递过来的插槽
- `emit`
  - 当我们组件内部需要发出事件时会用到 emit

`context` 是一个普通的 `JavaScript` 对象，一般我们称之为是一个 `SetupContext`，它不是响应式的，这意味着你可以安全地对 `context` 使用 ES6 解构。

```js
export default {
  setup(props, { attrs, slots, emit }) {
    ...
  }
}
```

`attrs` 和 `slots` 是有状态的对象，它们总是会随组件本身的更新而更新。这意味着你应该==避免==对它们进行解构，并始终以 attrs.x 或 slots.x 的方式引用 property。请注意，与 props 不同，`attrs` 和 `slots` 是 ==非响应式== 的。如果你打算根据 `attrs` 或 `slots` 更改应用副作用，那么应该在 onUpdated 生命周期钩子中执行此操作

对于一个定义的变量(非响应式)来说，默认情况下，Vue 并不会跟踪它的变化，来引起界面的响应式操作

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

ref 接收参数并将其包裹在一个带有 `value property` 的对象中返回，然后可以使用该 `property` 访问或更改响应式变量的值：

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

将值封装在一个对象中，看似没有必要，但为了保持 `JavaScript` 中不同数据类型的行为统一，这是必须的。这是因为在 `JavaScript` 中，`Number` 或 `String` 等基本类型是通过值而非引用传递的：

![](/frame/vue/92.gif)

:::tip 提示
换句话说，`ref` 为我们的值创建了一个响应式引用。在整个组合式 API 中会经常使用引用的概念。
:::

## 访问组件的 property

执行 `setup` 时，组件实例尚未被创建。因此，你只能访问以下 `property`：

- `props`

- `attrs`

- `slots`

- `emit`

换句话说，你将无法访问以下组件选项：

- `data`

- `computed`

- `methods`

:::tip 提示
因为`setup`生命周期是在`beforcreate`之前就会进行回调,所以那个时候组件还没创建出来,自然无法访问组件中的`property`
:::

## 结合模板使用

setup 的返回值可以在模板 `template` 中被使用,也就是说我们可以通过 `setup` 的返回值来替代 `data` 选项；

甚至是我们可以返回一个执行函数来代替在 `methods` 中定义的方法

```html
<template>
  <div>
    <h2>当前计数:{{ counter }}</h2>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>
```

```js
export default {
  setup() {
    let counter = 0;
    const increment = () => counter++;
    const decrement = () => counter--;
    return {
      counter,
      increment,
      decrement,
    };
  },
};
```

注意，从 `setup` 返回的 `refs` 在模板中访问时是被自动浅解包的，因此不应在模板中使用 .value。

```html
<template>
  <div>
    <!-- <h2>当前计数:{{ counter.value }}</h2> -->
    <h2>当前计数:{{ counter }}</h2>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>
```

```js {1,6,9}
import { ref } from "vue";
export default {
  setup() {
    const counter = ref(0);
    const increment = () => {
      counter.value++;
    };
    const decrement = () => {
      counter.value--;
    };
    return {
      counter,
      increment,
      decrement,
    };
  },
};
```

## 使用渲染函数

`setup` 还可以返回一个渲染函数，该函数可以直接使用在同一作用域中声明的响应式状态：

```js
import { h, ref, reactive } from "vue";

export default {
  setup() {
    const readersNumber = ref(0);
    const book = reactive({ title: "Vue 3 Guide" });
    // 请注意这里我们需要显式调用 ref 的 value
    return () => h("div", [readersNumber.value, book.title]);
  },
};
```

## 使用 `this`

::: warning
在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例。`setup` 的调用发生在 `data` property、`computed` property 或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取。
:::

我理解为 `setup` 中没有像 `data` 和 `methods` 那样绑定 this,所以 `setup` 中的 this 为是 `undefined`
