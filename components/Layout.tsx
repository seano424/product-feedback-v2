import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Product Feedback</title>
        <meta name="description" content="Product Feedback" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <main className="flex-1">{children}</main>
    </div>
  )
}
