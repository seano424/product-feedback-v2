import { useState } from 'react'
import type { AppProps } from 'next/app'
import { LazyMotion, domAnimation } from 'framer-motion'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SessionProvider as AuthProvider } from 'next-auth/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <AuthProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <LazyMotion features={domAnimation}>
            <RecoilRoot>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </RecoilRoot>
          </LazyMotion>
        </Hydrate>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default MyApp
