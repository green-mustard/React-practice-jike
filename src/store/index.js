// 组合Redux子模块，并导出store实例
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/store/modules/users.js'

export default configureStore({
  reducer: {
    user: userReducer
  }
})
