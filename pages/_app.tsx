import type { AppProps } from 'next/app'
import { LazyMotion, domAnimation } from 'framer-motion'
import { RecoilRoot } from 'recoil'
import Layout from '@/components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LazyMotion features={domAnimation}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </LazyMotion>
  )
}

export default MyApp
