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
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './index.scss'

// 导入富文本插件库及样式
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { createArticleAPI } from '@/apis/articles'
import { useChannel } from '@/hooks/useChannel'

import { getArticleDetail, updateArticle } from '@/apis/articles'

const { Option } = Select

const Publish = () => {
  // 获取频道列表
  const { channelList } = useChannel()
  const navigate = useNavigate()

  // 提交表单的回调
  const onFinish = async formData => {
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
        // 下面的url处理逻辑只是新增文章时候的逻辑
        // images: imageList.map(item => item.response.data.url)
        // 二次编辑文章的时候需要对数据做另外的处理
        images: imageList.map(item => {
          if (item.response) {
            return item.response.data.url
          } else {
            return item.url
          }
        })
      }
    }
    // 2.调用接口提交
    // 处理调用不同的接口，如果是新增状态则调用新增的接口，如果是再次编辑则调用更新的接口
    if (articleId) {
      // 调用更新文章的接口
      const response = await updateArticle({ ...reqData, id: articleId })
      if (response) {
        message.success('更新文章成功')
        navigate('/article')
      } else {
        message.error('更新文章失败')
      }
    } else {
      // 调用新增文章的接口
      const response = await createArticleAPI(reqData)
      if (response) {
        message.success('发布文章成功')
        navigate('/article')
      } else {
        message.error('发布文章失败')
      }
    }
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
      // console.log(res)
      // 优化res.data.cover的数据解构
      const data = res.data
      const { cover } = data
      // 2. 调用实例方法，完成回填
      form.setFieldsValue({
        ...data,
        type: cover.type
      })
      // 为什么现在的写法无法回填封面信息
      // 数据解构的问题： set方法 -> Form要求的字段是{type: 3}， 而获取的字段是{cover: {type: 3}}

      // 回填图片列表
      setImageType(cover.type)
      // 显示图片 储存图片列表的格式要和上传时候的格式保持一致，必须是一个对象包含url字段
      setImageList(
        cover.images.map(url => {
          return { url }
        })
      )
    }
    // 只有在有id的情况下才能调用此函数回填数据，否则会报错
    if (articleId) {
      fetchData()
    }
  }, [articleId, form])

  // 点击发布文章按钮后的回调
  const publishArticle = () => {
    if (articleId) {
      message.success('更新文章成功')
    } else {
      message.success('发布文章成功')
    }
    navigate('/article')
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: `${articleId ? '编辑' : '发布'}文章` }
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
                fileList={imageList} // 绑定数据，数据驱动视图
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
                {articleId ? '更新' : '发布'}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
