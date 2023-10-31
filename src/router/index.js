import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import { AuthRoute } from '@/components/AuthRoute'

// 导入二级路由
import Home from '@/pages/Home'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'

export default createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      { index: true, element: <Home></Home> },
      { path: 'article', element: <Article></Article> },
      { path: 'publish', element: <Publish></Publish> }
    ]
  },
  {
    path: '/Login',
    element: <Login />
  }
])
