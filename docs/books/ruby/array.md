---
title: Array
---

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

**描述**

与 fill()不同，copyWithin()会按照指定范围浅复制数组中的部分内容，然后将它们插入到指
定索引开始的位置。开始索引和结束索引则与 fill()使用同样的计算方法

参数 target、start 和 end 必须为整数。

如果 start 为负，则其指定的索引位置等同于 length+start，length 为数组的长度。end 也是如此。

copyWithin 方法不要求其 this 值必须是一个数组对象；除此之外，copyWithin 是一个可变方法，它可以改变 this 对象本身，并且返回它，而不仅仅是它的拷贝。

```js
const array1 = ["a", "b", "c", "d", "e"];
console.log(array1.copyWithin(0, 3, 4)); // ["d", "b", "c", "d", "e"]
console.log(array1.copyWithin(1, 3)); // ["d", "d", "e", "d", "e"]
console.log(array1.copyWithin(3)); // ['a','b','c','a','b'];
console.log(array1.copyWithin(-2, -4, -3)); // ['a','b','c','b','e'];
```

## 转换方法

### Array.prototype.toString()

toString() 返回一个字符串，表示指定的数组及其元素。

**语法**

```ts
Array.toString(): string
```

**返回值**

- 一个表示指定的数组及其元素的字符串。

**描述**

Array 对象覆盖了 Object 的 toString 方法。对于数组对象，toString 方法连接数组并返回一个字符串，其中包含用逗号分隔的每个数组元素。

当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 toString 方法。

前面提到过，所有对象都有 toLocaleString()、toString()和 valueOf()方法。其中，valueOf()
返回的还是数组本身。而 toString()返回由数组中每个值的等效字符串拼接而成的一个逗号分隔的
字符串。也就是说，对数组的每个值都会调用其 toString()方法，以得到最终的字符串。

```js
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
alert(colors.toString()); // red,blue,green
alert(colors.valueOf()); // red,blue,green
alert(colors); // red,blue,green
```

首先是被**显式调用**的 toString()和 valueOf()方法，它们分别返回了数组的字符串表示，即将所有字符串组合起来，以逗号分隔。最后一行代码直接用 alert()显示数组，因为 alert()期待字符
串，所以会在后台调用数组的 toString()方法，从而得到跟前面一样的结果。

### Array.prototype.toLocaleString()

toLocaleString() 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。

**语法**

```ts
Array.toLocaleString(locales?: string | array ,options?): string
```

**参数**

- locales
  - 带有 BCP 47 语言标记的字符串或字符串数组，关于 locales 参数的形式与解释，请看 Intl 页面。
- options
  - 一个可配置属性的对象，对于数字 Number.prototype.toLocaleString()，对于日期 Date.prototype.toLocaleString().

**返回值**

- 表示数组元素的字符串。

**描述**
数组中的元素将会使用各自的 toLocaleString 方法：

- Object: Object.prototype.toLocaleString()
- Number: Number.prototype.toLocaleString()
- Date: Date.prototype.toLocaleString()

```js
let prices = ["￥7", 500, 8123, 12];
prices.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });

// "￥7,￥500,￥8,123,￥12"
```

toLocaleString()方法也可能返回跟 toString()和 valueOf()相同的结果，但也不一定。在
调用数组的 toLocaleString()方法时，会得到一个逗号分隔的数组值的字符串。它与另外两个方法
唯一的区别是，为了得到最终的字符串，会调用数组每个值的 toLocaleString()方法，而不是
toString()方法。

```js
let person1 = {
  toLocaleString() {
    return "Nikolaos";
  },
  toString() {
    return "Nicholas";
  },
};
let person2 = {
  toLocaleString() {
    return "Grigorios";
  },
  toString() {
    return "Greg";
  },
};
let people = [person1, person2];
alert(people); // Nicholas,Greg
alert(people.toString()); // Nicholas,Greg
alert(people.toLocaleString()); // Nikolaos,Grigorios
```

这里定义了两个对象 person1 和 person2，它们都定义了 toString()和 toLocaleString()方
法，而且返回不同的值。然后又创建了一个包含这两个对象的数组 people。在将数组传给 alert()时，
输出的是"Nicholas,Greg"，这是因为会在数组每一项上调用 toString()方法（与下一行显式调用
toString()方法结果一样）。而在调用数组的 toLocaleString()方法时，结果变成了"Nikolaos,
Grigorios"，这是因为调用了数组每一项的 toLocaleString()方法。

### Array.prototype.join()

join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

```ts
Array.join(separator?: string): string
```

**参数**

