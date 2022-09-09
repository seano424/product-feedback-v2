import Head from 'next/head'
import Header from './Header'
import MobileMenu from './MobileMenu'
import Overlay from './Overlay'
import TopDeck from './TopDeck'
import ToolBar from './ToolBar'

export default function Layout({ children }) {
  return (
    <div className="flex  flex-col font-jost">
      <Head>
        <title>Product Feedback</title>
        <meta name="description" content="Product Feedback" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />
      <MobileMenu />
      <Overlay />
      <ToolBar />
      <TopDeck />
      <main className="relative flex-1 bg-gray-light pt-52 lg:pt-[400px] xl:pt-40 xl:pl-96 xl:pr-20">
        {children}
      </main>
    </div>
  )
}
