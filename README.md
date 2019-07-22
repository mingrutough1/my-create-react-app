## 项目中用到的基本配置
* 使用ProvidePlugin。可以实现自动加载模块，而不需要到处import或者require。
* resolve/alias选项。'@': path.resolve(__dirname,'../src')。可以配置一些路径别名，方便规整加载文件。
* 使用sass-resources-loader配置全局的sass公共文件。这样不必手动引入sass就能使用公共文件中的变量、mixin等。
* 引入mobx。
* 安装http-proxy-middleware并在src目录下新建setupProxy.js 文件。实现代理配置
* 两种方式实现路由守卫：
    1. 高阶组件的形式。（推荐）（在需要进行守卫的组件上使用装饰器语法@AuthHoc）
    2. 抽象出一个路由守卫组件。（问题：利用react-router Switch 单一渲染的特性。不适用于不使用Switch的场景）