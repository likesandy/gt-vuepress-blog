const pluginConf = require('./config/pluginConf.js');
const navConf = require('./config/navConf.js');
// const sidebarConf = require('./config/sidebarConf');
const sidebarConf = require('./config/sidebarConf');

module.exports = {
  lang: 'zh-CN',
  title: "codertao",
  description: "了解真相才能获得真正的自由",
  head: [
    ['link', { rel: 'icon', href: '/sandy.jpg' }],
  ],
  plugins: pluginConf,
  themeConfig: {
    logo: '/sandy.jpg',
    navbar: navConf,
    sidebar: sidebarConf,
    lastUpdatedText: '上次更新',
    contributors: false,
    toggleDarkMode: '切换模式'
  },
  bundler: '@vuepress/vite',
  markdown: {
    code: {
      lineNumbers: false
    }
  },
};
