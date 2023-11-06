// 封装获取频道列表的逻辑
import { useState, useEffect } from 'react'
import { getChannelAPI } from '@/apis/articles'

export function useChannel() {
  // 1.获取频道列表的逻辑
  // 获取频道列表
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    // 1.封装函数，在函数体内调用接口
    const getChannelList = async () => {
      const res = await getChannelAPI()
      // console.log(res)
      setChannelList(res.data.channels)
    }
    // 2. 调用函数
    getChannelList()
  }, [])

  // 2.把组件中要用到的数据return
  // 采用对象的形式return，方便后续使用的时候解构赋值
  return {
    channelList
  }
}
