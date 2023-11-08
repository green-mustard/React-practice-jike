import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './index.scss'

// 导入富文本插件库及样式
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { createArticleAPI } from '@/apis/articles'
import { useChannel } from '@/hooks/useChannel'

import { getArticleDetail } from '@/apis/articles'

const { Option } = Select

const Publish = () => {
  // 获取频道列表
  const { channelList } = useChannel()

  // 提交表单的回调
  const onFinish = formData => {
    // console.log(formData)
    // 校验封面图片类型和实际上传图片数量是否相符
    if (imageList.length !== imageType)
      return message.warning('封面类型和图片数量不匹配')
    // 从表单数据中结构出需要的内容
    const { title, content, channel_id } = formData
    // 1.按接口文档的格式处理收集的表单数据
    const reqData = {
      title,
      content,
      channel_id,
      cover: {
        type: imageType, // 封面模式
        images: imageList.map(item => item.response.data.url) // 图片列表
      }
    }
    // 2.调用接口提交
    createArticleAPI(reqData)
  }

  // 上传图片的回调
  const [imageList, setImageList] = useState([])
  const onImageChange = value => {
    console.log('图片上传中', value)
    setImageList(value.fileList)
  }

  // 切换封面图片类型
  // 复选框勾选的回调(形参e为事件对象)
  const [imageType, setImageType] = useState(0)
  const onTypeChange = e => {
    // console.log(e.target.value)
    setImageType(e.target.value)
  }

  // 回填数据
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  // console.log(articleId)

  // 获取实例
  // const res = Form.useForm()
  // console.log(res)
  const [form] = Form.useForm()
  useEffect(() => {
    // 1. 通过id获取数据
    async function fetchData() {
      const res = await getArticleDetail(articleId)
      console.log(res)
      // 2. 调用实例方法，完成回填
      form.setFieldsValue(res.data)
    }
    fetchData()
  }, [articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: '发布文章' }
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* listType: 决定选择框的外观样式 
            showUploadList: 控制显示上传列表  */}
            {imageType !== 0 && (
              <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                maxCount={imageType}
                onChange={onImageChange}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
