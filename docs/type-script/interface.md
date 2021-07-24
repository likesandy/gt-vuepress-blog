---
title: 接口
---

## 接口的声明

在前面我们通过 type 可以用来声明一个对象类型：

对象的另外一种声明方式就是通过接口来声明：

```ts
// type InfoType = {
//   name: string;
//   age: number;
// };
// 在接口名称前面+I(算是一种规范)
interface IInfoType {
  name: string;
  age: number;
}
const info: InfoType = {
  name: "tao",
  age: 19,
  numebr: number,
};
```

他们在使用上的区别，我们后续再来说明。

接下来我们继续学习一下接口的其他特性。

## 可选属性

接口中我们也可以定义可选属性：

```ts
interface InfoType {
  name: string;
  age: number;
  friend?: {
    name: string;
  };
}
const info: InfoType = {
  name: "tao",
  age: 19,
  friend: {
    name: "sandy",
  },
};

console.log(info.friend?.name);
```

## 只读属性

接口中也可以定义只读属性：

- 这样就意味着我们再初始化之后，这个值是不可以被修改的；

```ts
interface InfoType {
  readonly name: string;
  age: number;
}
const info: InfoType = {
  name: "tao",
  age: 19,
};

info.name = "sandy"; // 不能赋值给'name'，因为它是一个只读的属性。
```

## 索引类型

前面我们使用 interface 来定义对象类型，这个时候其中的属性名、类型、方法都是确定的，但是有时候我们会遇
到类似下面的对象：

```ts
interface IFrontEnd {
  [index: number]: string;
}

const frontEnd: IFrontEnd = {
  0: "HTML",
  1: "CSS",
  2: "JavaScript",
  3: "Vue.js",
};

interface ILanguageYear {
  [name: string]: number;
}

const languageYear: ILanguageYear = {
  C: 1972,
  Java: 1995,
  JavaScript: 1996,
  TypeScript: 2014,
};
```

## 函数类型

前面我们都是通过 interface 来定义对象中普通的属性和方法的，实际上它也可以用来定义函数类型：

```ts
interface ISumFn {
  (num1: number, num2: number): number;
}

const sum: ISumFn = (num1, num2) => {
  return num1 + num2;
};
```

当然，除非特别的情况，还是推荐大家使用类型别名来定义函数：

```ts
type SumFnType = (num1: number, num2: number) => number;
```

## 接口继承

接口和类一样是可以进行继承的，也是使用 extends 关键字：

- 并且我们会发现，接口是支持多继承的（类不支持多继承）

```ts
interface IInfo {
  name: string;
}

interface IAge {
  age: number;
}

interface IPerson extends IInfo, IAge {
  say(): void;
}

const info: IPerson = {
  name: "tao",
  age: 19,
  say() {
    console.log("Hello World");
  },
};
```

## 交叉类型

前面我们学习了联合类型：

- 联合类型表示多个类型中一个即可

还有另外一种类型合并，就是交叉类型（Intersection Types）：

- 交叉类似表示需要满足多个类型的条件；
- 交叉类型使用 & 符号；

我们来看下面的交叉类型：

- 表达的含义是 number 和 string 要同时满足；
- 但是有同时满足是一个 number 又是一个 string 的值吗？其实是没有的，所以 MyType 其实是一个 never 类型；

```ts
type MyType = number & string;
```

所以，在开发中，我们进行交叉时，通常是对对象类型进行交叉的：

就像接口的继承,当我们有多个接口需要组合的时候,可以使用接口继承的方法的,也可以使用交叉类型的方式

```ts
interface IInfo {
  name: string;
}

interface IAge {
  age: number;
}

type IPerson = IInfo & IAge;

const info: IPerson = {
  name: "tao",
  age: 19,
};
```
