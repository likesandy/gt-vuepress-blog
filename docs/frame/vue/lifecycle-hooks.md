# 生命周期钩子

你可以通过在生命周期钩子前面加上 “on” 来访问组件的生命周期钩子。

下表包含如何在 `setup` 内部调用生命周期钩子：

| Options API     | Composition API   |
| --------------- | ----------------- |
| beforeCreate    | 不再需要          |
| created         | 不再需要          |
| beforeMount     | onBeforeMount     |
| mounted         | onMounted         |
| beforeUpdate    | onBeforeUpdate    |
| updated         | onUpdated         |
| beforeUnmount   | onBeforeUnmount   |
| unmounted       | onUnmounted       |
| errorCaptured   | onErrorCaptured   |
| renderTracked   | onRenderTracked   |
| renderTriggered | onRenderTriggered |
| activated       | onActivated       |
| deactivated     | onDeactivated     |

:::tip 提示
如果我们想在 `beforeCreate` 和 `created` 生命周期中编写代码,现在**更推荐**直接在 `setup` 中编写
:::

这些函数接受一个回调函数，当钩子被组件调用时将会被执行:

```js
import { onMounted } from "vue";
export default {
  setup() {
    onMounted(() => {
      console.log("onMounted");
    });
  },
};
```
