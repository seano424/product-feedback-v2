import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body
          className={`${
            process.env.NEXT_PUBLIC_DEVMODE && 'debug-screens'
          } scroll-smooth`}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
