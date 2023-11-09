# 极客园 PC 项目练习

## 项目接口文档

https://apifox.com/apidoc/shared-fa9274ac-362e-4905-806b-6135df6aa90e/api-31967347

## 关于 Axios 请求拦截器注入 Token

为什么要做这件事儿？
Token 作为用户的一个标识数据，后端很多接口都会以它作为接口权限判断的依据；请求拦截器注入 Token 之后，所有
用到 Axios 实例的接口请求都自动携带了 Token

## 使用 Token 做路由权限控制

具体要做什么事儿？
有些路由页面内的内容信息比较敏感，如果用户没有经过登录获取到有效 Token，是没有权限跳转的，根据 Token 的有
无控制当前路由是否可以跳转就是路由的权限控制
技术

## API 模块封装

可能存在的问题：
当前的接口请求放到了功能实现的位置，没有在固定的模块内维护，后期查找维护困难

解决思路：
把项目中的所有接口按照业务模块以函数的形式统一封装到 apis 模块中

## 封装自定义业务 hook

1. 创建一个 use 打头的函数
2. 在函数中封装业务逻辑，并 return 出组件中要用到的状态数据
3. 组件中导入函数执行并解构状态数据使用

## 文章列表——筛选功能的实现

筛选功能的本质：给请求列表接口传递不同的参数和后端要不同的数据

实现步骤：

1. 准备完整的请求参数对象
2. 获取用户选择的表单数据
3. 把表单数据放置到接口对应的字段中
4. 重新调用文章列表接口渲染 Table 列表

## 项目打包和本地预览

1. 项目打包
   打包指的是将项目中的源代码和资源文件进行处理，生成可在生产环境中运行的静态文件的过程
   打包命令：npm run build
2. 本地预览（模拟服务器运行项目）
   本地预览是指在本地通过静态服务器模拟生产服务器运行项目的过程
3. 安装本地服务包 npm i -g serve
4. serve -s ./build
5. 浏览器中访问 http://localhost:3000/

## 打包优化-配置路由懒加载

什么是路由懒加载？
路由懒加载是指路由的 JS 资源只有在被访问时才会动态获取，目的是为了优化项目首次打开的时间.

如何进行配置？

1. 把路由修改为由 React 提供的 lazy 函数进行动态导入
2. 使用 React 内置的 Suspense 组件 包裹路由中 element 选项对应的组件
