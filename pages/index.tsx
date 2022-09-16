import Suggestions from '@/components/Suggestions/Suggestions'
import Layout from '@/components/Layout'
import { signIn } from 'next-auth/react'

const Home = () => {
  const signInWithEmail = async () => {
    try {
      // Perform sign in
      const { error } = await signIn('gmail', {
        redirect: false,
        callbackUrl: window.location.href,
      })
      // Something went wrong
      if (error) {
        throw new Error(error)
      }
    } catch (err) {
    } finally {
    }
  }

  return (
    <Layout>
      <Suggestions />
    </Layout>
  )
}

export default Home
