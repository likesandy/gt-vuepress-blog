---
title: 栈
---

## 认识栈

- 栈也是一种**非常常见**的数据结构,并且在程序中的**应用非常广泛**

- 数组

  - 我们知道数组是一种**线性结构**,并且可以在数组的**任意位置**插入和删除数据
  - 但是有时候,我们为了实现某些功能,必须对这种**任意性**加以**限制**
  - 而**栈和队列**就是比较常见的**受限的线性结构**

- 栈结构示例图

  ![image.png](https://gitee.com/ahuntsun/BlogImgs/raw/master/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/%E6%A0%88/1.png)

* 栈,它是一种受限的线性表,**后进先出**(LIFO)
  - 其限制是仅允许在**表的一端**进行插入和删除运算.这一端被称为**栈顶**,另一端就称之为**栈底**
  - **LIFO**(last in first out)表示就是后进入的元素,第一个弹出栈空间,类似于自动餐托盘,最后放上的托盘,往往先把拿出去使用
  - 向一个栈插入新元素又称作**进栈**,**入栈**或者**压栈**,它是把新元素放在栈顶元素的上面,使之成为新的栈顶元素
  - 从一个栈删除元素又称作**出栈或退栈**,它是把栈顶元素删除掉,使其相邻的元素成为新的栈顶元素

## 栈的应用

- 程序中如何使用栈来实现

  - 最为常见的就是程序中的函数调用栈?
  - 我们知道函数之间的相互调用: A 调用 B,B 中又调用 C,C 中又调用 D
  - 首先执行 A,先把 A 压入栈,A 在执行的过程中调用了 B,会将 B 压入栈,这个时候 B 在栈顶,A 在栈底
  - 如果这个时候 B 执行完,B 就会立即弹出栈,但是 B 没有执行完?执行 B 又调用了 C
  - 所以 C 被压入了栈,而 C 又调用了 D,D 会被压入到栈顶
  - 所以当前的栈的顺序是(从上至下): D->C->B->A
  - D 执行完,D 会被弹出栈,如何执行 C,C 执行完,C 被弹出栈,然后依次执行然后弹出栈
  - 所以就有了函数调用栈的称呼,就来自于内部的实现机制(通过栈来实现的)

  ::: warning
  比如递归就是不断调用函数,然后就会一直压入栈,栈也会有存储空间,当栈存储空间不足后,就会出现**栈溢出**
  :::

## 栈的实现

- 基于**数组**实现
- 基于**链表**实现

## 栈常见操作

- push（element）：**添加**一个新元素到**栈顶**位置；
- pop（）：**移除**栈顶的元素，同时**返回**被移除的元素；
- peek（）：**返回栈顶的元素**，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）；
- isEmpty（）：如果栈里没有任何元素就返回 true，否则返回 false；
- size（）：**返回**栈里的**元素个数**。这个方法和数组的 length 属性类似；
- toString（）：将栈结构的内容以**字符串**的形式**返回**。

## 封装栈

常见都是使用**链表**来封装栈的,目前还没学到链表,先使用**数组**来封装栈

后续学习了链表再来对栈进行封装

```js
function Stack() {
  // 栈中的属性
  this.items = [];

  // 栈相关的操作
  // 1.将元素压入栈
  Stack.prototype.push = (element) => {
    this.items.push(element);
  };

  // 2.从栈中取出元素
  Stack.prototype.pop = () => {
    return this.items.pop();
  };

  // 3.查看一下栈顶的元素
  Stack.prototype.peek = () => {
    return this.items[this.items.length - 1];
  };

  // 4.判断栈是否为空
  Stack.prototype.isEmpty = () => {
    return this.items.length == 0;
  };

  // 5.获取栈中元素的个数
  Stack.prototype.number = () => {
    return this.items.length;
  };

  // 6.toString方法
  Stack.prototype.toString = () => {
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
let s = new Stack();
s.push(10);
s.push(20);
s.push(30);
s.push(40);
s.push(50);
console.log(s.items);
s.pop();
s.pop();
console.log(s.items);
s.peek();
console.log(s.isEmpty());
console.log(s.number());
console.log(s.toString());
```

**测试结果**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63b9662808f3491db5b749155f9407d6~tplv-k3u1fbpfcp-watermark.image)

## 案例

利用栈的特点来封装一个十进制转二进制的函数

```js
function Stack() {
  // 栈中的属性
  this.items = [];

  // 栈相关的操作
  // 1.将元素压入栈
  Stack.prototype.push = (element) => {
    this.items.push(element);
  };

  // 2.从栈中取出元素
  Stack.prototype.pop = () => {
    return this.items.pop();
  };

  // 3.查看一下栈顶的元素
  Stack.prototype.peek = () => {
    return this.items[this.items.length - 1];
  };

  // 4.判断栈是否为空
  Stack.prototype.isEmpty = () => {
    return this.items.length == 0;
  };

  // 5.获取栈中元素的个数
  Stack.prototype.number = () => {
    return this.items.length;
  };

  // 6.toString方法
  Stack.prototype.toString = () => {
    let resultString = "";
    for (let i = 0; i < this.items.length; i++) {
      resultString += this.items[i] + " ";
    }
    return resultString;
  };
}

//封装函数：将十进制转成二进制(十转二的运算最后倒叙取余的特点符合栈'先进后出')
function decimalism2Conversion(decNumber) {
  //1.定义一个栈对象，保存余数
  let s = new Stack();

  while (decNumber) {
    // 2.1.获取余数并放入栈中
    s.push(decNumber % 2);
    // 2.2.获取整除后的结果作为下一次运算的数字(floor:向下取整)
    decNumber = Math.floor(decNumber / 2);
  }

  // 3.从栈中取出0和1
  let binaryString = "";
  while (!s.isEmpty()) {
    binaryString += s.pop();
  }
  return binaryString;
}
```

**测试代码**

```js
console.log(decimalism2Conversion(10));
console.log(decimalism2Conversion(100));
```

**测试结果**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7aea56dfdf9a4a7d9cc63917b5d3c4ff~tplv-k3u1fbpfcp-watermark.image)
