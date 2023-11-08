// 引入筛选区资源
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Pagination,
  Popconfirm
} from 'antd'
// 引入时间选择器汉化包
import locale from 'antd/es/date-picker/locale/zh_CN'

// 引入表格区域资源
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react'
import { useChannel } from '@/hooks/useChannel'

import { getArticleListAPI, deleteArticle } from '@/apis/articles'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const { channelList } = useChannel()
  const navigate = useNavigate()

  // 定义状态枚举
  const status = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>
  }
  // 准备列的数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        )
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      // data => 后端返回的状态status，根据它来做条件渲染， 1为待审核，2为审核通过
      // 通过对象取值的方法，使用枚举来定义对应关系，data当作key传入
      // 如果要适配的状态只有两个，可以使用三元条件来渲染
      render: data => status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navigate(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title="删除"
              description="确定删除该文章吗?"
              onConfirm={() => onConfirm(data)}
              onCancel={cancel}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  // 准备表格body的假数据
  // const data = [
  //   {
  //     id: '8218',
  //     comment_count: 0,
  //     cover: {
  //       images: []
  //     },
  //     like_count: 0,
  //     pubdate: '2019-03-11 09:00:00',
  //     read_count: 2,
  //     status: 2,
  //     title: 'wkwebview离线化加载h5资源解决方案'
  //   }
  // ]

  // 获取频道列表

  //1. 准备参数

  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 6
  })

  // 获取文章列表
  const [articleList, setArticleList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    const getArticleList = async () => {
      const res = await getArticleListAPI(reqData)
      // console.log(res.data.results)
      setArticleList(res.data.results)
      setCount(res.data.total_count)
    }
    getArticleList()
  }, [reqData])

  // 筛选功能
  // 2. 获取当前的筛选数据
  const onFinish = formData => {
    // console.log(formData)
    // 3. 把表单收集到的数据放入到参数中
    // 因为修改对象格式的数据，不能直接修改，采用展开运算符...这种不可变的方式
    setReqData({
      ...reqData,
      channel_id: formData.channel_id,
      status: formData.status,
      begin_pubdate: formData.date[0].format('YYYY-MM-DD'),
      end_pubdate: formData.date[1].format('YYYY-MM-DD')
    })
    // 4. 重新拉取文章列表 + 渲染table，这里的逻辑是重复的，需要做到复用，这里的reqData发生变化，就会重复执行副作用函数
  }

  // 页码改变时的回调
  const onPageChange = page => {
    // console.log(page)
    // 修改参数依赖项，引发数据的重新获取
    setReqData({
      ...reqData,
      page
    })
  }
  // 切换每页显示条目数的回调
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize)
    setReqData({
      ...reqData,
      per_page: pageSize
    })
  }

  // 删除功能确认的回调 => 采用异步方式，保证删除完成后再更新列表，重新渲染
  const onConfirm = async data => {
    console.log('delete', data.id)
    await deleteArticle(data.id)
    // 更新文章列表，重新渲染页面数据
    setReqData({
      ...reqData
    })
  }

  // 取消删除的回到
  const cancel = () => {}

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: '文章列表' }
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {channelList.map(item => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleList}
          locale={locale}
          pagination={false}
        />
        <Pagination
          current={reqData.page}
          pageSize={reqData.per_page}
          total={count}
          showSizeChanger
          pageSizeOptions={['10', '20', '30']}
          onChange={onPageChange}
          onShowSizeChange={onShowSizeChange}
          style={{ marginTop: '16px', textAlign: 'right' }}
        />
      </Card>
    </div>
  )
}

export default Article
