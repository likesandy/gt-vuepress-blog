(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{405:function(a,s,t){"use strict";t.r(s);var e=t(26),n=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h2",{attrs:{id:"为什么需要-babel"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为什么需要-babel"}},[a._v("#")]),a._v(" 为什么需要 babel？")]),a._v(" "),t("ul",[t("li",[a._v("事实上，在开发中我们很少直接去接触 babel，但是 babel 对于前端开发来说，目前是不可缺少的一部分：\n"),t("ul",[t("li",[a._v("开发中，我们想要使用 "),t("strong",[a._v("ES6+的语法")]),a._v("，想要使用 "),t("strong",[a._v("TypeScript")]),a._v("，开发"),t("strong",[a._v("React 项目")]),a._v("，它们"),t("strong",[a._v("都是离不开 Babel 的")]),a._v("；")]),a._v(" "),t("li",[a._v("所以，"),t("strong",[a._v("学习 Babel")]),a._v(" 对于我们理解代码从编写到线上的转变过程至关重要；")])])]),a._v(" "),t("li",[a._v("那么，Babel 到底是什么呢？\n"),t("ul",[t("li",[a._v("Babel 是一个"),t("strong",[a._v("工具链")]),a._v("，主要用于旧浏览器或者环境中将 ECMAScript 2015+代码转换为向后兼容版本的\nJavaScript；")]),a._v(" "),t("li",[a._v("包括：语法转换、源代码转换等；")])])])]),a._v(" "),t("h2",{attrs:{id:"babel-命令行使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#babel-命令行使用"}},[a._v("#")]),a._v(" Babel 命令行使用")]),a._v(" "),t("ul",[t("li",[a._v("babel 本身可以作为一个独立的工具（和 postcss 一样），不和 webpack 等构建工具配置来单独使用。")]),a._v(" "),t("li",[a._v("如果我们希望在命令行尝试使用 babel，需要安装如下库：\n"),t("ul",[t("li",[a._v("@babel/core：babel 的核心代码，必须安装；")]),a._v(" "),t("li",[a._v("@babel/cli：可以让我们在命令行使用 babel；")])])])]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" @babel/cli @babel/core -D\n")])])]),t("ul",[t("li",[a._v("使用 babel 来处理我们的源代码：\n"),t("ul",[t("li",[a._v("src：是源文件的目录；")]),a._v(" "),t("li",[a._v("--out-dir：指定要输出的文件夹 dist；")])])])]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[a._v("npx babel src --out-dir dist\n")])])]),t("p",[a._v("比如我在根目录建立了一个 demo.js 的文件")]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// demo.js")]),a._v("\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" name "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"codertao"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function-variable function"}},[a._v("say")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token parameter"}},[a._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=>")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  console"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"你好啊"')]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),t("p",[a._v("接下来就通过 babel 将 demo.js 转换成根目录下的 text.js")]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[a._v("npx babel demo.js --out-file text.js\n")])])]),t("p",[t("img",{attrs:{src:"/frontEnd/pack/webpack/18.png",alt:""}})]),a._v(" "),t("p",[a._v("转换后发现感觉没有任何转换")]),a._v(" "),t("h2",{attrs:{id:"插件的使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#插件的使用"}},[a._v("#")]),a._v(" 插件的使用")]),a._v(" "),t("ul",[t("li",[a._v("比如我们需要转换箭头函数，那么我们就可以使用箭头函数转换相关的插件：")])]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" @babel/plugin-transform-arrow-functions -D\n")])])]),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[a._v("npx babel demo.js --out-file text.js --plugins"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("@babel/plugin-transform-arrow-functions\n")])])]),t("p",[t("img",{attrs:{src:"/frontEnd/pack/webpack/19.png",alt:""}})]),a._v(" "),t("ul",[t("li",[a._v("查看转换后的结果：我们会发现 const 并没有转成 var\n"),t("ul",[t("li",[a._v("这是因为 plugin-transform-arrow-functions，并没有提供这样的功能；")]),a._v(" "),t("li",[a._v("我们需要使用 plugin-transform-block-scoping 来完成这样的功能；")])])])]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" @babel/plugin-transform-block-scoping -D\n")])])]),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[a._v("npx babel demo.js --out-file text.js --plugins"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("@babel/plugin-transform-block-scoping,@babel/plugin-transform-arrow-functions\n")])])]),t("p",[t("img",{attrs:{src:"/frontEnd/pack/webpack/20.png",alt:""}})]),a._v(" "),t("h2",{attrs:{id:"babel-的预设-preset"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#babel-的预设-preset"}},[a._v("#")]),a._v(" Babel 的预设 preset")]),a._v(" "),t("ul",[t("li",[a._v("但是如果要转换的内容过多，一个个设置是比较麻烦的，我们可以使用预设（preset）：\n"),t("ul",[t("li",[a._v("后面我们再具体来讲预设代表的含义；")])])]),a._v(" "),t("li",[a._v("安装@babel/preset-env 预设：")])]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" @babel/preset-env -D\n")])])]),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[a._v("npx babel demo.js --out-file text.js --presets"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("@babel/preset-env\n")])])]),t("p",[t("img",{attrs:{src:"/frontEnd/pack/webpack/21.png",alt:""}})]),a._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),t("p",[a._v("所以一般开发我们就直接使用预设就可以了")])]),a._v(" "),t("h2",{attrs:{id:"babel-的底层原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#babel-的底层原理"}},[a._v("#")]),a._v(" Babel 的底层原理")]),a._v(" "),t("ul",[t("li",[a._v("babel 是如何做到将我们的一段代码（ES6、TypeScript、React）转成另外一段代码（ES5）的呢？\n"),t("ul",[t("li",[a._v("从一种"),t("strong",[a._v("源代码（原生语言）"),t("strong",[a._v("转换成")]),a._v("另一种源代码（目标语言）")]),a._v("，这是什么的工作呢？")]),a._v(" "),t("li",[a._v("就是"),t("strong",[a._v("编译器")]),a._v("，事实上我们可以将 babel 看成就是一个编译器")]),a._v(" "),t("li",[a._v("Babel 编译器的作用就是"),t("strong",[a._v("将我们的源代码")]),a._v("，转换成浏览器可以直接识别的"),t("strong",[a._v("另外一段源代码")]),a._v("；")])])]),a._v(" "),t("li",[a._v("Babel 也拥有编译器的工作流程：\n"),t("ul",[t("li",[a._v("解析阶段（Parsing）")]),a._v(" "),t("li",[a._v("转换阶段（Transformation）")]),a._v(" "),t("li",[a._v("生成阶段（Code Generation）")])])]),a._v(" "),t("li",[t("a",{attrs:{href:"https://github.com/jamiebuilds/the-super-tiny-compiler",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://github.com/jamiebuilds/the-super-tiny-compiler"),t("OutboundLink")],1)])]),a._v(" "),t("h2",{attrs:{id:"babel-编译器执行原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#babel-编译器执行原理"}},[a._v("#")]),a._v(" Babel 编译器执行原理")]),a._v(" "),t("ul",[t("li",[a._v("Babel 的执行阶段")])]),a._v(" "),t("p",[t("img",{attrs:{src:"/frontEnd/pack/webpack/22.png",alt:""}})]),a._v(" "),t("ul",[t("li",[a._v("当然，这只是一个简化版的编译器工具流程，在每个阶段又会有自己具体的工作：")])]),a._v(" "),t("p",[t("img",{attrs:{src:"/frontEnd/pack/webpack/23.png",alt:""}})]),a._v(" "),t("h2",{attrs:{id:"babel-loader"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#babel-loader"}},[a._v("#")]),a._v(" babel-loader")]),a._v(" "),t("ul",[t("li",[a._v("在实际开发中，我们通常会在构建工具中通过配置 babel 来对其进行使用的，比如在 webpack 中。")]),a._v(" "),t("li",[a._v("那么我们就需要去安装相关的依赖：\n"),t("ul",[t("li",[a._v("如果之前已经安装了@babel/core，那么这里不需要再次安装；")])])])]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" babel-loader @babel/core\n")])])]),t("ul",[t("li",[a._v("我们可以设置一个规则，在加载 js 文件时，使用我们的 babel：")])]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 其他省略")]),a._v("\nmodule"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  rules"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n      test"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token regex"}},[t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[a._v("/")]),t("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[a._v("\\.js$")]),t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[a._v("/")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n      use"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n        loader"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"babel-loader"')]),a._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n")])])]),t("h2",{attrs:{id:"指定使用的插件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#指定使用的插件"}},[a._v("#")]),a._v(" 指定使用的插件")]),a._v(" "),t("ul",[t("li",[a._v("我们必须指定使用的插件才会生效")])]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  test"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token regex"}},[t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[a._v("/")]),t("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[a._v("\\.js$")]),t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[a._v("/")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  use"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    loader"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"babel-loader"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    options"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n      plugins"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"@babel/plugin-transform-block-scoping"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"@babel/plugin-transform-arrow-functions"')]),a._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("h2",{attrs:{id:"babel-preset"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#babel-preset"}},[a._v("#")]),a._v(" babel-preset")]),a._v(" "),t("ul",[t("li",[t("p",[a._v("如果我们一个个去安装使用插件，那么需要手动来管理大量的 babel 插件，我们可以直接给 webpack 提供一个\npreset，webpack 会根据我们的预设来加载对应的插件列表，并且将其传递给 babel。")])]),a._v(" "),t("li",[t("p",[a._v("比如常见的预设有三个：")]),a._v(" "),t("ul",[t("li",[a._v("env")]),a._v(" "),t("li",[a._v("react")]),a._v(" "),t("li",[a._v("TypeScript")])])]),a._v(" "),t("li",[t("p",[a._v("安装 preset-env：")])])]),a._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("npm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" @babel/preset-env\n")])])]),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  test"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token regex"}},[t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[a._v("/")]),t("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[a._v("\\.js$")]),t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[a._v("/")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n  use"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    loader"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"babel-loader"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n    options"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n      presets"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"@babel/preset-env"')]),a._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("h2",{attrs:{id:"babel-的配置文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#babel-的配置文件"}},[a._v("#")]),a._v(" Babel 的配置文件")]),a._v(" "),t("ul",[t("li",[a._v("像之前一样，我们可以将 babel 的配置信息放到一个独立的文件中，babel 给我们提供了两种配置文件的编写：\n"),t("ul",[t("li",[a._v("babel.config.json（或者.js，.cjs，.mjs）文件；")]),a._v(" "),t("li",[a._v(".babelrc.json（或者.babelrc，.js，.cjs，.mjs）文件；")])])]),a._v(" "),t("li",[a._v("它们两个有什么区别呢？目前很多的项目都采用了多包管理的方式（babel 本身、element-plus、umi 等）；\n"),t("ul",[t("li",[a._v(".babelrc.json：早期使用较多的配置方式，但是对于配置 Monorepos 项目是比较麻烦的；")]),a._v(" "),t("li",[a._v("rc(运行时编译)")]),a._v(" "),t("li",[a._v("babel.config.json（babel7）：可以直接作用于 Monorepos 项目的子包，更加推荐；")])])])]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[a._v("module"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("exports "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n  presets"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"@babel/preset-env"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);