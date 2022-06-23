import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/dmn6gns.css" />
      </Head>
      <body data-scroll-container>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
