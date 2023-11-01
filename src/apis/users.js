// 用户相关的所有请求
import { request } from '@/utils'

// 1. 登录请求
export function loginAPI(data) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data
  })
}

// 2. 获取用户信息
export function getUserInfoAPI() {
  return request({
    url: '/user/profile',
    method: 'GET'
  })
}
