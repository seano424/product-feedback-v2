import Head from 'next/head'
import Header from './Header'
import MobileMenu from './MobileMenu'
import Overlay from './Overlay'
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
      <main className="relative top-52 flex-1 lg:top-[400px] xl:top-40 xl:pl-96 xl:pr-20">
        {children}
      </main>
    </div>
  )
}
