module.exports = [
  '',
  {
    title: '可复用 & 组合',
    collapsable: false,
    children: [
      {
        title: '组合式API', collapsable: true, children: ['setup', 'lifecycle-hooks', 'provide-inject', 'template-refs'],
      },
      'mixin',
    ]
  },
  {
    title: '高阶指南',
    collapsable: false,
    children: [
      {
        title: '响应式', collapsable: true, children: ['reactivity', 'reactivity-fundamentals', 'reactivity-computed-watchers',],
      },
    ]
  },
];