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

![](/frame/vue/81.png)

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

## 自定义指令

:books:[Vue2 自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)

:books:[Vue3 自定义指令](https://v3.cn.vuejs.org/guide/migration/custom-directives.html#%E6%A6%82%E8%A7%88)

- 在 Vue 的模板语法中我们学习过各种各样的指令：v-show、v-for、v-model 等等，除了使用这些指令之外，Vue
  也允许我们来自定义自己的指令。
  - 注意：在 Vue 中，**代码的复用和抽象主要还是通过组件**；
  - 通常在某些情况下，你需要**对 DOM 元素进行底层操作**，这个时候就会用到**自定义指令**；
- 自定义指令分为两种：
  - **自定义局部指令**：组件中通过 **directives** 选项，只能在当前组件中使用；
  - **自定义全局指令**：app 的 **directive** 方法，可以在任意组件中被使用；
- 比如我们来做一个非常简单的案例：当某个元素挂载完成后可以自定获取焦点
  - 实现方式一：如果我们使用**默认的实现方式**；
  - 实现方式二：自定义一个 **v-focus 的局部指令**；
  - 实现方式三：自定义一个 **v-focus 的全局指令**；

**默认实现**

```vue
<template>
  <div>
    <input type="text" ref="inputRef" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    const inputRef = ref(null);

    onMounted(() => {
      inputRef.value.focus();
    });

    return {
      inputRef,
    };
  },
};
</script>

<style scoped></style>
```

**局部指令**

- 这个**自定义指令**实现非常简单，我们只需要在**组件选项**中使用 **directives** 即可；
- 它是一个对象，在对象中编写我们**自定义指令的名称**（注意：这里不需要加 v-）；
- 自定义指令有一个生命周期，是**在组件挂载后调用的 mounted**，我们可以在其中完成操作；

```vue
<template>
  <div>
    <input type="text" v-focus />
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      mounted(el) {
        el.focus();
      },
    },
  },
};
</script>

<style scoped></style>
```

**自定义全局指令**

```js
const app = createApp(App);

app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});
```

### 指令的生命周期

- 一个指令定义的对象，Vue 提供了如下的几个钩子函数：
  - **created**：在绑定元素的 attribute 或事件监听器被应用之前调用；
  - **beforeMount**：当指令第一次绑定到元素并且在挂载父组件之前调用；
  - **mounted**：在绑定元素的父组件被挂载后调用；
  - **beforeUpdate**：在更新包含组件的 VNode 之前调用；
  - **updated**：在包含组件的 VNode 及其子组件的 VNode 更新后调用；
  - **beforeUnmount**：在卸载绑定元素的父组件之前调用；
  - **unmounted**：当指令与元素解除绑定且父组件已卸载时，只调用一次；

### 指令的参数和修饰符

- 如果我们指令需要接受一些参数或者修饰符应该如何操作呢？
  - info 是参数的名称；
  - aaa-bbb 是修饰符的名称；
  - 后面是传入的具体的值；
- 在我们的生命周期中，我们可以通过 bindings 获取到对应的内容：

```html
<button v-tao:info.aaa.bbb="'codertao'">-1</button>
```

```js
console.log(el);
console.log(binding.arg);
console.log(binding.value);
console.log(binding.modifiers);
console.log(vnode);
console.log(prevVNode);
```

![](/frame/vue/82.png)

### 自定义指令练习

- 自定义指令案例：时间戳的显示需求：
  - 在开发中，大多数情况下从**服务器**获取到的都是**时间戳**；
  - 我们需要**将时间戳转换成具体格式化的时间**来展示；
  - 在 Vue2 中我们可以**通过过滤器**来完成；
  - 在 Vue3 中我们可以通过 **计算属性**（computed） 或者 自定义一个**方法**（methods） 来完成；
  - 其实我们还可以通过一个**自定义的指令**来完成；
- 我们来实现一个可以自动对时间格式化的指令 v-format-time：
  - 这里我封装了一个函数，在首页中我们只需要**调用这个函数**并且**传入 app**即可；

```vue
<template>
  <div>
    <h2 v-format-time="'YYYY-MM-DD'">{{ timestamp }}</h2>
  </div>
</template>

<script>
export default {
  setup() {
    const timestamp = 1624581076983;
    return {
      timestamp,
    };
  },
};
</script>

<style scoped></style>
```

```js
import day from "dayjs";

export default function(app) {
  let format = "YYYY年M月DD日 h:m";
  app.directive("format-time", {
    created(el, bingings) {
      if (bingings.value) {
        format = bingings.value;
      }
    },
    mounted(el) {
      const textContent = el.textContent;
      let timestamp = parseInt(textContent);
      if (timestamp.length === 10) {
        timestamp = timestamp * 1000;
      }
      el.textContent = day(timestamp).format(format);
    },
  });
}
```

## Teleport

### 认识 Teleport

:books:[官方文档](https://v3.cn.vuejs.org/guide/teleport.html#%E4%B8%8E-vue-components-%E4%B8%80%E8%B5%B7%E4%BD%BF%E7%94%A8)

- 在组件化开发中，我们封装一个组件 A，在另外一个组件 B 中使用：
  - 那么**组件 A 中 template 的元素**，会**被挂载到组件 B 中 template** 的某个位置；
  - 最终我们的应用程序会形成一颗 DOM 树结构；
- 但是某些情况下，我们希望组件不是挂载在这个组件树上的，可能是移动到 Vue app 之外的其他位置：
  - 比如**移动到 body 元素**上，或者我们**有其他的 div#app 之外的元素上**；
  - 这个时候我们就可以**通过 teleport 来完成**；
- Teleport 是什么呢？
  - 它是一个 **Vue 提供的内置组件**，类似于 react 的 Portals；
  - teleport 翻译过来是心灵传输、远距离运输的意思；
    - 它有两个属性：
      - **to**：指定将其中的内容移动到的目标元素，可以使用选择器；
      - **disabled**：是否禁用 teleport 的功能；

```vue
<template>
  <div>
    <teleport to="#tao">
      <h2>Hello World</h2>
    </teleport>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
```

![](/frame/vue/83.png)

### 和组件结合使用

- 当然，teleport 也可以和组件结合一起来使用：
  - 我们可以在 teleport 中使用组件，并且也可以给他传入一些数据；

```html
<teleport to="#tao">
  <h2>Hello World</h2>
  <home :age="19" />
</teleport>
```

### 多个 teleport

如果我们将多个 teleport 应用到同一个目标上（to 的值相同），那么这些目标会进行合并

```html
<teleport to="#tao">
  <h2>Hello World</h2>
  <home :age="19" />
</teleport>
<teleport to="#tao">
  <p>多个teleport</p>
</teleport>
```

![](/frame/vue/84.png)

## 插件

### 认识 Vue 插件

- 通常我们向 Vue 全局添加一些功能时，会采用插件的模式，它有两种编写方式：
  - **对象**类型：一个对象，但是必须包含一个 install 的函数，该函数会在安装插件时执行；
  - **函数**类型：一个 function，这个函数会在安装插件时自动执行；
- 插件可以完成的功能没有限制，比如下面的几种都是可以的：
  - 添加全局方法或者 property，通过把它们添加到 config.globalProperties 上实现；
  - 添加全局资源：指令/过滤器/过渡等；
  - 通过全局 mixin 来添加一些组件选项；
  - 一个库，提供自己的 API，同时提供上面提到的一个或多个功能；

### 插件的编写方式

**对象类型的写法**

```js
// pluginObject.js
export default {
  install(app) {
    console.log(app);
  },
};
```

```js
// main.js
import pluginObject from "./05_插件/pluginObject";
app.use(pluginObject);
```

打印 app 对象

![](/frame/vue/85.png)

打印出了 app 对象说明是没有问题了,接下来我们来给 app 一个 name ,让其它的组件可以来访问它

```js
// pluginObject.js
export default {
  install(app) {
    app.config.globalProperties.name = "tao";
  },
};
```

我们在组件中来看一下是否能够拿到 app 的 name 属性

```js
// App.vue
<script>
export default {
  mounted() {
    console.log(this.name);
  },
};
</script>
```

![](/frame/vue/86.png)

这就表示代码是没有问题的,app 上有一个 name 属性,而且在任何组件上可以拿到 name 属性

但是有一个问题,这里通过 this.name 拿到 app 的 name,那么如果我们 data 中如果也有 name 怎么办

社区上有一个**约定俗成的规定**,一般在 app 上绑定的全局的属性或者方法,前面都要**加一个\$**

那么我们拿 app 的东西的话就是通过\$xx 的形式,那么就不会跟组件的其他数据产生冲突了

```js
// App.vue
export default {
  install(app) {
    // app.config.globalProperties.name = 'tao';
    app.config.globalProperties.$name = "tao";
  },
};
```

```js
// App.vue
<script>
export default {
  mounted() {
    console.log(this.$name);
  },
};
</script>
```

![](/frame/vue/86.png)

**函数类型的写法**

```js
// pluginFunction.js
export default function(app) {
  app.config.globalProperties.$age = 19;
}
```

```js
// main.js
import pluginFunction from "./05_插件/pluginFunction";
app.use(pluginFunction);
```

```js
// App.vue
<script>
export default {
  mounted() {
    console.log(this.$name);
    console.log(this.$age);
  },
};
</script>
```

![](/frame/vue/87.png)

上面是在 Options 中来使用 app 的东西

那么如果是在 Composition 中怎么使用 app 的东西

因为 setup 中是没有绑定 this 的,想在 setup 中使用 app 的东西需要导入一个函数

```js
import { getCurrentInstance } from "vue";
```

getCurrentInstance 顾名思义拿到当前组件实例,可能会想既然都拿到了组件实例,那么是不是就可以通过.$name的形式拿到实例的$name

```js
<script>
import { getCurrentInstance } from "vue";
export default {
  setup() {
    const instance = getCurrentInstance();
    console.log(instance.$name);
    console.log(instance.$age);
  },
};
</script>
```

![](/frame/vue/88.png)

这样是拿不到实例里的东西的,在 setup 中想要拿到实例里的东西是比在 Composition API 里面是更麻烦一点的

```js
<script>
import { getCurrentInstance } from "vue";
export default {
  setup() {
    const instance = getCurrentInstance();
    // console.log(instance.$name);
    // console.log(instance.$age);
    console.log(instance.appContext.config.globalProperties.$name);
    console.log(instance.appContext.config.globalProperties.$age);
  },
};
</script>
```

在 setup 中是要通过实例的 appContext(app 上下文 = app).config.globalProperties.xx 的形式来拿到的

很像我们在编写插件的时候格式

![](/frame/vue/89.png)
