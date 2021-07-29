module.exports = [
  { text: '首页', link: '/' },
  {
    text: '三剑客', items: [
      { text: 'HTML', link: '/basics/html/' },
      { text: 'CSS', link: '/basics/css/' },
      { text: 'JavaScript', link: '/basics/javascript/' }
    ]
  },
  // { text: 'Git', link: '/git/' },
  {
    text: '打包工具', items: [
      { text: 'Webpack', link: '/pack/webpack/' },
      { text: 'Vite', link: '/pack/vite/' }
    ]
  },
  {
    text: 'JS框架', items: [
      { text: 'Vue', link: '/frame/vue/' },
      { text: 'React', link: '/frame/react/' }
    ]
  },
  { text: 'TypeScript', link: '/type-script/' },
  // { text: '算法', link: '/dataStructure/' },
  {
    text: '书籍', items: [
      { text: 'JavaScript高级程序设计', link: '/books/ruby/' },
    ]
  },
  { text: '面试宝典', link: '/interview/' },
  { text: '收藏', link: '/collect/' },
  {
    text: '更多', items: [
      { text: '项目约束', link: '/more/lint/' },
    ]
  },
  { text: '关于', link: '/about/' },
  { text: 'Github', link: 'https://github.com/likesandy', },
]
