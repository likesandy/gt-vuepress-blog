---
title: 响应式基础
sidebarDepth: 3
---

## 声明响应式状态

要为 JavaScript 对象创建响应式状态，可以使用 `reactive` 方法：

```js
import { reactive } from "vue";
export default {
  setup() {
    const info = reactive({
      name: "tao",
      age: 19,
    });
  },
};
```

该 API 返回一个响应式的对象状态。该响应式转换是“深度转换”——它会影响嵌套对象传递的所有 property。

Vue 中响应式状态的基本用例是我们可以在渲染期间使用它。因为依赖跟踪的关系，当响应式状态改变时视图会自动更新。

这就是 Vue 响应性系统的本质。当从组件中的 `data` 返回一个对象时，它在内部交由 `reactive` 使其成为响应式对象。模板会被编译成能够使用这些响应式 property 的渲染函数。

## 创建独立的响应式值作为 refs

想象一下，我们有一个独立的原始值 (例如，一个字符串)，我们想让它变成响应式的。当然，我们可以创建一个拥有相同字符串 property 的对象，并将其传递给 `reactive`。Vue 为我们提供了一个可以做相同事情的方法——`ref`：

```js
import { ref } from "vue";
export default {
  setup() {
    const info = ref({
      name: "tao",
      age: 19,
    });
  },
};
```

`ref` 会返回一个可变的响应式对象，该对象作为一个**响应式**的引用维护着它内部的值，这就是 `ref` 名称的来源。该对象只包含一个名为 value 的 property：

```vue
<template>
  <div>
    <h2>当前计数:{{ count.value }}</h2>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const count = ref(0);
    const increment = () => {
      count.value++;
    };
    return {
      count,
      increment,
    };
  },
};
</script>
```

### Ref 解包

当 `ref` 作为渲染上下文 (从 `setup` 中返回的对象) 上的 property 返回并可以在**模板**中被访问时，它将自动浅层次解包内部值。只有访问嵌套的 `ref` 时需要在模板中添加 .value：

```html {2,4}
<div>
  <h2>当前计数:{{ count }}</h2>
  <button @click="increment">+1</button>
  <p>{{ info.name.value }}</p>
</div>
```

```js {6-8}
import { ref } from "vue";
export default {
  setup() {
    const count = ref(0);
    const name = ref("tao");
    const info = {
      name,
    };
    const increment = () => {
      count.value++;
    };
    return {
      count,
      info,
      increment,
    };
  },
};
```

如果你不需要访问实际的对象实例，可将其用 `reactive` 包裹:

```html
<p>{{ info.name }}</p>
```

```js
const info = reactive({
  name,
});
```

![](/frame/vue/95.gif)

### 访问响应式对象

当 `ref` 作为响应式对象的 property 被访问或更改时，为使其行为类似于普通 property，它会自动解包内部值:

```js
const name = ref("tao");
const info = reactive({
  name,
});
console.log(info.name.value); // undefined
console.log(info.name); // tao
```

如果将新的 `ref` 赋值给现有 `ref` 的 property，将会替换旧的 ref：

```js
const name = ref("tao");
const me = ref("codertao");
const info = reactive({
  name,
});
info.name = me;
console.log(info.name); // codertao
```

`Ref` 解包仅发生在被响应式 Object 嵌套的时候。当从 Array 或原生集合类型如 Map 访问 `ref` 时，不会进行解包：

```js
const books = reactive([ref("Vue 3 Guide")]);
console.log(books[0].value);

const map = reactive(new Map([["count", ref(0)]]));
console.log(map.get("count").value);
```

## 响应式状态解构

当我们想使用大型响应式对象的一些 property 时，可能很想使用 ES6 解构来获取我们想要的 property：

```js
const info = reactive({
  name: "tao",
  age: 19,
  height: 185,
});
let { name, age } = info;
name = "sandy";
console.log(name); // sandy
console.log(info.name); // tao
```

遗憾的是，使用解构的两个 property 的响应性都会丢失。对于这种情况，我们需要将我们的响应式对象转换为一组 `ref`。这些 `ref` 将保留与源对象的响应式关联:

```js
const info = reactive({
  name: "tao",
  age: 19,
  height: 185,
});
let { name, age } = toRefs(info);
name.value = "sandy";
console.log(name.value); // sandy
console.log(info.name); // sandy
```

## 使用 `readonly` 防止更改响应式对象

有时我们想跟踪响应式对象 (`ref` 或 `reactive`) 的变化，但我们也希望防止在应用程序的某个位置更改它。例如，当我们有一个被 provide 的响应式对象时，我们不想让它在注入的时候被改变。为此，我们可以基于原始对象创建一个**只读**的 proxy 对象：

```html
<div class="app">
  <h2>当前计数:{{ count }}</h2>
  <button @click="countIncrement">+1</button>
  <button @click="copyIncrement">+1</button>
</div>
```

```js
import { ref, readonly } from "vue";
const count = ref(0);
const copy = readonly(count);
const countIncrement = () => {
  count.value++;
};
const copyIncrement = () => {
  copy.value++;
};
return {
  count,
  copy,
  countIncrement,
  copyIncrement,
};
```

![](/frame/vue/96.gif)
