const pluginConf = require('./config/pluginConf.js');
const navConf = require('./config/navConf.js');

module.exports = {
  title: "codertao",
  description: "了解真相才能获得真正的自由",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  plugins: pluginConf,
  themeConfig: {
    nav: navConf,
    lastUpdated: '上次更新',
  },
  configureWebpack: () => {
    const NODE_ENV = process.env.NODE_ENV
    //判断是否是生产环境
    if (NODE_ENV === 'production') {
      return {
        output: {
          publicPath: 'https://cdn.jsdelivr.net/gh/jwchan1996/blog@gh-pages/'
        },
        resolve: {
          //配置路径别名
          alias: {
            'public': path.resolve(__dirname, './public')
          }
        }
      }
    } else {
      return {
        resolve: {
          //配置路径别名
          alias: {
            'public': path.resolve(__dirname, './public')
          }
        }
      }
    }
  }
};
