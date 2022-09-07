import Head from 'next/head'
import Header from './Header'
import MobileMenu from './MobileMenu'
import useShowMobileNav from 'hooks/useShowMobileNav'

export default function Layout({ children }) {
  const [isMenuOpen] = useShowMobileNav()

  return (
    <div className="flex min-h-screen flex-col font-jost">
      <Head>
        <title>Product Feedback</title>
        <meta name="description" content="Product Feedback" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />
      <MobileMenu />
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 z-10 bg-black/70"></div>
      )}
      <main className="relative top-20 flex-1">{children}</main>
    </div>
  )
}
