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

  ![](/frame/vue/2.png)

  - 我们会发现，将所有的代码逻辑全部放到一个组件中，代码是非常的臃肿和难以维
    护的。
  - 并且在真实开发中，我们会有更多的内容和代码逻辑，对于扩展性和可维护性来说
    都是非常差的。
  - 所以，在真实的开发中，我们会对组件进行拆分，拆分成一个个功能的小组件。

## 组件的拆分

我们可以按照如下的方式进行拆分：

![](/frame/vue/3.png)

按照如上的拆分方式后，我们开发对应的逻辑只需要去对应的组件编写就可。

## 组件 css 的作用域

当我们在组件中 style 的样式添加了**scoped 属性**,表示当前的样式只存在于当前组件,不会影响其他组件的样式,拥有自己的**作用域**

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

![](/frame/vue/5.png)

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

![](/frame/vue/1.png)

诶?这是为什么?我明明只在 App 组件中设置了样式,HelloWorld 组件中没有设置,为什么 HelloWorld 中会有样式

这是因为在 vue3 中我们可以有无数根,我们在外部就不用包裹一个 div 了,但是在 css 中就会出现问题

因为 scoped 属性的实现就是给标签添加了一些自定义的样式,父组件的样式属性编号会传递给一份子组件,那么这个子组件就有两个属性编号,自己的属性编号没有设置样式,但是父组件的属性编号设置了样式就会生效(相当于穿透给了子组件)

![](/frame/vue/6.png)

以前 vue2 中没有出现这种情况,是因为 vue2 在外部都会包裹一个根(一般是 div),父组件的样式属性编号就会传给子组件的根的属性编号,但是不会传递到子组件本身,所以就不会影响到子组件

![](/frame/vue/7.png)

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

![](/frame/vue/9.png)

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

![](/frame/vue/10.png)

![](/frame/vue/11.png)

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

![](/frame/vue/12.png)

#### 细节三：Prop 的大小写命名

- Prop 的大小写命名(camelCase vs kebab-case)
  - HTML 中的 **attribute 名是大小写不敏感**的，所以**浏览器会把所有大写字符解释为小写字符**；
  - 这意味着当你**使用 DOM 中的模板**时，**camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名**；

:::warning
因为 HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着如果这里有大写字母,在解析的时候可能会解析成 messageinfo 传给子组件,但是因为 template 不会直接给浏览器解析,而是给 vue-loader 解析,所以大小写就不敏感.
虽然这样在 vue 中没有问题,但是官方还是建议传的时候驼峰改为短横线
:::
![](/frame/vue/13.png)

#### 非 Prop 的 Attribute

- 什么是非 Prop 的 Attribute 呢？
  - 当我们**传递给一个组件某个属性，但是该属性并没有定义对应的 props 或者 emits** 时，就称之为 **非 Prop 的 Attribute**；
  - 常见的包括 **class、style、id** 属性等；
- Attribute 继承
  - 当**组件有单个根节点**时，**非 Prop 的 Attribute 将自动添加到根节点的 Attribute** 中：

![](/frame/vue/14.png)

![](/frame/vue/4.png)

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

![](/frame/vue/15.png)

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

![](/frame/vue/16.png)

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

![](/frame/vue/17.png)

![](/frame/vue/18.png)

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

```vue
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

```vue
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

:::tip
只能用于**子孙组件**,一般我们可以共享一些简单的数据,复杂的数据一般都用 Vuex
:::

#### Provide 和 Inject 函数的写法

前面我们写的数据是不是都是写死的,如果我们想使用 data 中的数据那该怎么办喃

- 如果 Provide 中提供的一些数据是**来自 data**，那么我们可能会想要**通过 this 来获取**：
- 这个时候会报错：
  - 这里给大家留一个思考题，我们的 this 使用的是哪里的 this？

```js
<script>
import Son from "./Son.vue";
export default {
  components: {
    Son,
  },
  data() {
    return {
      names: ["codertao", "sandy", "zm"],
    };
  },
  methods: {
    bntClick() {
      this.names.push("ymy");
      console.log(this.names);
    },
  },
  provide: {
    name: "codertao",
    age: 19,
    length:this.names.length
  },
};
</script>
```

