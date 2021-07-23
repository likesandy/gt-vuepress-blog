---
title: 类
---

## 前言

在早期的 JavaScript 开发中（ES5）我们需要通过函数和原型链来实现类和继承，从 ES6 开始，引入了 class 关键字，可以
更加方便的定义和使用类。

TypeScript 作为 JavaScript 的超集，也是支持使用 class 关键字的，并且还可以对类的属性和方法等进行静态类型检测。

实际上在 JavaScript 的开发过程中，我们更加习惯于函数式编程：

- 比如 React 开发中，目前更多使用的函数组件以及结合 Hook 的开发模式；
- 比如在 Vue3 开发中，目前也更加推崇使用 Composition API；

但是在封装某些业务的时候，类具有更强大封装性，所以我们也需要掌握它们。

类的定义我们通常会使用 class 关键字：

- 在面向对象的世界里，任何事物都可以使用类的结构来描述；
- 类中包含特有的属性和方法；

## 类的定义

我们来定义一个 Person 类：

使用 class 关键字来定义一个类；

我们可以声明一些类的属性：在类的内部声明类的属性以及对应的类型

- 如果类型没有声明，那么它们默认是 any 的；
- 我们也可以给属性设置初始化值；
- 在默认的 strictPropertyInitialization 模式下面我们的属性是必须初始
  化的，如果没有初始化，那么编译时就会报错；
  - 如果我们在 strictPropertyInitialization 模式下确实不希望给属性初
    始化，可以使用 name!: string 语法；

类可以有自己的构造函数 constructor，当我们通过 new 关键字创建一个
实例时，构造函数会被调用；

- 构造函数不需要返回任何值，默认返回当前创建出来的实例；

类中可以有自己的函数，定义的函数称之为方法；

```ts
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  say(): void {
    console.log("Hello World");
  }
}
const p = new Person("tao", 19);
console.log(p.name); // tao
console.log(p.age); // 19
p.say(); // Hello World
```

## 类的继承

面向对象的其中一大特性就是继承，继承不仅仅可以减少我们的代码量，也是多态的使用前提。

我们使用 extends 关键字来实现继承，子类中使用 super 来访问父类。

我们来看一下 Student 类继承自 Person：

- Student 类可以有自己的属性和方法，并且会继承 Person 的属性和方法；
- 在构造函数中，我们可以通过 super 来调用父类的构造方法，对父类中的属性进行初始化；

```ts
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  say(): void {
    console.log("Hello Person");
  }
}

class Student extends Person {
  height: number;
  constructor(name: string, age: number, height: number) {
    // super调用父类的构造器
    super(name, age);
    this.height = height;
  }
  /**
   * 方法也会继承
   * 所以在子类可以继承父类的方法
   * 子类也可以重写父类的方法
   * 继承过来的方法,在子类中也出现出现了,那么会覆盖(重写)
   */
  say(): void {
    // 但是有些情况我重写了方法,但是我又想调用一次父类继承过来的方法
    // 通过super.xx可以调用父类继承过来的方法
    super.say();
    console.log("Hello Student");
  }
}

const s = new Student("tao", 19, 1.85);
s.say(); // Hello Person Hello Student
```
