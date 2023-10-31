// 封装Token的存取删方法
// 封装的原因？对于Token的各类操作在项目多个模块中都有用到，为了共享复用可以封装成工具函数

const TOKENKEY = 'token_key'
// 存
function setToken(token) {
  localStorage.setItem(TOKENKEY, token)
}

// 取
function getToken() {
  return localStorage.getItem(TOKENKEY)
}

// 删
function removeToken() {
  localStorage.removeItem(TOKENKEY)
}

export { setToken, getToken, removeToken }
