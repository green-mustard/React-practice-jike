import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import { AuthRoute } from '@/components/AuthRoute'
import { Suspense, lazy } from 'react'

// 直接导入二级路由
// import Home from '@/pages/Home'
// import Article from '@/pages/Article'
// import Publish from '@/pages/Publish'

// 路由懒加载
// 1. 使用lazy函数导入对应组件
const Home = lazy(() => {
  import('@/pages/Home')
})
const Article = lazy(() => {
  import('@/pages/Article')
})
const Publish = lazy(() => {
  import('@/pages/Publish')
})

export default createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: (
          //Suspense组件会将路由进行异步渲染
          <Suspense fallback={'加载中'}>
            <Home />
          </Suspense>
        )
      },
      {
        path: 'article',
        element: (
          <Suspense fallback={'加载中'}>
            <Article />
          </Suspense>
        )
      },
      {
        path: 'publish',
        element: (
          <Suspense fallback={'加载中'}>
            <Publish />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/Login',
    element: <Login />
  }
])
