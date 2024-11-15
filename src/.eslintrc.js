module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off', // 关闭多个单词组件名的报错
    'no-unused-vars': 'off', // 关闭未使用变量的报错
    'camelcase': 'off' // 关闭驼峰命名规则的报错
    // 这里可以继续添加其他规则关闭未使用和名称报错
  }
}
