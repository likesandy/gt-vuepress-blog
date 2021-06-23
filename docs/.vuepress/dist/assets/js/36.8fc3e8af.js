(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{369:function(t,e,v){"use strict";v.r(e);var _=v(26),r=Object(_.a)({},(function(){var t=this,e=t.$createElement,v=t._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h2",{attrs:{id:"关于"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#关于"}},[t._v("#")]),t._v(" 关于")]),t._v(" "),v("p",[t._v("本章根据 "),v("strong",[t._v("coderwhy 老师")]),t._v("腾讯课堂的视频讲解进行的笔记记录,感兴趣的可以去"),v("a",{attrs:{href:"https://ke.qq.com/course/3453141",target:"_blank",rel:"noopener noreferrer"}},[t._v("腾讯课堂"),v("OutboundLink")],1),t._v("🎉🎉查看 coderwhy 老师的课程")]),t._v(" "),v("p",[t._v("本章的代码已上传 "),v("a",{attrs:{href:"https://github.com/likesandy/learn-vite",target:"_blank",rel:"noopener noreferrer"}},[t._v("GitHub"),v("OutboundLink")],1),t._v(",感兴趣的可以下载然后配合笔记更佳")]),t._v(" "),v("p",[t._v("遇到很多问题以及更多细节相关的方面请记住多看📚"),v("a",{attrs:{href:"https://cn.vitejs.dev/",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档"),v("OutboundLink")],1)]),t._v(" "),v("h2",{attrs:{id:"认识-vite"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#认识-vite"}},[t._v("#")]),t._v(" 认识 Vite")]),t._v(" "),v("ul",[v("li",[t._v("Webpack 是目前整个前端使用最多的构建工具，但是除了 webpack 之后也有其他的一些构建工具：\n"),v("ul",[v("li",[t._v("比如 rollup、parcel、gulp、vite 等等")])])]),t._v(" "),v("li",[t._v("什么是 vite 呢？ 官方的定位："),v("strong",[t._v("下一代")]),t._v("前端开发与构建工具；")]),t._v(" "),v("li",[t._v("如何定义下一代开发和构建工具呢？\n"),v("ul",[v("li",[t._v("我们知道在实际开发中，我们编写的代码往往是不能被浏览器直接识别的，比如 ES6、TypeScript、Vue 文件等\n等；")]),t._v(" "),v("li",[t._v("所以我们必须通过构建工具来对代码进行转换、编译，类似的工具有 webpack、rollup、parcel；")]),t._v(" "),v("li",[t._v("但是随着项目越来越大，需要处理的 JavaScript 呈指数级增长，模块越来越多；")]),t._v(" "),v("li",[t._v("构建工具需要很长的时间才能开启服务器，HMR(热更新) 也需要几秒钟才能在浏览器反应出来；")]),t._v(" "),v("li",[t._v("所以也有这样的说法：天下苦 webpack 久矣；")])])]),t._v(" "),v("li",[t._v('Vite (法语意为 "'),v("strong",[t._v("快速的")]),t._v('"，发音 /vit/) 是一种新型前端构建工具，能够显著提升前端开发体验。')])]),t._v(" "),v("h2",{attrs:{id:"vite-的构造"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#vite-的构造"}},[t._v("#")]),t._v(" Vite 的构造")]),t._v(" "),v("ul",[v("li",[t._v("它主要由两部分组成：\n"),v("ul",[v("li",[t._v("一个开发服务器，它基于原生 ES 模块提供了丰富的内建功能，HMR 的速度非常快速；")]),t._v(" "),v("li",[t._v("一套构建指令，它"),v("strong",[t._v("使用 rollup")]),t._v("打开我们的代码，并且它是预配置的，可以输出生成环境的优化过的静态资源；")])])]),t._v(" "),v("li",[t._v("目前是否要大力学习 vite？vite 的未来是怎么样的？\n"),v("ul",[v("li",[t._v("我个人非常看好 vite 的未来，也希望它可以有更好的发展；")]),t._v(" "),v("li",[t._v("但是，目前 vite 虽然已经更新到 2.0，依然并不算非常的稳定，并且比较少大型项目（或框架）使用 vite 来进行\n构建；")]),t._v(" "),v("li",[t._v("vite 的整个社区插件等支持也还不够完善；")]),t._v(" "),v("li",[t._v("包括 vue 脚手架本身，目前也还没有打算迁移到 vite，而依然使用 webpack（虽然后期一定是有这个打算的）；")]),t._v(" "),v("li",[t._v("所以 vite 看起来非常的火热，在面试也可能会问到，但是实际项目中应用的还比较少；")])])])]),t._v(" "),v("blockquote",[v("p",[t._v("接下来就让我带你走入 Vite 的世界,使用 Vite 在构建项目的时候你会感觉前所未有的"),v("strong",[t._v("爽")])])]),t._v(" "),v("div",{staticClass:"custom-block tip"},[v("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),v("p",[t._v("webpack 的生态还是很好,推荐 Vite 目前用于"),v("strong",[t._v("个人开发")]),t._v(","),v("strong",[t._v("团队开发")]),t._v("还是使用 webpack")]),t._v(" "),v("p",[t._v("因为目前 Vite 还不够稳定,还存在很多的 bug,本章只对 Vite2 做一次简单的邂逅")])]),t._v(" "),v("p",[t._v("📚 "),v("a",{attrs:{href:"https://cn.vitejs.dev/",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档"),v("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=r.exports}}]);