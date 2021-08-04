const moment = require('moment');
const path = require('path')
moment.locale("zh-cn");

module.exports = [
  ["vuepress-plugin-auto-sidebar", {
    output: {
      filename: 'config/sidebarConf'
    },
    title: {
      mode: "uppercase"
    }
  }],
  ['@vuepress/plugin-search', {
    locales: {
      '/': {
        placeholder: '搜索',
      }
    },
    maxSuggestions: 10,
    // 排除首页
    isSearchable: (page) => page.path !== '/',
    // 允许搜索 Frontmatter 中的 `tags`
    getExtraFields: (page) => page.frontmatter.tags ?? [],
  }],
]