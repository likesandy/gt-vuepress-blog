---
title: VueCLI
---

## Vue CLI 脚手架

- 什么是 Vue 脚手架？
  - 我们前面学习了如何通过 webpack 配置 Vue 的开发环境，但是在真实开发中我们不可能每一个项目从头来完成
    所有的 webpack 配置，这样显示开发的效率会大大的降低；
  - 所以在真实开发中，我们通常会使用脚手架来创建一个项目，Vue 的项目我们使用的就是 Vue 的脚手架；
  - 脚手架其实是建筑工程中的一个概念，在我们软件工程中也会将一些帮助我们搭建项目的工具称之为脚手架；
- Vue 的脚手架就是 Vue CLI：
  - CLI 是 Command-Line Interface, 翻译为命令行界面；
  - 我们可以通过 CLI 选择项目的配置和创建出我们的项目；
  - Vue CLI 已经内置了 webpack 相关的配置，我们不需要从零来配置；

## Vue CLI 安装和使用

- 安装 Vue CLI（目前最新的版本是 v4.5.13）
  - 我们是进行全局安装，这样在任何时候都可以通过 vue 的命令来创建项目；

```sh
npm install @vue/cli -g
```

- 升级 Vue CLI：
  - 如果是比较旧的版本，可以通过下面的命令来升级

```sh
npm update @vue/cli -g
```

- 通过 Vue 的命令来创建项目

```sh
vue create 项目的名称
```

## vue create 项目的过程

![](/frontEnd/frame/vue/1.png)

![](/frontEnd/frame/vue/2.png)

![](/frontEnd/frame/vue/3.png)

![](/frontEnd/frame/vue/4.png)