- separator
  - 指定一个字符串来分隔数组的每个元素。如果需要，将分隔符转换为字符串。如果缺省该值，数组元素用逗号（,）分隔。如果 separator 是空字符串("")，则所有元素之间都没有任何字符。

**返回值**

- 一个所有数组元素连接的字符串。如果 arr.length 为 0，则返回空字符串。

**描述**

所有的数组元素被转换成字符串，再用一个分隔符将这些字符串连接起来。

```js
let colors = ["red", "green", "blue"];
alert(colors.join(",")); // red,green,blue
alert(colors.join("||")); // red||green||blue
```

这里在 colors 数组上调用了 join()方法，得到了与调用 toString()方法相同的结果。传入逗
号，结果就是逗号分隔的字符串。最后一行给 join() 传入了双竖线，得到了字符串
"red||green||blue"。如果不给 join()传入任何参数，或者传入 undefined，则仍然使用逗号作为
分隔符。

::: warning
如果数组中某一项是 null 或 undefined，则在 join()、toLocaleString()、
toString()和 valueOf()返回的结果中会以空字符串表示
:::

```js
let a = ["Wind", "Rain", undefined, null];
let myVar1 = a.join(); // myVar1的值变为"Wind,Rain,,"
```

## 栈方法

ECMAScript 给数组提供几个方法，让它看起来像是另外一种数据结构。数组对象可以像栈一样，
也就是一种限制插入和删除项的数据结构。栈是一种**后进先出**（LIFO，Last-In-First-Out）的结构，也就
是最近添加的项先被删除。数据项的插入（称为**推入**，push）和删除（称为**弹出**，pop）只在栈的一个
地方发生，即栈顶。ECMAScript 数组提供了 push()和 pop()方法，以实现类似栈的行为。

push()方法接收任意数量的参数，并将它们添加到数组末尾，返回数组的最新长度。pop()方法则
用于删除数组的最后一项，同时减少数组的 length 值，返回被删除的项。

```js
let colors = new Array(); // 创建一个数组
let count = colors.push("red", "green"); // 推入两项
alert(count); // 2
count = colors.push("black"); // 再推入一项
alert(count); // 3
let item = colors.pop(); // 取得最后一项
alert(item); // black
alert(colors.length); // 2
```

这里创建了一个当作栈来使用的数组（注意不需要任何额外的代码，push()和 pop()都是数组的
默认方法）。首先，使用 push()方法把两个字符串推入数组末尾，将结果保存在变量 count 中（结果
为 2）。

然后，再推入另一个值，再把结果保存在 count 中。因为现在数组中有 3 个元素，所以 push()返
回 3。在调用 pop()时，会返回数组的最后一项，即字符串"black"。此时数组还有两个元素。

栈方法可以与数组的其他任何方法一起使用

```js
let colors = ["red", "blue"];
colors.push("brown"); // 再添加一项
colors[3] = "black"; // 添加一项
alert(colors.length); // 4
let item = colors.pop(); // 取得最后一项
alert(item); // black
```

这里先初始化了包含两个字符串的数组，然后通过 push()添加了第三个值，第四个值是通过直接
在位置 3 上赋值添加的。调用 pop()时，返回了字符串"black"，也就是最后添加到数组的字符串。

## 搜索和位置方法

ECMAScript 提供两类搜索数组的方法：按**严格相等搜索**和**按断言函数搜索**。

### 严格相等

ECMAScript 提供了 3 个严格相等的搜索方法：`indexOf()`、`lastIndexOf()`和 `includes()`。其
中，前两个方法在所有版本中都可用，而第三个方法是 ECMAScript 7 新增的。这些方法都接收两个参
数：要查找的元素和一个可选的起始搜索位置。`indexOf()`和 `includes()`方法从数组前头（第一项）
开始向后搜索，而 `lastIndexOf()`从数组末尾（最后一项）开始向前搜索。

