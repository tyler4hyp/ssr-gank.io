# 一个基于express+nunjucks的SSR项目（Gank.io)

所有接口由https://gank.io/提供(在此感谢站长)，服务器框架为express, 模板使用nunjucks, 支持服务端渲染和异步加载

需要安装nodemon

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
```

## 关键点

* webpack处理js和css, gulp处理模板文件
* 配置webpack-hot-middleware和css-hot-loader实现js和css的热替换，使用nodemon实现模板文件热替换(nodemon -e njk), 所以需要安装nodemon, 开发的时候直接使用npm run dev即可
* src目录里所有模块资源就近依赖，dist中将被分开到模板文件夹和静态资源文件夹。
* 使用nunjucks-loader实现异步加载，它会把对应的模板文件编译成js，成为页面js的一部分。
