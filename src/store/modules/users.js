// 和用户相关的状态管理
import { createSlice } from '@reduxjs/toolkit'
import { request } from '@/utils'

const userStore = createSlice({
  name: 'users',
  // 数据状态
  initialState: {
    token: ''
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    }
  }
})

// 解构actionCreater
const { setToken } = userStore.actions

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

//获取reducer函数
const userReducer = userStore.reducer

export { setToken, fetchLogin }

export default userReducer
