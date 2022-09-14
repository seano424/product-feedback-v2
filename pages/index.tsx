import { useState, useEffect } from 'react'
import Suggestions from '@/components/Suggestions/Suggestions'
import Layout from '@/components/Layout'

const Home = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => console.log(data.productRequests))
  }, [])
  return (
    <Layout>
      <Suggestions />
    </Layout>
  )
}

export default Home
