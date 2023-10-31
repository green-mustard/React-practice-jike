import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { fetchLogin } from '@/store/modules/users'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async values => {
    // console.log(values)
    // 触发异步action fetchLogin ,使用异步代码，保证token获取到后再进行路由跳转
    await dispatch(fetchLogin(values))
    // 后续处理逻辑
    // 1.跳转到首页
    navigate('/')
    // 2.提示用户登录成功
    message.success('登录成功!')
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form validateTrigger="onBlur" onFinish={onFinish}>
          <Form.Item
            // name属性要和后端校验的字段保持一致
            name="mobile"
            // 多条校验逻辑，先校验第一条，第一条通过之后再校验后续的
            rules={[
              { required: true, message: '请输入手机号!' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式' }
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            // name属性要和后端校验的字段保持一致
            name="code"
            rules={[{ required: true, message: '请输入验证码!' }]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
