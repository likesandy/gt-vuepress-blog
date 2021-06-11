---
title: 组件化开发
---

## 关于

本节组件化开发**使用 Vite** 进行开发,Vite 虽然现在还不是非常稳定,不适合企业开发,但是我们学习的时候做一些基本的功能还是没有什么问题的,而且 Vite 加载很快,使用的时候也很节省时间

## 认识组件的嵌套

- 前面我们是将所有的逻辑放到一个 App.vue 中：
  - 在之前的案例中，我们只是**创建了一个组件 App**；
  - 如果我们一个应用程序**将所有的逻辑都放在一个组件**中，那么这个组件就会变成**非
    常的臃肿和难以维护**；
  - 所以组件化的核心思想应该是**对组件进行拆分**，拆分成**一个个小的组件**；
  - 再**将这些组件组合嵌套在一起**，最终形成**我们的应用程序**；
- 我们来分析一下下面代码的嵌套逻辑，假如我们将所有的代码逻辑都放到一个 App.vue
  组件中：

  ![](/frontEnd/frame/vue/2.png)

  - 我们会发现，将所有的代码逻辑全部放到一个组件中，代码是非常的臃肿和难以维
    护的。
  - 并且在真实开发中，我们会有更多的内容和代码逻辑，对于扩展性和可维护性来说
    都是非常差的。
  - 所以，在真实的开发中，我们会对组件进行拆分，拆分成一个个功能的小组件。

## 组件的拆分

- 我们可以按照如下的方式进行拆分：

![](/frontEnd/frame/vue/3.png)

- 按照如上的拆分方式后，我们开发对应的逻辑只需要去对应的组件编写就可。

## 组件 css 的作用域

- 当我们在组件中 style 的样式添加了**scoped 属性**,表示当前的样式只存在于当前组件,不会影响其他组件的样式,拥有自己的**作用域**

```vue
<template>
  <div>
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello World",
    };
  },
};
</script>

<style scoped></style>
```

```vue
<template>
  <div>
    <h2>App</h2>
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "./HelloWorld.vue";
export default {
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
h2 {
  color: red;
}
</style>
```

![](/frontEnd/frame/vue/5.png)

这样是不是就验证了我的说法,设置了 scoped,样式就有了自己的作用域,但是这是 vue2 的写法,因为 vue2 每个组件都只能有一个根,但是 vue3 不一样,vue3 就取消掉了,可以有很多的根(内部还是会通过方法给在外部添加上唯一的根,只是我们写的时候可以不用写一个根),
vue3 可以有无数根,这就产生了某些问题了

比如下面这些代码

```vue
<template>
  <h2>{{ title }}</h2>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello World",
    };
  },
};
</script>

<style scoped></style>
```

```vue
<template>
  <h2>App</h2>
  <HelloWorld />
</template>

<script>
import HelloWorld from "./HelloWorld.vue";
export default {
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
h2 {
  color: red;
}
</style>
```

![](/frontEnd/frame/vue/1.png)

诶?这是为什么?我明明只在 App 组件中设置了样式,HelloWorld 组件中没有设置,为什么 HelloWorld 中会有样式

这是因为在 vue3 中我们可以有无数根,我们在外部就不用包裹一个 div 了,但是在 css 中就会出现问题

因为 scoped 属性的实现就是给标签添加了一些自定义的样式,父组件的样式属性编号会传递给一份子组件,那么这个子组件就有两个属性编号,自己的属性编号没有设置样式,但是父组件的属性编号设置了样式就会生效(相当于穿透给了子组件)

![](/frontEnd/frame/vue/6.png)

以前 vue2 中没有出现这种情况,是因为 vue2 在外部都会包裹一个根(一般是 div),父组件的样式属性编号就会传给子组件的根的属性编号,但是不会传递到子组件本身,所以就不会影响到子组件

![](/frontEnd/frame/vue/7.png)

:::danger
但是一般开发中我们是不会直接给一个标签设置样式的,一般通过一些 class 或者 id 来设置样式,直接用标签来设置很少
但是这也算是一种会出现的情况吧
感觉这个应该是个 bug,后期看官方会不会进行修复了
:::

## 组件的通信

- 上面的嵌套逻辑如下，它们存在如下关系：
  - App 组件是 Header、Main、Footer 组件的父组件；