`indexOf()`和 `lastIndexOf()`都返回要查找的元素在数组中的位置，如果没找到则返回 1。
`includes()`返回布尔值，表示是否至少找到一个与指定元素匹配的项。在比较第一个参数跟数组每一
项时，会使用全等（===）比较，也就是说两项必须严格相等。下面来看一些例子：

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
alert(numbers.indexOf(4)); // 3
alert(numbers.lastIndexOf(4)); // 5
alert(numbers.includes(4)); // true
alert(numbers.indexOf(4, 4)); // 5
alert(numbers.lastIndexOf(4, 4)); // 3
alert(numbers.includes(4, 7)); // false
let person = { name: "Nicholas" };
let people = [{ name: "Nicholas" }];
let morePeople = [person];
alert(people.indexOf(person)); // -1
alert(morePeople.indexOf(person)); // 0
alert(people.includes(person)); // false
alert(morePeople.includes(person)); // true
```

:::tip
lastIndexOf 是从后往前进行搜索,得到的值是从前往后的下标值

上述代码通过画内存图可以很方便的得出答案
:::

### 断言函数

ECMAScript 也允许按照定义的断言函数搜索数组，每个索引都会调用这个函数。断言函数的返回
值决定了相应索引的元素是否被认为匹配。

断言函数接收 3 个参数：元素、索引和数组本身。其中元素是数组中当前搜索的元素，索引是当前
元素的索引，而数组就是正在搜索的数组。断言函数返回真值，表示是否匹配。

`find()`和 `findIndex()`方法使用了断言函数。这两个方法都从数组的最小索引开始。find()返回
第一个匹配的元素，`findIndex()`返回第一个匹配元素的索引。这两个方法也都接收第二个可选的参数，
用于指定断言函数内部 this 的值。

```js
const people = [
  {
    name: "Matt",
    age: 27,
  },
  {
    name: "Nicholas",
    age: 29,
  },
];
alert(people.find((element, index, array) => element.age < 28));
// {name: "Matt", age: 27}
alert(people.findIndex((element, index, array) => element.age < 28));
// 0
```

找到匹配项后，这两个方法都不再继续搜索。

```js
const evens = [2, 4, 6];
// 找到匹配后，永远不会检查数组的最后一个元素
evens.find((element, index, array) => {
  console.log(element);
  console.log(index);
  console.log(array);
  return element === 4;
});
// 2
// 0
// [2, 4, 6]
// 4
// 1
// [2, 4, 6]
```

## 迭代方法

ECMAScript 为数组定义了 5 个迭代方法。每个方法接收两个参数：以每一项为参数运行的函数，
以及可选的作为函数运行上下文的作用域对象（影响函数中 this 的值）。传给每个方法的函数接收 3
个参数：数组元素、元素索引和数组本身。因具体方法而异，这个函数的执行结果可能会也可能不会影
响方法的返回值。数组的 5 个迭代方法如下。

- `every()`：对数组每一项都运行传入的函数，如果对每一项函数都返回 true，则这个方法返回 true。

- `filter()`：对数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回。

- `forEach()`：对数组每一项都运行传入的函数，没有返回值。

- `map()`：对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。

- `some()`：对数组每一项都运行传入的函数，如果有一项函数返回 true，则这个方法返回 true。

这些方法都不改变调用它们的数组。

在这些方法中，`every()`和 `some()`是最相似的，都是从数组中搜索符合某个条件的元素。对 `every()`
来说，传入的函数必须对每一项都返回 true，它才会返回 true；否则，它就返回 false。而对 `some()`
来说，只要有一项让传入的函数返回 true，它就会返回 true。下面是一个例子：

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let everyResult = numbers.every((item, index, array) => item > 2);
alert(everyResult); // false
let someResult = numbers.some((item, index, array) => item > 2);
alert(someResult); // true
```

以上代码调用了 `every()`和 `some()`，传入的函数都是在给定项大于 2 时返回 true。`every()`返
回 false 是因为并不是每一项都能达到要求。而 `some()`返回 true 是因为至少有一项满足条件。

下面再看一看 filter()方法。这个方法基于给定的函数来决定某一项是否应该包含在它返回的数
组中。比如，要返回一个所有数值都大于 2 的数组，可以使用如下代码：

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let filterResult = numbers.filter((item, index, array) => item > 2);
alert(filterResult); // 3,4,5,4,3
```
这里，调用 filter()返回的数组包含 3、4、5、4、3，因为只有对这些项传入的函数才返回 true。
这个方法非常适合从数组中筛选满足给定条件的元素。

接下来 map()方法也会返回一个数组。这个数组的每一项都是对原始数组中同样位置的元素运行传
入函数而返回的结果。例如，可以将一个数组中的每一项都乘以 2，并返回包含所有结果的数组，如下
所示：

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let mapResult = numbers.map((item, index, array) => item * 2);
alert(mapResult); // 2,4,6,8,10,8,6,4,2
```

以上代码返回了一个数组，包含原始数组中每个值乘以 2 的结果。这个方法非常适合创建一个与原
始数组元素一一对应的新数组。

最后，再来看一看 forEach()方法。这个方法只会对每一项运行传入的函数，没有返回值。本质
上，forEach()方法相当于使用 for 循环遍历数组。比如：

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.forEach((item, index, array) => {
 // 执行某些操作
}); 
```

数组的这些迭代方法通过执行不同操作方便了对数组的处理。


