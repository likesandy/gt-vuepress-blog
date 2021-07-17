---
title: Getter
sidebarDepth: 0
---

## Getter

某些属性我们可能需要警告变化后来使用，这个时候可以使用 `getters`(可以认为是 `store` 的**计算属性**)

Getter 接受 `state` 作为其第一个参数：

```js
getters: {
    totalPrice(state) {
      let totalPrice = 0;
      for (const book of state.books) {
        totalPrice += book.count * book.price
      }
      return totalPrice;
    },
  }
```

```html
<h2>总价格:{{ totalPrice }}</h2>
```

## 通过属性访问

Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：

```js
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const totalPrice = computed(() => store.getters.totalPrice);
```

Getter 也可以接受其他 getter 作为第二个参数：

```js
afterDiscountPrice(state, getters) {
  return getters.totalPrice * state.discount;
},
```

我们可以很容易地在任何组件中使用它：

```html
<h2>打折后价格:{{ afterDiscountPrice }}</h2>
```

```js
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const afterDiscountPrice = computed(() => store.getters.afterDiscountPrice);
```

## 通过方法访问

你也可以通过让 getter 返回一个函数，来实现给 getter 传参。

```js
afterSelectPrice: (state, getters) => (n) => {
  let totalPrice = 0;
  for (const book of state.books) {
    if (book.count > n) {
      totalPrice += book.count * book.price;
    }
  }
  return totalPrice;
};
```

```html
<h2>选择后的价格:{{ afterSelectPrice(1) }}</h2>
```

```js
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const afterSelectPrice = computed(() => store.getters.afterSelectPrice);
```

因为 Getter 就算是 store 的计算属性,计算属性本身就是个函数,但是我们在调用的时候不需要写(),就会拿到计算属性的返回值,那我们返回一个函数,调用的时候就会拿到返回的函数,那我们调用的时候加上(),就会执行返回后的函数的返回值(逻辑不是很通顺,看一下代码就好了)

```js
  afterSelectPrice(state, getters) {
    return function (n) {
      let totalPrice = 0;
      for (const book of state.books) {
        if (book.count > n) {
          totalPrice += book.count * book.price
        }
      }
      return totalPrice;
    }
  },
```

上面两个方法都可以实现最终的效果

:::warning 警告
注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
:::

## `mapGetters` 辅助函数

见上节 `mapState` 辅助函数,我暂时没找到适合的解构方案,我目前使用的是直接进行解构

```js
const { totalPrice, afterDiscountPrice, afterSelectPrice } = store.getters;
```

我打印 store.getters 的结果是一个普通的对象,可以直接解构,也符合官方的缓存机制说法

:::danger 危险
可能我的说法有误,这是我目前的理解,等后续仔细了解再看是否能进行修改
:::
