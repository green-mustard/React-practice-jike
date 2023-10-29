import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />
  },
  {
    path: '/Login',
    element: <Login />
  }
])