- 在开发过程中，我们会经常遇到需要组件之间相互进行通信：
  - 比如**App 可能使用了多个 Heade**r，每个地方的**Header 展示的内容不同**，那么我们就需要使用者**传递给 Header 一些数据**，让其进行展示；
  - 又比如我们在 Main 中一次性**请求了 Banner 数据和 ProductList 数据**，那么就需要**传递给它们**来进行展示；
  - 也可能是**子组件中发生了事件**，需要**由父组件来完成某些操作**，那就需要**子组件向父组件传递事件**；
- 总之，在一个 Vue 项目中，组件之间的通信是非常重要的环节，所以接下来我们就具体学习一下组件之间是如何相
  互之间传递数据的；

### 父子组件之间通信的方式

- 父子组件之间如何进行通信呢？

  - 父组件传递给子组件：通过 **props 属性**；
  - 子组件传递给父组件：**通过\$emit 触发事件**；

![](/frontEnd/frame/vue/9.png)

### 父组件传递给子组件

- 在开发中很常见的就是父子组件之间通信，比如父组件有一些数据，需要子组件来进行展示：
  - 这个时候我们可以**通过 props 来完成组件之间的通信**；
- 什么是 Props 呢？
  - Props 是你可以在组件上**注册一些自定义的 attribute**；
  - 父组件给**这些 attribute 赋值，子组件通过 attribute 的名称获取到对应的值**；
- Props 有两种常见的用法：
  - 方式一：**字符串数组**，数组中的字符串就是 attribute 的名称；
  - 方式二：**对象类型**，对象类型我们可以在指定 attribute 名称的同时，指定它需要传递的类型、是否是必须的、
    默认值等等；

#### Props 的数组用法

![](/frontEnd/frame/vue/10.png)

![](/frontEnd/frame/vue/11.png)

#### Props 的对象用法

- 数组用法中我们只能说明传入的 attribute 的名称，并不能对其进行任何形式的限制，接下来我们来看一下对象的
  写法是如何让我们的 props 变得更加完善的。
- 当使用对象语法的时候，我们可以对传入的内容限制更多：
  - 比如指定传入的 attribute 的**类型**；
  - 比如指定传入的 attribute **是否是必传的**；
  - 比如指定没有传入时，attribute 的**默认值**；

```js
export default {
  // props: ["title", "content"],
  props: {
    title: String,
    content: {
      type: String,
      // 必传
      required: true,
    },
    messageInfo: {
      type: Object,
    },
  },
  inheritAttrs: false,
};
```

#### 细节一：那么 type 的类型都可以是哪些呢？

- 那么 type 的类型都可以是哪些呢？
  - String
  - Number
  - Boolean
  - Array
  - Object
  - Date
  - Function
  - Symbol
- 细节二：对象类型的其他写法

![](/frontEnd/frame/vue/12.png)

#### 细节三：Prop 的大小写命名

- Prop 的大小写命名(camelCase vs kebab-case)
  - HTML 中的 **attribute 名是大小写不敏感**的，所以**浏览器会把所有大写字符解释为小写字符**；
  - 这意味着当你**使用 DOM 中的模板**时，**camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名**；

:::warning
因为 HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着如果这里有大写字母,在解析的时候可能会解析成 messageinfo 传给子组件,但是因为 template 不会直接给浏览器解析,而是给 vue-loader 解析,所以大小写就不敏感.
虽然这样在 vue 中没有问题,但是官方还是建议传的时候驼峰改为短横线
:::
![](/frontEnd/frame/vue/13.png)

#### 非 Prop 的 Attribute

- 什么是非 Prop 的 Attribute 呢？
  - 当我们**传递给一个组件某个属性，但是该属性并没有定义对应的 props 或者 emits** 时，就称之为 **非 Prop 的 Attribute**；
  - 常见的包括 **class、style、id** 属性等；
- Attribute 继承
  - 当**组件有单个根节点**时，**非 Prop 的 Attribute 将自动添加到根节点的 Attribute** 中：

![](/frontEnd/frame/vue/14.png)

![](/frontEnd/frame/vue/4.png)

#### 禁用 Attribute 继承和多根节点

- 如果我们不希望组件的根元素继承 attribute，可以在组件中设置 inheritAttrs: false：
  - 禁用 attribute 继承的**常见情况**是**需要将 attribute 应用于根元素之外的其他元素**；
  - 我们可以通过 **\$attrs 来访问所有的 非 props 的 attribute**；
- 多个根节点的 attribute
  - **多个根节点的 attribute 如果没有显示的绑定**，那么会报警告，我们**必须手动的指定要绑定到哪一个属性上**：

