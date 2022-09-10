import { dehydrate, QueryClient } from 'react-query'

import Suggestions from '@/components/Suggestions/Suggestions'
import type { GetServerSideProps } from 'next'
import Layout from '@/components/Layout'

const Home = () => {
  return (
    <Layout>
      <Suggestions />
    </Layout>
  )
}

export default Home
