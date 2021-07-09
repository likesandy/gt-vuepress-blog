---
title: 异步
---

## 目录

- [回调函数](#回调函数)

- [Promise](#Promise)

- [异步函数](#异步函数)

- [genrerator](#genrerator)

## 回调函数

## Promise

## 异步函数

### 对比 Promise

如果我们使用 `Promise`,想拿到正确的值的话需要调用在 `then` 方法中写一个解决处理程序才可以拿到值,这当然是不方便的,因为其它的代码都会放在 `Promise` 中的,当然你也可以封装一个函数来解决,但是封装函数的方式改进并不大,代码还是放在了 `Promise` 中的

异步函数就很好的解决了这个问题

### 含义

异步函数被称为 `async`/`await`,是 ES8 规范中新增的

### 作用

让同步的代码异步执行

### async

声明异步函数,**简单来说**就是把 anync 放在函数前面

异步函数始终返回一个 `Promise` 对象,不管你返回 `Promise` 对象还是不返回 `Promise` 对象,最终都会返回一个 `Promise` 对象

返回 `resolve` 的值,可以通过 `then` 方法拿到

```js
async function foo() {
  console.log(1);
  return Promise.resolve(3);
}
foo().then(console.log);
console.log(2);
// 1
// 2
// 3
```

在异步函数中抛出错误,可以通过 `catch` 拿到

```js
async function foo() {
  console.log(1);
  throw 3;
}
foo().catch(console.log);
console.log(2);
// 1
// 2
// 3
```

但是 `reject` 的值不会被 `catch` 捕获到

```js
async function foo() {
  console.log(1);
  Promise.reject(3);
}
foo().catch(console.log);
console.log(2);
// 1
// 2
// Uncaught (in promise) 3
```

### await

使用 `await` 可以让整个 `async` 函数进行暂停,等待 `Promsie` 解决才会继续执行

```js
async function foo() {
  console.log(1);
  await Promise.reject(3);
  console.log(4); // 不会执行
}
foo().catch(console.log);
console.log(2);
// 1
// 2
// 3
```

await **必须**在异步函数中使用

异步函数的**特质**不会扩展到嵌套函数,意思就是 `await` 只能直接出现在异步函数的定义中,不能在异步函数的嵌套函数中

```js
  async function foo() {
    console.log(1);
    function bar() {
      await Promise.resolve(3);
    }
  }
  foo()
  console.log(2);
  // await is only valid in async functions and the top level bodies of modules
```

在异步函数中真正重要的是 `await`,`async` 不过是一个标识符,如果异步函数中没有 `await`,其执行基本上是和普通函数是一致的

```js
async function foo() {
  console.log(2);
}
console.log(1);
foo();
console.log(3);
// 1
// 2
// 3
```

要想真正理解 `await`,必须知道它并不是等待一个值那么简单,而是 JavaScript 在运行时遇到 `await` 的时候,会进行记录然后暂停,对可以立即执行的值向消息队列中添加一个任务,等到同步的代码执行完毕后,JavaScript 才会从消息队列中取出任务,恢复异步函数的执行

```js
async function foo() {
  console.log(2);
  await null;
  console.log(4);
}
console.log(1);
foo();
console.log(3);
// 1
// 2
// 3
// 4
```

## genrerator
