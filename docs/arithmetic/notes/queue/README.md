## 认识队列

队列是是一种受限的线性表，特点为**先进先出**（FIFO：first in first out）

- 受限之处在于它只允许在表的**前端**（front）进行删除操作；
- 在表的**后端**（rear）进行插入操作

![image.png](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E9%98%9F%E5%88%97/1.png)

相当于排队买票，先来的先买票，后来的后买票

![image.png](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E9%98%9F%E5%88%97/2.png)

## 队列的应用

**打印队列**：计算机打印多个文件的时候，需要排队打印

**线程队列**：当开启多线程时，当新开启的线程所需的资源不足时就先放入线程队列，等待 CPU 处理

## 队列的实现

- 基于**数组**实现
- 基于**链表**实现

## 队列常用操作

- enqueue（element）：向队列**尾部添加**一个（或多个）新的项；
- dequeue（）：**移除**队列的**第一**（即排在队列最前面的）项，并**返回**被移除的元素；
- front（）：**返回**队列中的**第一个元素**——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息 Stack-类的 peek 方法非常类似）；
- isEmpty（）：如果队列中不包含任何元素，返回 true，否则返回 false；
- size（）：**返回**队列包含的**元素个数**，与数组的 length 属性类似；
- toString（）：将队列中的内容，转成**字符串**形式并**返回**；

## 封装队列

常见都是使用**链表**来封装队列的,目前还没学到链表,先使用**数组**来封装栈

后续学习了链表再来对队列进行封装

```js
function Queue() {
  this.items = [];

  //  1.将元素加入到队列中
  Queue.prototype.enqueue = (element) => {
    this.items.push(element);
  };

  // 2.从队列中删除前端元素
  Queue.prototype.dequeue = () => {
    return this.items.shift();
  };

  // 3.查看前端元素
  Queue.prototype.front = () => {
    return this.items[0];
  };

  // 4.查看队列是否为空
  Queue.prototype.isEmpty = () => {
    return this.items.length == 0;
  };

  // 5.查看队列中元素的个数
  Queue.prototype.size = () => {
    return this.items.length;
  };

  // 6.toString方法
  Queue.prototype.toString = () => {
    let resultString = "";
    for (let i = 0; i < this.items.length; i++) {
      resultString += this.items[i] + " ";
    }
    return resultString;
  };
}
```

**测试代码**

```js
let q = new Queue();
q.enqueue("abc");
q.enqueue("cba");
q.enqueue("nba");
console.log(q.items);
q.dequeue();
console.log(q.items);
console.log(q.front());
console.log(q.isEmpty());
console.log(q.size());
console.log(q.toString());
```

**测试结果**
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64314b9b9ed94ca49901fbd4525ce8fe~tplv-k3u1fbpfcp-watermark.image)

## 案例

使用队列实现小游戏：**击鼓传花**

传入一组数据和设定的数字 item，循环遍历数组内元素，遍历到的元素为指定数字 item 时将该元素删除，直至数组剩下一个元素。

```js
function Queue() {
  this.items = [];

  Queue.prototype.enqueue = (element) => {
    this.items.push(element);
  };

  Queue.prototype.dequeue = () => {
    return this.items.shift();
  };

  Queue.prototype.front = () => {
    return this.items[0];
  };

  Queue.prototype.isEmpty = () => {
    return this.items.length == 0;
  };

  Queue.prototype.size = () => {
    return this.items.length;
  };

  Queue.prototype.toString = () => {
    let resultString = "";
    for (let i = 0; i < this.items.length; i++) {
      resultString += this.items[i] + " ";
    }
    return resultString;
  };
}

// 击鼓传花
function Pass(names, time) {
  // 1.创建一个队列结构
  let q = new Queue();

  // 2.将所有人依次加入队列
  for (let i of names) {
    q.enqueue(i);
  }

  // 3.开始数数字
  while (q.size() > 1) {
    for (let i = 0; i < time - 1; i++) {
      q.enqueue(q.dequeue());
    }
    q.dequeue();
  }

  // 4.获取胜出的人
  let winner = q.front();
  console.log("胜出的是:" + winner);
}
```

**测试代码**

```js
let names = ["张三", "李四", "王五", "赵六"];
Pass(names, 2);
Pass(names, 6);
```

**测试结果**
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/873c492f62ad41afa6a8e9d9c9632429~tplv-k3u1fbpfcp-watermark.image)

::: tip
[AhumtSun 的一篇文章](http://ahuntsun.top/navitem/algorithm/theory/notes/2.html#_3-2-%E6%B3%A8%E6%84%8F%E7%82%B9)

本篇文章借鉴了以上文章中的知识,如有侵权,马上下架
:::
