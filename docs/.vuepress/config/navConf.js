module.exports = [
  { text: '首页', link: '/' },
  { text: '关于', link: '/about/' },
  {
    text: '前端', items: [
      {
        text: '三剑客', items: [
          { text: 'HTML', link: '/frontEnd/basics/HTML/' },
          { text: 'CSS', link: '/frontEnd/basics/CSS/' },
          { text: 'JavaScript', link: '/frontEnd/basics/JavaScript/' }]
      },
      {
        text: 'JS框架', items: [
          { text: 'Vue', link: '/frontEnd/frame/vue/' },
          { text: 'React', link: '/frontEnd/frame/react/' }
        ]
      },
      {
        text: '打包工具', items: [
          { text: 'Webpack', link: '/frontEnd/pack/webpack/' },
          { text: 'Vite', link: '/frontEnd/pack/vite/' }
        ]
      },
    ]
  },
  {
    text: '小程序', items: [
      {
        text: '原生', items: [
          { text: '微信小程序', link: '/applet/native/' }
        ]
      },
      {
        text: '跨端', items: [
          { text: 'uni-app', link: '/applet/span/uni-app/' },
          { text: 'Taro', link: '/applet/span/Taro/' }
        ]
      }
    ]
  },
  { text: '数据结构', link: '/dataStructure/' },
  { text: '优文转载', link: '/share/', },
  { text: '随笔', link: '/essay/' },
  {
    text: '工具箱', items: [
      {
        text: '在线编辑', items: [
          { text: '图片压缩', link: 'https://tinypng.com/' }
        ]
      },
      {
        text: '在线服务',
        items: [
          { text: '阿里云', link: 'https://www.aliyun.com/' },
          { text: '腾讯云', link: 'https://cloud.tencent.com/' }
        ]
      },
      {
        text: '电影分享',
        items: [
          { text: '豆瓣Top', link: '/movies/' },
        ]
      }
    ]
  },
  { text: 'Github', link: 'https://github.com/likesandy', },
]