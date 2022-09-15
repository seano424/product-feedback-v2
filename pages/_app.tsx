import type { AppProps } from 'next/app'
import { LazyMotion, domAnimation } from 'framer-motion'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'
import { SessionProvider as AuthProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <AuthProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <LazyMotion features={domAnimation}>
            <RecoilRoot>
              <Component {...pageProps} />
            </RecoilRoot>
          </LazyMotion>
        </Hydrate>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default MyApp
