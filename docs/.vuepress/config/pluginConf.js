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
  "vuepress-plugin-auto-sidebar": {
    title: {
      mode: "default",
      map: {
        "/applet/native/": "邂逅小程序",
      }
    },
  },
  'one-click-copy': {
    copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
    copyMessage: '复制成功',
    duration: 1000,
    showInMobile: false
  },
  'vuepress-plugin-smooth-scroll': true,
  'img-lazy': true,
  '@vuepress-reco/vuepress-plugin-bgm-player': {
    audios: [
      {
        name: 'On My Way',
        artist: 'Sophie Francis',
        url: '/bgm/On My Way.flac',
        cover: '/bgm/1.JPG'
      },
      {
        name: '山楂树の恋',
        artist: '程jiajia',
        url: '/bgm/山楂树の恋.flac',
        cover: '/bgm/2.jfif'
      },
      {
        name: 'Love Story',
        artist: 'Taylor Swift',
        url: '/bgm/Love Story.mp3',
        cover: '/bgm/3.jfif'
      },
    ],
  },
  '@vuepress-reco/vuepress-plugin-kan-ban-niang': {
    theme: ['z16'],
    clean: true,
    modelStyle: { right: '1px', bottom: '-20px', opacity: '0.9' }
  },
  'cursor-effects': true,
  'ribbon': true,
};