```vue
<template>
  <div>
    <!-- 获取全部 -->
    <h2 v-bind="$attrs">{{ title }}</h2>
    <!-- 获取部分 -->
    <p :class="$attrs.class">{{ content }}</p>
  </div>
</template>
```

![](/frontEnd/frame/vue/15.png)

### 子组件传递给父组件

- 什么情况下子组件需要传递内容到父组件呢？
  - 当**子组件有一些事件发生**的时候，比如在组件中发生了点击，父组件需要切换内容；
  - 子组件**有一些内容想要传递给父组件**的时候；
- 我们如何完成上面的操作呢？
  - 首先，我们需要在**子组件中定义好在某些情况下触发的事件名称**；
  - 其次，在**父组件中以 v-on 的方式传入要监听的事件名称**，并且绑定到对应的方法中；
  - 最后，在子组件中发生某个事件的时候，**根据事件名称触发对应的事件**；

#### 自定义事件的流程

- 我们封装一个 Son.vue 的组件：
  - 内部其实是监听两个按钮的点击，点击之后通过 this.\$emit 的方式发出去事件；

```vue
<template>
  <div>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <br />
    <input type="number" @input="changeInput" v-model.number="num" />
    <button @click="incrementN">+{{ value }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      num: "",
    };
  },
  methods: {
    increment() {
      this.$emit("add");
    },
    decrement() {
      this.$emit("sub");
    },
    changeInput() {
      this.value = this.num;
    },
    incrementN(num) {
      // 可以传递多个参数
      this.$emit("addN", this.num, "codertao", 19);
    },
  },
  emits: ["add", "sub", "addN"],
};
</script>

<style></style>
```

```vue
<template>
  <div>
    <h2>当前计数:{{ count }}</h2>
    <Son @add="sonAdd" @sub="sonSub" @addN="sonAddN" />
  </div>
</template>

<script>
import Son from "./Son.vue";
export default {
  data() {
    return {
      count: 0,
    };
  },
  components: {
    Son,
  },
  methods: {
    sonAdd() {
      this.count++;
    },
    sonSub() {
      this.count--;
    },
    sonAddN(num, name, age) {
      this.count += num;
      console.log(name);
      console.log(age);
    },
  },
};
</script>

<style></style>
```

![](/frontEnd/frame/vue/16.png)

#### 自定义事件的参数和验证

- 自定义事件的时候，我们也可以传递一些参数给父组件：
  - 上面代码已经验证了我的说法
- 在 vue3 当中，我们可以对传递的参数进行验证：

```js
emits: {
  add: null,
  sub: null,
  addN(num, name, age) {
    console.log(num, name, age);
    if (num > 10) {
      return true;
    }
    return false;
  },
},
```

这个做一个了解,一般我们都是直接传一个数组

![](/frontEnd/frame/vue/17.png)

![](/frontEnd/frame/vue/18.png)

### 非父子组件的通信

- 在开发中，我们构建了组件树之后，除了父子组件之间的通信之外，还会有非父子组件之间的通信。
- 这里我们主要讲两种方式：
  - Provide/Inject；
  - Mitt 全局事件总线；
- Provide/Inject 用于非父子组件之间共享数据：
  - 比如有**一些深度嵌套的组件，子组件想要获取父组件的部分内容**；
  - 在这种情况下，如果我们仍然**将 props 沿着组件链逐级传递**下
    去，就会非常的麻烦；
- 对于这种情况下，我们可以使用 Provide 和 Inject ：
  - 无论层级结构有多深，父组件都可以作为其所有子组件的**依赖提供者**；
  - 父组件有一个 **provide 选项**来提供数据；
  - 子组件有**一个 inject 选项**来开始使用这些数据；
- 实际上，你可以将依赖注入看作是“long range props”，除了：
  - 父组件不需要知道哪些子组件使用它 provide 的 property
  - 子组件不需要知道 inject 的 property 来自哪里

#### Provide 和 Inject 基本使用

```vue {15-18}
<template>
  <div>
    <h2>Father</h2>
    <br />
    <Son />
  </div>
</template>

<script>
import Son from "./Son.vue";
export default {
  components: {
    Son,
  },
  provide: {
    name: "codertao",
    age: 19,
  },
};
</script>

<style></style>
```

```vue {11}
<template>
  <div>
    <h2>Son</h2>
    <p>{{ name }}</p>
    <p>{{ age }}</p>
  </div>
</template>

<script>
export default {
  inject: ["name", "age"],
};
</script>

<style></style>
```
