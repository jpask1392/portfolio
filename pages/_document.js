import cn from "classnames";
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="/fonts/fonts.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&family=Sofia+Sans+Extra+Condensed:wght@100;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <body className={cn("will-change-auto", {
        "debug-screens" : process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
      })}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
