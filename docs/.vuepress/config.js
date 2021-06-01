const nav = require('./config/nav');
const plugins = require('./config/plugins');

module.exports = {
  title: "codertao",
  description: "了解真相才能获得真正的自由",
  head: ['link', { rel: 'icon', href: '/favicon.ico' }],
  plugins,
  themeConfig: {
    nav,
    lastUpdated: "最近更新",
  },
};
