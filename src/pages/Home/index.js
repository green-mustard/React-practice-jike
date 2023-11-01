import BarChart from '@/components/BarChart'

export default function Home() {
  const data1 = [100, 60, 30]
  const data2 = [120, 80, 200]
  return (
    <div>
      <BarChart title={'三大框架满意度'} data={data1} />
      <BarChart title={'三大框架使用度'} data={data2} />
    </div>
  )
}
