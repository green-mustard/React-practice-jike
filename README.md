# 极客园 PC 项目练习

## 项目接口文档

https://apifox.com/apidoc/shared-fa9274ac-362e-4905-806b-6135df6aa90e/api-31967347

## 关于 Axios 请求拦截器注入 Token

为什么要做这件事儿？
Token 作为用户的一个标识数据，后端很多接口都会以它作为接口权限判断的依据；请求拦截器注入 Token 之后，所有
用到 Axios 实例的接口请求都自动携带了 Token
