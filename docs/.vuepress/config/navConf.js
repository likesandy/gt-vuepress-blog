module.exports = [
  { text: '首页', link: '/' },
  { text: '关于', link: '/about/' },
  {
    text: '前端', items: [
      {
        text: '前端基础', items: [
          { text: 'HTML', link: '/frontEnd/basics/html/' },
          { text: 'CSS', link: '/frontEnd/basics/css/' },
          { text: 'JavaScript', link: '/frontEnd/basics/javascript/' }
        ]
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
        ],
      },
      {
        text: '小程序', items: [
          { text: '原生', link: '/applet/native/' }
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
        text: '日常分享',
        items: [
          { text: '吃播集锦', link: '/mukbang/' },
          { text: '电影分享', link: '/movies/' },
        ]
      }
    ]
  },
  { text: 'Github', link: 'https://github.com/likesandy', },
]
