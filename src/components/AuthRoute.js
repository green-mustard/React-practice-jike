// 封装高阶组件
// 核心逻辑: 有token就正常跳转,无token则跳转登录页

import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

// 函数参数为路由组件,通过children来接收
export function AuthRoute({ children }) {
  const token = getToken()
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to={'/login'} replace />
  }
}
