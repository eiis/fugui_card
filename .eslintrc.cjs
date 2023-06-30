module.exports = {
  //解析器选项
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "globalReturn": false,
      "impliedStrict": false,
      "jsx": false
    }
  },
  //代码运行的环境
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // ESLint 插件
  plugins: ['simple-import-sort'],
  //如何检查你的代码
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