这里的 this 指向的是全局的 this,当然是 undefined,不熟悉的 this 的,可以去看看我的 JavaScript 中的 this 指向的文章

既然我们想使用 data 中 naems,当然要把 this 指向当前的实例对象

所以官方说的如果想使用 data 中的数据,需要把 provide 写成一个函数,内部会帮你把 this 指向当前的实例对象

```js
provide() {
  console.log(this);
  return {
    name: "codertao",
    age: 19,
    length: this.names.length,
  };
},
```

![](/frame/vue/19.png)

#### 处理响应式数据

我们先来验证一个结果：如果我们修改了 this.names 的内容，那么使用 length 的子组件会不会是响应式的？

```vue
<template>
  <div>
    <h2>Son</h2>
    <p>{{ name }}</p>
    <p>{{ age }}</p>
    <p>{{ length }}</p>
  </div>
</template>

<script>
export default {
  inject: ["name", "age", "length"],
};
</script>

<style></style>
```

```vue
<template>
  <div>
    <h2>Father</h2>
    <button @click="bntClick">+name</button>

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
  data() {
    return {
      names: ["codertao", "sandy", "zm"],
    };
  },
  methods: {
    bntClick() {
      this.names.push("ymy");
      console.log(this.names);
    },
  },
  provide() {
    console.log(this.names);
    return {
      name: "codertao",
      age: 19,
      length: this.names.length,
    };
  },
};
</script>

<style></style>
```

![](/frame/vue/20.png)

- 我们会发现对应的子组件中是没有反应的：
  - 这是因为当我们**修改了 names 之后**，之前在 provide 中引入的 **this.names.length 本身并不是响应式**的；
- 那么怎么样可以让我们的数据变成响应式的呢？
  - 非常的简单，我们可以使用**响应式的一些 API**来完成这些功能，比如说**computed 函数**；
  - 当然，这个 computed 是**vue3 的新特性**，在后面我会专门讲解，这里大家可以先直接使用一下；
  - 这是因为 **computed 返回的是一个 ref 对象**，需要取出其中的 **value 来使用**；

```vue
<template>
  <div>
    <h2>Father</h2>
    <button @click="bntClick">+name</button>

    <br />
    <Son />
  </div>
</template>

<script>
import { computed } from "vue";
import Son from "./Son.vue";
export default {
  components: {
    Son,
  },
  data() {
    return {
      names: ["codertao", "sandy", "zm"],
    };
  },
  methods: {
    bntClick() {
      this.names.push("ymy");
      console.log(this.names);
    },
  },
  provide() {
    console.log(this.names);
    return {
      name: "codertao",
      age: 19,
      length: computed(() => this.names.length),
    };
  },
};
</script>

<style></style>
```

```vue
<template>
  <div>
    <h2>Son</h2>
    <p>{{ name }}</p>
    <p>{{ age }}</p>
    <p>{{ length.value }}</p>
  </div>
</template>

<script>
export default {
  inject: ["name", "age", "length"],
};
</script>

<style></style>
```

![](/frame/vue/21.png)

### 全局事件总线 mitt 库

