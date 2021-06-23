(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{408:function(t,a,s){"use strict";s.r(a);var n=s(26),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"认识-plugin"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#认识-plugin"}},[t._v("#")]),t._v(" 认识 Plugin")]),t._v(" "),s("ul",[s("li",[t._v("Webpack 的另一个核心是 Plugin，官方有这样一段对 Plugin 的描述：\n"),s("ul",[s("li",[t._v("While loaders are used to transform certain types of modules, plugins can be leveraged to perform a\nwider range of tasks like bundle optimization, asset management and injection of environment\nvariables.")])])]),t._v(" "),s("li",[t._v("上面表达的含义翻译过来就是：\n"),s("ul",[s("li",[t._v("Loader 是用于"),s("strong",[t._v("特定的模块类型")]),t._v("进行转换；")]),t._v(" "),s("li",[t._v("Plugin 可以用于"),s("strong",[t._v("执行更加广泛的任务")]),t._v("，比如打包优化、资源管理、环境变量注入等；")])])])]),t._v(" "),s("h2",{attrs:{id:"cleanwebpackplugin"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cleanwebpackplugin"}},[t._v("#")]),t._v(" CleanWebpackPlugin")]),t._v(" "),s("ul",[s("li",[t._v("前面我们演示的过程中，每次修改了一些配置，重新打包时，都需要"),s("strong",[t._v("手动删除 dist 文件夹")]),t._v("：\n"),s("ul",[s("li",[t._v("我们可以借助于一个插件来帮助我们完成，这个插件就是"),s("strong",[t._v("CleanWebpackPlugin")]),t._v("；")])])]),t._v(" "),s("li",[t._v("首先，我们先安装这个插件：")])]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" clean-webpack-plugin -D\n")])])]),s("ul",[s("li",[t._v("之后在插件中配置：")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" CleanWebpackPlugin "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"clean-webpack-plugin"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 其他地方省略")]),t._v("\n  plugins"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("CleanWebpackPlugin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"htmlwebpackplugin"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#htmlwebpackplugin"}},[t._v("#")]),t._v(" HtmlWebpackPlugin")]),t._v(" "),s("ul",[s("li",[t._v("另外还有一个不太规范的地方：\n"),s("ul",[s("li",[t._v("我们的 HTML 文件是编写在根目录下的，而最终打包的 "),s("strong",[t._v("dist 文件夹中是没有 index.html 文件")]),t._v("的。(事实上我们根目录是不需要 index.html 文件,以外这个插件内部有一个 ejs 模板会帮我们渲染出来,这涉及到源码的知识,后期阅读源码的时候再来进行讲解)")]),t._v(" "),s("li",[t._v("在"),s("strong",[t._v("进行项目部署")]),t._v("的时，必然也是需要"),s("strong",[t._v("有对应的入口文件 index.html")]),t._v("；")]),t._v(" "),s("li",[t._v("所以我们也需要"),s("strong",[t._v("对 index.html 进行打包处理")]),t._v(";")])])]),t._v(" "),s("li",[t._v("对 HTML 进行打包处理我们可以使用另外一个插件："),s("strong",[t._v("HtmlWebpackPlugin")]),t._v("；")])]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" html-webpack-plugin -D\n")])])]),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" HtmlWebpackPlugin "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"html-webpack-plugin"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 其它省略")]),t._v("\n  plugins"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("HtmlWebpackPlugin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[s("img",{attrs:{src:"/frontEnd/pack/webpack/9.png",alt:""}})]),t._v(" "),s("h2",{attrs:{id:"生成-index-html-分析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生成-index-html-分析"}},[t._v("#")]),t._v(" 生成 index.html 分析")]),t._v(" "),s("ul",[s("li",[t._v("我们会发现，现在自动在 dist 文件夹中，生成了一个 index.html 的文件：\n"),s("ul",[s("li",[t._v("该文件中也自动添加了我们打包的 bundle.js 文件；")])])]),t._v(" "),s("li",[t._v("这个文件是如何生成的呢？\n"),s("ul",[s("li",[t._v("默认情况下是根据"),s("strong",[t._v("ejs 的一个模板")]),t._v("来生成的；")]),t._v(" "),s("li",[t._v("在 html-webpack-plugin 的源码中，有一个 default_index.ejs 模块；")])])])]),t._v(" "),s("h2",{attrs:{id:"自定义-html-模板"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自定义-html-模板"}},[t._v("#")]),t._v(" 自定义 HTML 模板")]),t._v(" "),s("ul",[s("li",[t._v("如果我们想在自己的模块中加入一些比较特别的内容：\n"),s("ul",[s("li",[t._v("比如添加一个 noscript 标签，在用户的 JavaScript 被关闭时，给予响应的提示；")]),t._v(" "),s("li",[t._v("比如在开发 vue 或者 react 项目时，我们需要一个可以挂载后续组件的根标签 ；")])])]),t._v(" "),s("li",[t._v("这个我们需要一个属于自己的 index.html 模块：")])]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- public/index.html --\x3e")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token doctype"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<!")]),s("span",{pre:!0,attrs:{class:"token doctype-tag"}},[t._v("DOCTYPE")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token name"}},[t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("lang")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("charset")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("utf-8"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("http-equiv")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("X-UA-Compatible"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("IE=edge"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("viewport"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("width=device-width,initial-scale=1.0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("icon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("<%= BASE_URL %>favicon.ico"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("title")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n      <%= htmlWebpackPlugin.options.title %>\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("title")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("head")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("noscript")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("strong")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work\n        properly without JavaScript enabled. Please enable it to\n        continue."),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("strong")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("noscript")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("id")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("app"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("h2",{attrs:{id:"自定义模板数据填充"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自定义模板数据填充"}},[t._v("#")]),t._v(" 自定义模板数据填充")]),t._v(" "),s("ul",[s("li",[t._v("上面的代码中，会有一些类似这样的语法<% 变量 %>，这个是 EJS 模块填充数据的方式。")]),t._v(" "),s("li",[t._v("在配置 HtmlWebpackPlugin 时，我们可以添加如下配置：\n"),s("ul",[s("li",[t._v("template：指定我们要使用的模块所在的路径；")]),t._v(" "),s("li",[t._v("title：在进行 htmlWebpackPlugin.options.title 读取时，就会读到该信息；")])])])]),t._v(" "),s("h2",{attrs:{id:"defineplugin-的介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#defineplugin-的介绍"}},[t._v("#")]),t._v(" DefinePlugin 的介绍")]),t._v(" "),s("ul",[s("li",[t._v("但是，这个时候编译还是会报错，因为在我们的模块中还使用到一个 "),s("strong",[t._v("BASE_URL 的常量")]),t._v("：")])]),t._v(" "),s("p",[s("img",{attrs:{src:"/frontEnd/pack/webpack/10.png",alt:""}})]),t._v(" "),s("ul",[s("li",[t._v("这是因为在编译 template 模块时，有一个 BASE_URL：\n"),s("ul",[s("li",[t._v("但是我们并没有设置过这个常量值，所以会出现没有定义的错误；")])])]),t._v(" "),s("li",[t._v("这个时候我们可以使用 DefinePlugin 插件；")])]),t._v(" "),s("h2",{attrs:{id:"defineplugin-的使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#defineplugin-的使用"}},[t._v("#")]),t._v(" DefinePlugin 的使用")]),t._v(" "),s("ul",[s("li",[t._v("DefinePlugin 允许在编译时创建配置的全局常量，是一个 webpack 内置的插件（不需要单独安装）：")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" DefinePlugin "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"webpack"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 其他省略")]),t._v("\n  plugins"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DefinePlugin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("BASE_URL")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"'./'\"")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("ul",[s("li",[t._v("这个时候，编译 template 就可以正确的编译了，会读取到 "),s("strong",[t._v("BASE_URL")]),t._v(" 的值；")])]),t._v(" "),s("h2",{attrs:{id:"copywebpackplugin"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#copywebpackplugin"}},[t._v("#")]),t._v(" CopyWebpackPlugin")]),t._v(" "),s("ul",[s("li",[t._v("在 vue 的打包过程中，如果我们将一些文件"),s("strong",[t._v("放到 public 的目录")]),t._v("下，那么这个目录会"),s("strong",[t._v("被复制到 dist 文件夹中")]),t._v("。\n"),s("ul",[s("li",[t._v("这个复制的功能，我们可以使用 CopyWebpackPlugin 来完成；")])])]),t._v(" "),s("li",[t._v("安装 CopyWebpackPlugin 插件：")])]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" copy-webpack-plugin -D\n")])])]),s("ul",[s("li",[t._v("接下来配置 CopyWebpackPlugin 即可：\n"),s("ul",[s("li",[t._v("复制的规则在 patterns 中设置；")]),t._v(" "),s("li",[t._v("from：设置从哪一个源中开始复制；")]),t._v(" "),s("li",[t._v("to：复制到的位置，可以省略，会默认复制到打包的目录下；")]),t._v(" "),s("li",[t._v("globOptions：设置一些额外的选项，其中可以编写需要忽略的文件：\n"),s("ul",[s("li",[t._v("index.html：也不需要复制，因为我们已经通过 HtmlWebpackPlugin 完成了 index.html 的生成；")])])])])])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" CopyWebpackPlugin "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"copy-webpack-plugin"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 其他的省略")]),t._v("\n  plugins"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("CopyWebpackPlugin")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      patterns"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"public"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 可以不写,默认会根据你上面的配置来读取")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// to: "./",')]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 忽略配置")]),t._v("\n          globOptions"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            ignore"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"**/index.html"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[s("img",{attrs:{src:"/frontEnd/pack/webpack/11.png",alt:""}})]),t._v(" "),s("p",[s("img",{attrs:{src:"/frontEnd/pack/webpack/12.png",alt:""}})]),t._v(" "),s("h2",{attrs:{id:"mode-配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mode-配置"}},[t._v("#")]),t._v(" Mode 配置")]),t._v(" "),s("ul",[s("li",[t._v("前面我们一直没有讲 mode。")]),t._v(" "),s("li",[t._v("Mode 配置选项，可以告知 webpack 使用响应模式的内置优化：\n"),s("ul",[s("li",[t._v("默认值是 production（什么都不设置的情况下）；")]),t._v(" "),s("li",[t._v("可选值有：'none' | 'development' | 'production'；")])])]),t._v(" "),s("li",[t._v("这几个选项有什么样的区别呢?")])]),t._v(" "),s("p",[t._v("比如我们在 element.js 文件中打印 codertao.lenght,这个肯定是要"),s("strong",[t._v("报错")]),t._v("的")]),t._v(" "),s("p",[s("img",{attrs:{src:"/frontEnd/pack/webpack/13.png",alt:""}})]),t._v(" "),s("p",[t._v("在开发中我们进行调式遇到这样的错误我们是很难找到错误发生的位置的")]),t._v(" "),s("p",[t._v("有人会说诶这里不是说了吗,在 bundle.js 文件中的第一行")]),t._v(" "),s("p",[t._v("bundle.js 文件是被打包压缩过的,我们点进去以后是看不懂的,所以很难找到出现错误的位置")]),t._v(" "),s("ul",[s("li",[t._v("如果开发中想要详细找到 bug 的位置,我们可以通过 webpack 的配置的 mode")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置模式")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// development 开发阶段,会设置development")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// production 准备打包上线的时候,设置production")]),t._v("\nmode"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"development"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])]),s("p",[t._v("那么我们就可以找到 bug 出现的位置")]),t._v(" "),s("p",[s("img",{attrs:{src:"/frontEnd/pack/webpack/14.png",alt:""}})]),t._v(" "),s("p",[s("img",{attrs:{src:"/frontEnd/pack/webpack/15.png",alt:""}})]),t._v(" "),s("ul",[s("li",[t._v("如果觉得还是不够详细,因为点开文件发现上面有一些打包后乱七八糟看不懂的代码")]),t._v(" "),s("li",[t._v("如果想出现错误,点击错误进入原文件进行查看的话.可以再配置一个 devtool")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置source-map,建立js映射文件,方便调试代码和错误")]),t._v("\ndevtool"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'source-map'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])]),s("p",[s("img",{attrs:{src:"/frontEnd/pack/webpack/16.png",alt:""}})]),t._v(" "),s("p",[s("img",{attrs:{src:"/frontEnd/pack/webpack/17.png",alt:""}})]),t._v(" "),s("p",[t._v("这样如果开发中有了 bug,我们就可以很方便找到 bug 出现的位置然后进行修改")])])}),[],!1,null,null,null);a.default=e.exports}}]);