import type { AppProps } from 'next/app'
import { LazyMotion, domAnimation } from 'framer-motion'
import { RecoilRoot } from 'recoil'
import Layout from '@/components/Layout'
import '../styles/globals.css'
import { QueryClientProvider, QueryClient } from 'react-query'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </LazyMotion>
    </QueryClientProvider>
  )
}

export default MyApp
