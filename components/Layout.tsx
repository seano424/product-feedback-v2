import Head from 'next/head'
import MobileHeader from './Mobile/MobileHeader'
import MobileMenu from './Mobile/MobileMenu'
import MobileOverlay from './Mobile/MobileOverlay'
import ToolBar from './Headers/ToolBar'
import TopDeck from './Headers/TopDeck'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-light font-jost">
      <Head>
        <title>Product Feedback</title>
        <meta name="description" content="Product Feedback" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <MobileHeader />
      <MobileMenu />
      <MobileOverlay />
      <ToolBar />
      <TopDeck />
      <main className="relative flex-1 pt-52 lg:pt-[400px] xl:pt-36 xl:pl-96 xl:pr-20">
        {children}
      </main>
    </div>
  )
}
