import Head from 'next/head'
import Header from './Header'
import MobileMenu from './MobileMenu'
import Overlay from './Overlay'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col font-jost">
      <Head>
        <title>Product Feedback</title>
        <meta name="description" content="Product Feedback" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />
      <MobileMenu />
      <Overlay />
      <main className="relative top-20 flex-1">{children}</main>
    </div>
  )
}
