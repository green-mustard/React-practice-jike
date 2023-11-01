// 和用户相关的状态管理
import { createSlice } from '@reduxjs/toolkit'
import { request } from '@/utils'
import { setToken as _setToken, getToken, removeToken } from '@/utils'

const userStore = createSlice({
  name: 'users',
  // 数据状态
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      // 将token在localStorage中也存一份
      _setToken(action.payload)
    },
    setUserINfo(state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      removeToken()
      state.userInfo = {}
    }
  }
})

// 解构actionCreater
const { setToken, setUserINfo, clearUserInfo } = userStore.actions

// 异步方法，完成登录获取token
const fetchLogin = formDate => {
  return async dispatch => {
    // 1. 发送异步请求
    const res = await request.post('/authorizations', formDate)
    // console.log(res.data)
    // 2. 提交同步action进行token的存入
    dispatch(setToken(res.data.token))
  }
}

// 获取用户信息
const fetchUserInfo = () => {
  return async dispatch => {
    const res = await request.get('/user/profile')
    dispatch(setUserINfo(res.data))
  }
}

//获取reducer函数
const userReducer = userStore.reducer

export { setToken, fetchLogin, fetchUserInfo, clearUserInfo }

export default userReducer