- Vue3 从实例中移除了 $on、$off 和 \$once 方法，所以我们如果希望继续使用全局事件总线，要通过第三方的库：
  - Vue3 官方有推荐一些库，例如 [mitt](https://github.com/developit/mitt) 或 [tiny-emitter](https://github.com/scottcorgan/tiny-emitter)；
  - 这里我们主要讲解一下**mitt 库**(人气高)的使用；
- 首先，我们需要先安装这个库：

```sh
npm install mitt
```

- 其次，我们可以封装一个工具 eventbus.js：

```js
import mitt from "mitt";

export const emitter = mitt();
```

#### 使用事件总线工具

- 在项目中可以使用它们：
  - 我们可以在 Father 中发送事件;
  - 我们可以在 Uncle 和 Son 中接收事件
  - 在某些情况下我们可能希望取消掉之前注册的函数监听：

```vue
// Father.vue
<template>
  <div>
    <button @click="btnClick3">切换Son组件</button>
    <button @click="bntClick1">发送事件</button>
    <button @click="bntClick2">取消事件</button>
    <Son v-if="isShow" />
  </div>
</template>

<script>
import { emitter } from "./utils/eventbus";
import { tao, sandy } from "./utils/constants";
import Son from "./Son.vue";
export default {
  components: {
    Son,
  },
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    bntClick1() {
      // 第一个参数:发送的事件名称
      // 第二个参数:发送的事件内容
      emitter.emit(tao, { name: "codertao", age: 19 });
      emitter.emit(sandy, { name: "sandy", age: 21 });
    },
    bntClick2() {
      // 取消事件
      emitter.all.clear();
    },
    btnClick3() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style></style>
```

```vue
// Son.vue
<template>
  <div></div>
</template>

<script>
import { emitter } from "./utils/eventbus";
import { tao, sandy } from "./utils/constants";
const onFoo = (info) => {
  console.log(info, "你监听了我");
};
export default {
  created() {
    emitter.on(sandy, (info) => {
      console.log("sandy:", info);
    });
    // '*'属性,接收全部的事件
    // 第二个参数:回调函数,type是发送事件源的名称,info是发送事件源的内容
    // emitter.on("*", (type, info) => {
    //   console.log("all:", type, info);
    // });
    emitter.on(tao, onFoo);
  },
  unmounted() {
    // 取消tao事件的监听
    emitter.off(tao, onFoo);
  },
};
</script>

<style></style>
```

```vue
// Uncle.vue
<template>
  <div></div>
</template>

<script>
import { emitter } from "./utils/eventbus";
import { tao, sandy } from "./utils/constants";

export default {
  created() {
    // on(接收事件)
    // 第一个参数:接收的事件名称
    // 第二个参数:回调函数,info是发送事件源的内容
    emitter.on(tao, (info) => {
      console.log("tao:", info);
    });
    emitter.on(sandy, (info) => {
      console.log("sandy:", info);
    });
  },
};
</script>

<style></style>
```

::: tip
具体的效果可以去 GitHub 下载代码查看
:::

## 插槽

### 认识插槽 Slot

- 在开发中，我们会经常封装一个个可复用的组件：
  - 前面我们会**通过 props 传递**给组件一些数据，让组件来进行展示；
  - 但是为了让这个组件具备**更强的通用性**，我们**不能将组件中的内容限制为固定的 div、span** 等等这些元素；
  - 比如某种情况下我们使用组件，希望组件显示的是**一个按钮**，某种情况下我们使用组件希望显示的是**一张图片**；
  - 我们应该让使用者可以决定**某一块区域到底存放什么内容和元**素；
- 举个栗子：假如我们定制一个通用的导航组件 - NavBar
- 这个组件分成三块区域：**左边-中间-右边**，每块区域的内容是不固定；
- 左边区域可能显示一个菜单图标，也可能显示一个返回按钮，可能什么都不显示；
- 中间区域可能显示一个搜索框，也可能是一个列表，也可能是一个标题，等等；
- 右边可能是一个文字，也可能是一个图标，也可能什么都不显示；

### 如何使用插槽 slot？

- 这个时候我们就可以来定义插槽 slot：
  - 插槽的使用过程其实是**抽取共性、预留不同**；
  - 我们会将**共同的元素、内容依然在组件内**进行封装；
  - 同时会将**不同的元素使用 slot 作为占位**，让外部决定到底显示什么样的元素;
- 如何使用 slot 呢？
  - Vue 中将 **slot 元素作为承载分发内容**的出口；
  - 在封装组件中，使用**特殊的元素 slot**就可以为封装组件**开启一个插槽**；
  - 该插槽**插入什么内容取决于父组件**如何使用；

### 插槽的基本使用

- 我们一个组件 MySlotCpn.vue：该组件中有一个插槽，我们可以在插槽中放入需要显示的内容；
- 我们在 App.vue 中使用它们：我们可以插入普通的内容、html 元素、组件元素，都可以是可以的；

```vue
// MySlotCpn.vue
<template>
  <div>
    <h2>组件开始</h2>
    <slot>
      <p>我是默认的内容</p>
    </slot>
    <h2>组件结束</h2>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
```

```vue
// MyButtonCpn.vue
<template>
  <div>
    <button>我的按钮</button>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
```

```vue
// App.vue
<template>
  <div>
    <MySlotCpn>
      <button>按钮</button>
    </MySlotCpn>
    <MySlotCpn>
      <MyButtonCpn />
    </MySlotCpn>
  </div>
</template>

<script>
import MySlotCpn from "./MySlotCpn.vue";
import MyButtonCpn from "./MyButtonCpn.vue";
export default {
  components: {
    MySlotCpn,
    MyButtonCpn,
  },
};
</script>

<style></style>
```

![](/frame/vue/22.png)

### 插槽的默认内容

- 有时候我们希望在使用插槽时，如果没有插入对应的内容，那么我们需要显示一个**默认的内容**：
  - 当然这个默认的内容只会在没有提供插入的内容时，才会显示；

![](/frame/vue/23.png)

### 多个插槽的效果

- 我们先测试一个知识点：如果一个组件中含有**多个插槽**，我们插入多个内容时是什么效果？
  - 我们会发现默认情况下每个插槽都会获取到我们插入的内容来显示；

![](/frame/vue/24.png)

### 具名插槽的使用

- 事实上，我们希望达到的效果是插槽对应的显示，这个时候我们就可以使用 具名插槽：
  - 具名插槽顾名思义就是给插槽起一个名字，slot 元素有一个特殊的 attribute：name；
  - 一个不带 name 的 slot，会带有隐含的名字 default；

```vue
<template>
  <div class="nav-bar">
    <div class="left">
      <!-- <slot name="default"></slot> -->
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scope>
body {
  margin: 0;
  padding: 0;
}
.nav-bar {
  display: flex;
}
.left,
.center,
.right {
  height: 40px;
}

.left,
.right {
  width: 80px;
  background: red;
}
.center {
  flex: 1;
  background: blue;
}
</style>
```

```vue
<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <button>左边的按钮</button>
      </template>
      <template v-slot:center>
        <h2>中间的标题</h2>
      </template>
      <template v-slot:right>
        <i>右边的i元素</i>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>

<style></style>
```

![](/frame/vue/25.png)

### 动态插槽名

- 什么是动态插槽名呢？
- 目前我们使用的插槽名称都是固定的；
- 比如 v-slot:left、v-slot:center 等等；
- 我们可以通过 v-slot:[dynamicSlotName]方式动态绑定一个名称；

![](/frame/vue/26.png)

v-slot:[name]这里为什么要加[],这个是动态参数,忘记了可以看看前面的文章

上面图的方式是在插槽组件中定义的数据,其实也可以在使用插槽的地方定义数据然后通过 props 传给插槽

![](/frame/vue/27.png)

:::tip
两种方式都是可以的,看个人喜好
:::

### 具名插槽使用的时候缩写

- 具名插槽使用的时候缩写：
  - 跟 v-on 和 v-bind 一样，**v-slot 也有缩写**；
  - 即把参数之前的**所有内容 (v-slot:) 替换为字符 #**；

![](/frame/vue/28.png)

### 渲染作用域

- 在 Vue 中有渲染作用域的概念：
  - 父级模板里的所有内容都是**在父级作用域中编译的**；
  - 子模板里的所有内容都是**在子作用域中编译的**；
- 如何理解这句话呢？我们来看一个案例：

  - 在我们的案例中 ChildCpn 自然是可以让问自己作用域中的 title 内容的；
  - 但是在 App 中，是访问不了 ChildCpn 中的内容的，因为它们是跨作用域的访问；

![](/frame/vue/29.png)

### 认识作用域插槽

- 但是有时候我们希望插槽可以访问到子组件中的内容是非常重要的：
  - 当一个组件被用来渲染一个数组元素时，我们使用插槽，并且希望插槽中没有显示每项的内容；
  - 这个 Vue 给我们提供了作用域插槽；
- 我们来看下面的一个案例：

![](/frame/vue/30.png)

### 独占默认插槽的缩写

如果我们的插槽只有默认插槽时，组件的标签可以被当做插槽的模板来使用，这样，我们就可以将 v-slot 直
接用在组件上：

```html
<show-movies :movies="movies" v-slot="tao">
  <div>{{ tao.index }}-{{ tao.item }}</div>
</show-movies>
```

### 默认插槽和具名插槽混合

- 但是，如果我们有默认插槽和具名插槽，那么按照完整的 template 来编写。

![](/frame/vue/31.png)

- 只要出现多个插槽，请始终为所有的插槽使用完整的基于 template 的语法：

```html
<show-movies :movies="movies">
  <template v-slot="tao">
    <div>{{ tao.index }}-{{ tao.item }}</div>
  </template>
  <template #codertao>
    <h2>我是codertao的具名插槽</h2>
  </template>
</show-movies>
```

![](/frame/vue/32.png)

## 动态组件

### 切换组件案例

- 比如我们现在想要实现了一个功能：
  - 点击一个 tab-bar，切换不同的组件显示；
- 这个案例我们可以通过两种不同的实现思路来实现：
  - 方式一：通过 v-if 来判断，显示不同的组件；
  - 方式二：动态组件的方式；

### v-if 显示不同的组件

- 我们可以先通过 v-if 来判断显示不同的组件，这个可以使用我们之前讲过的知识来实现：

![](/frame/vue/33.png)

### 动态组件的实现

- 动态组件是使用 **component 组件**，通过一个**特殊的 attribute is** 来实现：

- 这个 currentTab 的值需要是什么内容呢？
  - 可以是通过**component 函数注册**的组件；
  - 在一个**组件对象的 components 对象中注册的组件**；

```html
<component :is="currentTab"></component>
```

### 动态组件的传值

- 如果是动态组件我们可以给它们传值和监听事件吗？
  - 也是一样的；
  - 只是我们需要将**属性和监听事件**放到 component 上来使用；

![](/frame/vue/34.png)

### 认识 keep-alive

- 我们先对之前的案例中 About 组件进行改造：

  - 在其中增加了一个按钮，点击可以递增的功能；

- 比如我们将 counter 点到 10，那么在切换到 home 再切换回来 about 时，状态是否可以保持呢？
  - 答案是否定的；
  - 这是因为默认情况下，我们在**切换组件后，about 组件会被销毁掉**，再次回来时**会重新创建组件**；
- 但是，在开发中某些情况我们希望继续保持组件的状态，而不是销毁掉，这个时候我们就可以使用一个内置组件：
  keep-alive。

```html
<keep-alive>
  <component
    :is="currentTab"
    name="codertao"
    :age="19"
    @pagesClick="homeClick"
  ></component>
</keep-alive>
```

### keep-alive 属性

- keep-alive 有一些属性：
  - 默认情况下只要添加了 keep-alive 属性就都会进行缓存
  - include - string | RegExp | Array。只有名称匹配的组件会被缓
    存；
  - exclude - string | RegExp | Array。任何名称匹配的组件都不
    会被缓存；
  - max - number | string。最多可以缓存多少组件实例，一旦达
    到这个数字，那么缓存组件中最近没有被访问的实例会被销毁；
- include 和 exclude prop 允许组件有条件地缓存：

  - 二者都可以用**逗号分隔字符串、正则表达式或一个数组**来表示；
  - 匹配首先检查组件自身的 **name 选项**；

![](/frame/vue/35.png)

属性值要与组件的 name 名称一一匹配

![](/frame/vue/36.png)

## 异步组件

### Webpack 的代码分包

这里我用的是 Vite 来进行打包的,道理也是差不多的

- 默认的打包过程：
  - 默认情况下，在构建整个组件树的过程中，因为组件和组件之间是**通过模块化直接依赖**的，那么**webpack 在打包时就会将组件模块打包到一起**（比如一个 app.js 文件中）；
- 打包时，代码的分包：
  - 所以，对于一些**不需要立即使用的组件**，我们可以**单独对它们进行拆分**，拆分成一些**小的代码块 chunk.js**；
  - 这些 chunk.js 会在需要时**从服务器加载下来**，并且**运行代码**，显示对应的内容；
- 那么 webpack 中如何可以对代码进行分包呢？

**默认打包**

![](/frame/vue/37.png)

**JS 中异步导入,然后打包**

![](/frame/vue/38.png)

:::tip
异步导入的原理,可以在 webpack 专栏里找到,这里就不讲解了
:::

### Vue 中实现异步组件

- 如果我们的项目过大了，对于某些组件我们希望通过异步的方式来进行加载（目的是可以对其进行分包处理），那
  么 Vue 中给我们提供了一个函数：defineAsyncComponent。
- defineAsyncComponent 接受两种类型的参数：
  - 类型一：工厂函数，该工厂函数需要返回一个 Promise 对象；
  - 类型二：接受一个对象类型，对异步函数进行配置；

![](/frame/vue/39.png)

#### 异步组件的写法二

![](/frame/vue/40.png)

我们去页面看看也是没有问题的,因为我们这里是本地服务器,所以基本上加载过程中不会显示 Loading 组件

当然也有办法,我们可以在控制台调整网络

![](/frame/vue/41.png)

这样网络就会变得很差,然后我们进行刷新,有可能就会显示 Loading 组件的内容了

![](/frame/vue/42.png)

之后我们进行打包,分包也是没有问题

![](/frame/vue/43.png)

### 异步组件和 Suspense

- 注意：目前 Suspense 显示的是一个实验性的特性，API 随时可能会修改。(**借鉴**的 React)
- Suspense 是一个内置的全局组件，该组件有两个插槽：
  - default：如果 default 可以显示，那么显示 default 的内容；
  - fallback：如果 default 无法显示，那么会显示 fallback 插槽的内容；

```html
<suspense>
  <template #default>
    <about />
  </template>
  <template #fallback>
    <loading />
  </template>
</suspense>
```

## 模板引用

### \$ref 的使用

- 某些情况下，我们在组件中想要直接获取到元素对象或者子组件实例：
  - 在 Vue 开发中我们是**不推荐进行 DOM 操作**的；
  - 这个时候，我们可以**给元素或者组件绑定一个 ref 的 attribute 属性**；
- 组件实例有一个\$refs 属性：
  - 它一个对象 Object，持有**注册过 ref attribute 的所有 DOM 元素和组件实例**。

```vue
<template>
  <div>
    <p>{{ name }}</p>
    <button @click="getFather">获取父元素</button>
    <button @click="getRoot">获取根元素</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "codertao",
    };
  },
  methods: {
    say() {
      console.log("Hello World");
    },
  },
};
</script>

<style></style>
```

```vue
<template>
  <div>
    <!-- 绑定到一个元素上 -->
    <h2 ref="title">哈哈哈</h2>
    <!-- 绑定到一个组件上 -->
    <home ref="home" />

    <button @click="getElement">获取元素</button>
  </div>
</template>

<script>
import Home from "./Home.vue";
export default {
  components: {
    Home,
  },
  methods: {
    getElement() {
      console.log(this.$refs.title);
      console.log(this.$refs.home.name);
      this.$refs.home.say();
    },
  },
};
</script>

<style></style>
```

![](/frame/vue/44.png)

### $parent和$root

- 我们可以通过\$parent 来访问父元素。
- HelloWorld.vue 的实现：

  - 这里我们也可以**通过\$root**来实现，因为 App 是我们的根组件；

```vue
<template>
  <div>
    <p>{{ name }}</p>
    <button @click="getFather">获取父元素</button>
    <button @click="getRoot">获取根元素</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "codertao",
    };
  },
  methods: {
    say() {
      console.log("Hello World");
    },
    getFather() {
      console.log(this.$parent);
    },
    getRoot() {
      console.log(this.$root);
    },
  },
};
</script>

<style></style>
```

![](/frame/vue/45.png)

注意：在 Vue3 中已经移除了\$children 的属性，所以不可以使用了。

> 还有其它的 api 具体查一下文档就可以了,这里列举一些比较重要的内容

## 生命周期

- 什么是生命周期呢？
- 每个组件都可能会经历从**创建、挂载、更新、卸载**等一系列的过程；
- 在这个过程中的**某一个阶段**，用于可能会想要**添加一些属于自己的代码逻辑**（比如组件创建完后就请求一些服
  务器数据）；
- 但是我们**如何可以知道目前组件正在哪一个过程**呢？Vue 给我们提供了**组件的生命周期函数**；
- 生命周期函数：
  - 生命周期函数是**一些钩子函数**，在**某个时间会被 Vue 源码内部进行回调**；
  - 通过对生命周期函数的回调，我们可以**知道目前组件正在经历什么阶段**；
  - 那么我们就可以在**该生命周期中编写属于自己的逻辑代码了**；

### 生命周期的流程

![](/frame/vue/1.svg)

```vue
<template>
  <div>
    <h2>Home</h2>
    <p>{{ name }}</p>
    <button @click="btnClick">修改name</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "codertao",
    };
  },
  beforeCreate() {
    console.log("home beforeCreate");
  },
  created() {
    console.log("home created");
  },
  beforeMount() {
    console.log("home beforeMount");
  },
  mounted() {
    console.log("home mounted");
  },
  beforeUnmount() {
    console.log("home beforeUnmount");
  },
  unmounted() {
    console.log("home unmounted");
  },
  beforeUpdate() {
    console.log("home beforeUpdate");
  },
  updated() {
    console.log("home updated");
  },
  methods: {
    btnClick() {
      this.name = "sandy";
    },
  },
};
</script>

<style></style>
```

```vue
<template>
  <div>
    <button @click="btnClick">切换组件</button>
    <template v-if="isShow">
      <home />
    </template>
  </div>
</template>
<script>
import Home from "./Home.vue";
export default {
  components: {
    Home,
  },
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    btnClick() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style></style>
```

### 缓存组件的生命周期

- 对于缓存的组件来说，再次进入时，我们是不会执行 created 或者 mounted 等生命周期函数的：
  - 但是有时候我们确实希望监听到何时重新进入到了组件，何时离开了组件；
  - 这个时候我们可以使用 activated 和 deactivated 这两个生命周期钩子函数来监听；

![](/frame/vue/46.png)

## 组件的 v-model

- 前面我们在 **input**中可以使用 **v-model** 来完成双向绑定：
  - 这个时候往往会非常方便，因为 v-model 默认帮助我们完成了两件事；
  - **v-bind:value 的数据绑定**和 **@input 的事件监听**；
- 如果我们现在封装了一个组件，其他地方在使用这个组件时，是否也可以使用 v-model 来同时完成这两个功能呢？
  - 也是可以的，vue 也支持**在组件上使用 v-model**；
- 当我们在组件上使用的时候，等价于如下的操作：
  - 我们会发现和 **input 元素不同的只是属性的名称和事件触发的名称**而已

```vue
<template>
  <div>
    <input :value="modelValue" @input="inputChange" />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    inputChange(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style></style>
```

```vue
<template>
  <div>
    <h2>{{ message }}</h2>
    <!-- <input :value="message" @input="$event.target.value" /> -->
    <!-- <input v-model="message" /> -->

    <!-- <home
      :model-value="message"
      @update:model-value="message = $event"
    ></home> -->
    <home v-model="message" />
  </div>
</template>

<script>
import Home from "./Home.vue";
export default {
  components: {
    Home,
  },
  data() {
    return {
      message: "Hello World",
    };
  },
};
</script>

<style></style>
```

![](/frame/vue/47.png)

### computed 实现

- 如果我们想在 input 中也使用 v-mnodel 的形式,那使用什么值喃?props 的?
  - 不能直接修改 props 的值,在开发中 props 的值不建议修改
- 我们依然希望在组件内部按照双向绑定的做法去完成，应该如何操作呢？我们可以使用计算属性的 setter 和 getter
  来完成。

![](/frame/vue/48.png)

### 绑定多个属性

- 我们现在通过 v-model 是直接绑定了一个属性，如果我们希望绑定多个属性呢？
  - 也就是我们希望在一个组件上使用多个 v-model 是否可以实现呢？
  - 我们知道，默认情况下的 v-model 其实是绑定了 modelValue 属性和 @update:modelValue 的事件；
  - 如果我们希望绑定更多，可以给 v-model 传入一个参数，那么这个参数的名称就是我们绑定属性的名称；
- 注意：这里我是绑定了两个属性的

```html
<home v-model="message" v-model:name="name" />
```

- v-model:title 相当于做了两件事：
  - 绑定了 title 属性；
  - 监听了 @update:title 的事件；

```html
<!-- <input :value="name" @input="inputChange2" /> -->
<input v-model="tao" />
```

```js
<script>
export default {
  props: {
    modelValue: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  emits: ["update:modelValue", "update:name"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
    tao: {
      get() {
        return this.name;
      },
      set(value) {
        this.$emit("update:name", value);
      },
    },
  },
  methods: {
    inputChange(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    inputChange2(event) {
      this.$emit("update:name", event.target.value);
    },
  },
};
</script>
```

![](/frame/vue/49.png)
