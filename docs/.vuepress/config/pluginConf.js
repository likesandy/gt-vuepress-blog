const moment = require('moment');

moment.locale("zh-cn");

module.exports = {
  'go-top': true,
  '@vuepress/medium-zoom': {
    selector: '.content__default img',
  },
  '@vuepress/last-updated': {
    transformer: (timestamp) => moment(timestamp).format('LLLL')
  },
  'vuepress-plugin-smooth-scroll': true,
  'img-lazy': true,
  'reading-progress': true,
};