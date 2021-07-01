---
title: Provide / Inject
sidebarDepth: 3
---

# Provide / Inject

## 设想场景

假设我们要重写以下代码，其中包含一个 HelloWorld 组件，该组件使用组合式 API 为 MyMarker 组件提供 title 和 info。

```vue
<template>
  <div>
    <hello-world />
  </div>
</template>

<script>
import HelloWorld from "./HelloWorld.vue";
export default {
  components: {
    HelloWorld,
  },
  provide: {
    title: "Hello World",
    info: {
      name: "tao",
      age: 19,
    },
  },
};
</script>
```

```vue
<template>
  <div>
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  inject: ["title", "info"],
};
</script>
```

## 使用 Provide

在 `setup` 中使用 `provide` 时，我们首先从 `vue` 显式导入 `provide` 方法。这使我们能够调用 `provide` 来定义每个 property。

`provide` 函数允许你通过两个参数定义 property：

- key: string | number
- value

在 `Composition API` 中可以通过如下方式进行重构:

```vue {8,15-20}
<template>
  <div>
    <hello-world />
  </div>
</template>

<script>
import { provide } from "vue";
import HelloWorld from "./HelloWorld.vue";
export default {
  components: {
    HelloWorld,
  },
  setup() {
    provide(84, 20);
    provide("title", "Hello World");
    provide("info", {
      name: "tao",
      age: 19,
    });
  },
};
</script>
```

## 使用 inject

在 `setup` 中使用 `inject` 时，也需要从 `vue` 显式导入。导入以后，我们就可以调用它来定义暴露给我们的组件方式。

`inject` 函数有两个参数：

- key: string
- defaultValue(可选)

在 `Composition API` 中可以通过如下方式进行重构:

```vue {10,13-15}
<template>
  <div class="app">
    <h2>{{ id }}</h2>
    <h2>{{ title }}</h2>
    <h2>{{ info.name }}-{{ info.age }}</h2>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const id = inject("84");
    const title = inject("title", "123");
    const info = inject("info");
    return {
      id,
      title,
      info,
    };
  },
};
</script>

<style scoped>
.app {
  width: 200px;
  width: 200px;
  margin: 0 auto;
}
</style>
```

![](/frame/vue/93.png)

## 响应式

### 添加响应性

为了增加 `provide` 值和 `inject` 值之间的响应性，我们可以在 `provide` 值时使用 `ref` 或 `reactive`.

```vue {8,16-19}
<template>
  <div>
    <hello-world />
  </div>
</template>

<script>
import { provide, ref, reactive } from "vue";
import HelloWorld from "./HelloWorld.vue";
export default {
  components: {
    HelloWorld,
  },
  setup() {
    const title = ref("Hello World");
    const info = reactive({
      name: "tao",
      age: 19,
    });
    provide("title", title);
    provide("info", info);
  },
};
</script>
```

### 修改响应式 property

一般的话我们应该会这样做

```vue {11,14,15}
<template>
  <div class="app">
    <h2>{{ title }}</h2>
    <h2>{{ info.name }}-{{ info.age }}</h2>
    <button @click="changeTitle">changeTitle</button>
    <button @click="ageIncrement">info.age+1</button>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const title = inject("title");
    const info = inject("info");
    const changeTitle = () => {
      title.value = "Hello setup";
    };
    const ageIncrement = () => {
      info.age++;
    };
    return {
      title,
      info,
      changeTitle,
      ageIncrement,
    };
  },
};
</script>

<style scoped>
.app {
  width: 200px;
  width: 200px;
  margin: 0 auto;
}
</style>
```

上面的情况是我们接收到了 `Provide` 传递过来的数据,然后直接修改数据

但是这种行为是不好的,这有点像是 `props`,我们拿到了别人传递过来的东西,但是不能直接对其进行修改,只能使用传递过来的数据(**单向数据流原则**)

:::warning
当使用响应式 `provide` / `inject` 值时，**建议**尽可能将对响应式 property 的所有修改限制在定义 `provide` 的组件内部。
:::

所以我们最好在 `provide` 组件中这样做:

```vue {20-25,28,29}
<template>
  <div>
    <hello-world />
  </div>
</template>

<script>
import { provide, ref, reactive } from "vue";
import HelloWorld from "./HelloWorld.vue";
export default {
  components: {
    HelloWorld,
  },
  setup() {
    const title = ref("Hello World");
    const info = reactive({
      name: "tao",
      age: 19,
    });
    const changeTitle = () => {
      title.value = "Hello setup";
    };
    const ageIncrement = () => {
      info.age++;
    };
    provide("title", title);
    provide("info", info);
    provide("changeTitle", changeTitle);
    provide("ageIncrement", ageIncrement);
  },
};
</script>
```

```vue {16,17}
<template>
  <div class="app">
    <h2>{{ title }}</h2>
    <h2>{{ info.name }}-{{ info.age }}</h2>
    <button @click="changeTitle">changeTitle</button>
    <button @click="ageIncrement">info.age+1</button>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const title = inject("title");
    const info = inject("info");
    const changeTitle = inject("changeTitle");
    const ageIncrement = inject("ageIncrement");
    return {
      title,
      info,
      changeTitle,
      ageIncrement,
    };
  },
};
</script>

<style scoped>
.app {
  width: 200px;
  width: 200px;
  margin: 0 auto;
}
</style>
```

最后，如果要确保通过 `provide` 传递的数据不会被 `inject` 的组件更改，我们建议对提供者的 property 使用 `readonly`。

```vue {26,27}
<template>
  <div>
    <hello-world />
  </div>
</template>

<script>
import { provide, ref, reactive, readonly } from "vue";
import HelloWorld from "./HelloWorld.vue";
export default {
  components: {
    HelloWorld,
  },
  setup() {
    const title = ref("Hello World");
    const info = reactive({
      name: "tao",
      age: 19,
    });
    const changeTitle = () => {
      title.value = "Hello setup";
    };
    const ageIncrement = () => {
      info.age++;
    };
    provide("title", readonly(title));
    provide("info", readonly(info));
    provide("changeTitle", changeTitle);
    provide("ageIncrement", ageIncrement);
  },
};
</script>
```

```vue {19-21}
<template>
  <div class="app">
    <h2>{{ title }}</h2>
    <h2>{{ info.name }}-{{ info.age }}</h2>
    <button @click="changeTitle">changeTitle</button>
    <button @click="ageIncrement">info.age+1</button>
    <button @click="infoAgeIncrement">info.age+1</button>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const title = inject("title");
    const info = inject("info");
    const changeTitle = inject("changeTitle");
    const ageIncrement = inject("ageIncrement");
    const infoAgeIncrement = () => {
      info.age++;
    };
    return {
      title,
      info,
      changeTitle,
      ageIncrement,
      infoAgeIncrement,
    };
  },
};
</script>

<style scoped>
.app {
  width: 200px;
  width: 200px;
  margin: 0 auto;
}
</style>
```

![](/frame/vue/94.gif)
