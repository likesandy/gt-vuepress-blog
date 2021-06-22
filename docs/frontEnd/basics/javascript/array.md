---
title: Array
---

## Array

除了 Object，Array 应该就是 ECMAScript 中最常用的类型了。ECMAScript 数组跟其他编程语言
的数组有很大区别。跟其他语言中的数组一样，ECMAScript 数组也是一组有序的数据，但跟其他语言
不同的是，数组中每个槽位可以存储**任意类型**的数据。这意味着可以创建一个数组，它的第一个元素
是字符串，第二个元素是数值，第三个是对象。ECMAScript 数组也是动态大小的，会随着数据添加而
自动增长

## 创建数组

创建数组有 4 种方法

- [Array 构造函数](./array.html#创建数组)
- [数组字面量](./array.html#数组字面量)
- [from()]()
- [of()]()

### 构造函数

**语法**

```ts
// Array(arrayLength?: number) => any[]
let colors = new Array();
```

如果知道数组中元素的数量，那么可以给构造函数传入一个数值，然后 length 属性就会被自动创
建并设置为这个值

```js
let colors = new Array(20);
```

也可以给 Array 构造函数传入要保存的元素

```js
let colors = new Array("red", "blue", "green");
```

创建数组时可以给构造函数传一个值。这时候就有点问题了，因为如果这个值是数值，则会创建一
个长度为指定数值的数组；而如果这个值是其他类型的，则会创建一个只包含该特定值的数组

```js
let colors = new Array(3); // 创建一个包含 3 个元素的数组
let names = new Array("Greg"); // 创建一个只包含一个元素，即字符串"Greg"的数组
```

在使用 Array 构造函数时，也可以**省略 new 操作符**。结果是一样的

```js
let colors = Array(3); // 创建一个包含 3 个元素的数组
let names = Array("Greg"); // 创建一个只包含一个元素，即字符串"Greg"的数组
```

### 数组字面量

数组字面量是在中括号中包含以
逗号分隔的元素列表

```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个元素的数组
let names = []; // 创建一个空数组
let values = [1, 2]; // 创建一个包含 2 个元素的数组
```

:::warning
与对象一样，在使用数组字面量表示法创建数组**不会调用** Array 构造函数。
:::

### from

Array.from() 方法从一个类似数组或可迭代对象**创建一个新的**，浅拷贝的数组**实例**。

**语法**

```ts
from(iterable: Iterable<any> | ArrayLike<any>, mapfn: (v: any, k: number) => number, thisArg?: any): any[]
```

**参数**

- arrayLike
  - 想要转换成数组的**伪数组对象**或**可迭代对象**。
- mapFn?(可选)
  - 如果指定了该参数，新数组中的每个元素会执行该回调函数。
- thisArg?(可选)
  - 可选参数，执行回调函数 mapFn 时 this 对象。

**返回值**

一个新的数组实例

**描述**

Array.from()的第一个参数是一个类数组对象，即任何可迭代的结构，或者有一个 length 属性
和可索引元素的结构。

```js
// 字符串会被拆分为单字符数组
console.log(Array.from("Matt")); // ["M", "a", "t", "t"]
// 可以使用 from()将集合和映射转换为一个新数组
const m = new Map().set(1, 2).set(3, 4);
const s = new Set()
  .add(1)
  .add(2)
  .add(3)
  .add(4);
console.log(Array.from(m)); // [[1, 2], [3, 4]]
console.log(Array.from(s)); // [1, 2, 3, 4]
// Array.from()对现有数组执行浅复制
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1);
console.log(a1); // [1, 2, 3, 4]
alert(a1 === a2); // false
// 可以使用任何可迭代对象
const iter = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  },
};
console.log(Array.from(iter)); // [1, 2, 3, 4]
```

Array.from()还接收第二个可选的映射函数参数。这个函数可以直接增强新数组的值，而无须像
调用 Array.from().map()那样先创建一个中间数组。

```js
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1, (x) => x ** 2);
console.log(a2); // [1, 4, 9, 16]
```

还可以接收第三个可选参数，用于指定映射函
数中 this 的值。但这个重写的 this 值在箭头函数中不适用。

```js
const a3 = Array.from(
  a1,
  function(x) {
    return x ** this.exponent;
  },
  { exponent: 2 }
);
console.log(a3); // [1, 4, 9, 16]
```

### of

Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

**语法**

```ts
Array.of(...items: any[]): any[]
```

**参数**

- items
  - 可扩展性的 item

**返回值**

一个新的数组实例

**描述**

这个方法用于替代在 ES6 之前常用的 Array.prototype.
slice.call(arguments)，一种**异常笨拙**的将 arguments 对象转换为数组的写法

```js
console.log(Array.of(1, 2, 3, 4)); // [1, 2, 3, 4]
console.log(Array.of(undefined)); // [undefined]
```

Array.of() 和 Array 构造函数之间的区别在于处理整数参数

```js
Array(7); // [ , , , , , , ] 创建一个长度为 7 的空数组 这是指一个有 7 个空位(empty)的数组，而不是由 7 个 undefined 组成的数组
Array(1, 2, 3); // [1, 2, 3]

Array.of(7); // [7] 创建一个具有单个元素 7 的数组
Array.of(1, 2, 3); // [1, 2, 3]
```

## 数组空位

使用数组字面量初始化数组时，可以使用一串逗号来创建空位（hole）。ECMAScript 会将逗号之间
相应索引位置的值当成空位，ES6 规范重新定义了该如何处理这些空位

```js
const options = [, , , , ,]; // 创建包含 5 个元素的数组
console.log(options.length); // 5
console.log(options); // [,,,,,]
```

ES6 新增的方法和迭代器与早期 ECMAScript 版本中存在的方法行为不同。ES6 新增方法普遍将这
些空位当成存在的元素，只不过值为 undefined：

```js
const options = [1, , , , 5];
for (const option of options) {
  console.log(option === undefined);
}
// false
// true
// true
// true
// false

const a = Array.from([, , ,]); // 使用 ES6 的 Array.from()创建的包含 3 个空位的数组
for (const val of a) {
  alert(val === undefined);
}
// true
// true
// true
alert(Array.of(...[, , ,])); // [undefined, undefined, undefined]
for (const [index, value] of options.entries()) {
  alert(value);
}
// 1
// undefined
// undefined
// undefined
// 5
```

ES6 之前的方法则会忽略这个空位，但具体的行为也会因方法而异：

```js
const options = [1, , , , 5];
// join()视空位置为空字符串
console.log(options.join("-")); // "1----5"
// map()会跳过空位置
console.log(options.map(() => 6)); // [6, undefined, undefined, undefined, 6]
```

:::warning
由于行为不一致和存在性能隐患，因此实践中要**避免使用**数组空位。如果确实需要
空位，则可以显式地用 undefined 值代替。
:::

## 数组索引

要取得或设置数组的值，需要使用中括号并提供相应值的数字索引

```js
let colors = ["red", "blue", "green"]; // 定义一个字符串数组
alert(colors[0]); // 显示第一项
colors[2] = "black"; // 修改第三项
colors[3] = "brown"; // 添加第四项
```

在中括号中提供的索引表示要访问的值。如果索引小于数组包含的元素数，则返回存储在相应位置
的元素，就像示例中 colors[0]显示"red"一样。设置数组的值方法也是一样的，就是替换指定位置的
值。如果把一个值设置给超过数组最大索引的索引，就像示例中的 colors[3]，则数组长度会自动扩
展到该索引值加 1（示例中设置的索引 3，所以数组长度变成了 4）。

数组中元素的数量保存在 length 属性中，这个属性始终返回 0 或大于 0 的值

```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
let names = []; // 创建一个空数组
alert(colors.length); // 3
alert(names.length); // 0
```

数组 length 属性的独特之处在于，它不是只读的。通过修改 length 属性，可以从数组末尾删除或添加元素。

```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors.length = 2;
alert(colors[2]); // undefined
```

这里，数组 colors 一开始有 3 个值。将 length 设置为 2，就删除了最后一个（位置 2 的）值，
因此 colors[2]就没有值了。如果将 length 设置为大于数组元素数的值，则新添加的元素都将以
undefined 填充

```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors.length = 4;
alert(colors[3]); // undefined
```

这里将数组 colors 的 length 设置为 4，虽然数组只包含 3 个元素。位置 3 在数组中不存在，因
此访问其值会返回特殊值 undefined。
使用 length 属性可以方便地向数组末尾添加元素

```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors[colors.length] = "black"; // 添加一种颜色（位置 3）
colors[colors.length] = "brown"; // 再添加一种颜色（位置 4）
```

数组中最后一个元素的索引始终是 length - 1，因此下一个新增槽位的索引就是 length。每次
在数组最后一个元素后面新增一项，数组的 length 属性都会自动更新，以反映变化。这意味着第二行
的 colors[colors.length]会在位置 3 添加一个新元素，下一行则会在位置 4 添加一个新元素。新的
长度会在新增元素被添加到当前数组外部的位置上时自动更新。换句话说，就是 length 属性会更新为
位置加上 1，

```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors[99] = "black"; // 添加一种颜色（位置 99）
alert(colors.length); // 100
```

这里，colors 数组有一个值被插入到位置 99，结果新 length 就变成了 100（99 + 1）。这中间的
所有元素，即位置 3~98，实际上并不存在，因此在访问时会返回 undefined。

:::warning
这里，colors 数组有一个值被插入到位置 99，结果新 length 就变成了 100（99 + 1）。这中间的
所有元素，即位置 3~98，实际上并不存在，因此在访问时会返回 undefined。
:::
我觉得讲的太书面化了,从内存的角度来讲述是很简单的

数组属于引用数据类型,引用数据类型都会在堆中分配内存

```js
let colors = ["pink", "red", "blue"];
```

上述 js 代码在堆内存的表现就是

![](/frontEnd/basics/5.png)

在堆中开辟了一块 colors 的空间,把这个空间分成了 3 份,索引相当于就是特殊标识,比如人的特殊标识就是身份证,每个人的身份信息都是独一无二的,只不过数组的内存的索引是从 0 开始算的,不是我们常规中的 1 开始

## 检测数组

一个经典的 ECMAScript 问题是判断一个对象是不是数组。在只有一个网页（因而只有一个全局作
用域）的情况下，使用 instanceof 操作符就足矣

```js
let colors = ["red"];
if (colors instanceof Array) {
  console.log(true); // true
}
```

使用 instanceof 的问题是假定只有一个全局执行上下文。如果网页里有多个框架，则可能涉及两
个不同的全局执行上下文，因此就会有两个不同版本的 Array 构造函数。如果要把数组从一个框架传
给另一个框架，则这个数组的构造函数将有别于在第二个框架内本地创建的数组。

为解决这个问题，ECMAScript 提供了 Array.isArray()方法。这个方法的目的就是确定一个值是
否为数组，而不用管它是在哪个全局执行上下文中创建的。

```js
let colors = ["red"];
if (Array.isArray(colors)) {
  console.log(true); // true
}
```

**instanceof 和 isArray**

当检测 Array 实例时, Array.isArray 优于 instanceof,因为 Array.isArray 能检测 iframes.

## 迭代器方法

在 ES6 中，Array 的原型上暴露了 3 个用于检索数组内容的方法：keys()、values()和
entries()。keys()返回数组索引的迭代器，values()返回数组元素的迭代器，而 entries()返回
索引/值对的迭代器

```js
const a = ["foo", "bar", "baz", "qux"];
// 因为这些方法都返回迭代器，所以可以将它们的内容
// 通过 Array.from()直接转换为数组实例
const aKeys = Array.from(a.keys());
const aValues = Array.from(a.values());
const aEntries = Array.from(a.entries());
console.log(aKeys); // [0, 1, 2, 3]
console.log(aValues); // ["foo", "bar", "baz", "qux"]
console.log(aEntries); // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]
```

使用 ES6 的解构可以非常容易地在循环中拆分键/值对(for...of..循环来遍历)

```js
const a = ["foo", "bar", "baz", "qux"];
for (const [idx, element] of a.entries()) {
  alert(idx);
  alert(element);
}
// 0
// foo
// 1
// bar
// 2
// baz
// 3
// qux
```

## 复制和填充方法

### Array.prototype.fill()

fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

**语法**

```ts
fill(value: number, start?: number, end?: number): this
```

**参数**

- value
  - 用来填充数组元素的值
- start
  - 起始索引，默认值为 0
- end
  - 终止索引，默认值为 **this.length**

**返回值**

- 修改后的数组

**描述**
如果 start 是个负数, 则开始索引会被自动计算成为 length+start, 其中 length 是 this 对象的 length 属性值。如果 end 是个负数, 则结束索引会被自动计算成为 length+end。

fill 方法故意被设计成通用方法, 该方法不要求 this 是数组对象。

fill 方法是个可变方法, 它会改变调用它的 this 对象本身, 然后返回它, 而并不是返回一个副本。

当一个对象被传递给 fill 方法的时候, 填充数组的是这个对象的引用。

```js
const zeroes = [0, 0, 0, 0, 0];
// 用 5 填充整个数组
zeroes.fill(5);
console.log(zeroes); // [5, 5, 5, 5, 5]
zeroes.fill(0); // 重置
// 用 6 填充索引大于等于 3 的元素
zeroes.fill(6, 3);
console.log(zeroes); // [0, 0, 0, 6, 6]
zeroes.fill(0); // 重置
// 用 7 填充索引大于等于 1 且小于 3 的元素
zeroes.fill(7, 1, 3);
console.log(zeroes); // [0, 7, 7, 0, 0];
zeroes.fill(0); // 重置
// 用 8 填充索引大于等于 1 且小于 4 的元素
// (-4 + zeroes.length = 1)
// (-1 + zeroes.length = 4)
zeroes.fill(8, -4, -1);
console.log(zeroes); // [0, 8, 8, 8, 0];
```

如果 start 是个负数, 则开始索引会被自动计算成为 length+start, 其中 length 是 this 对象的 length 属性值。如果 end 是个负数, 则结束索引会被自动计算成为 length+end。

fill()静默忽略超出数组边界、零长度及方向相反的索引范围：

```js
const zeroes = [0, 0, 0, 0, 0];
// 索引过低，忽略
zeroes.fill(1, -10, -6);
console.log(zeroes); // [0, 0, 0, 0, 0]
// 索引过高，忽略
zeroes.fill(1, 10, 15);
console.log(zeroes); // [0, 0, 0, 0, 0]
// 索引反向，忽略
zeroes.fill(2, 4, 2);
console.log(zeroes); // [0, 0, 0, 0, 0]
// 索引部分可用，填充可用部分
zeroes.fill(4, 3, 10);
console.log(zeroes); // [0, 0, 0, 4, 4]
```

fill 方法故意被设计成通用方法, 该方法不要求 this 是数组对象。

当一个对象被传递给 fill 方法的时候, 填充数组的是这个对象的引用。

```js
let arr = Array(3).fill({}); // [{}, {}, {}];
// 需要注意如果fill的参数为引用类型，会导致都执行都一个引用类型
// 如 arr[0] === arr[1] 为true
arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
```

### Array.prototype.copyWithin()

copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

**语法**

```ts
copyWithin(target: number, start: number, end?: number): this
```

**参数**

- target
  - 0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。
  - 如果 target 大于等于 arr.length，将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。
- start
  - 0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。
  - 如果 start 被忽略，copyWithin 将会从 0 开始复制。
- end
  - 0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。
  - 如果 end 被忽略，copyWithin 方法将会一直复制至数组结尾（默认为 arr.length）。

**返回值**

- 改变后的数组。
