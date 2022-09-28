import Head from "next/head"
import { ReactNode } from "react"

export const Layout = ({children}: {children: ReactNode}) => {
  return (
   <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
        <meta
          name="description"
          content="Generate BibTex entry from URL. You can generate BibTex for any resource: from Wikipedia to news sites."
        />
        <title>URL to BibTex generator</title>
        <meta property="og:title" content="BibTex entry generator from URL" />
        <meta
          property="og:description"
          content="Simple web application to generate BibTex entry from any URL. No more manually creating @misc entries!"
        />
        <meta
          property="og:url"
          content="https://karlosos.github.io/url_to_bibtex/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og_image.png" />
      </Head>
      {children}
   </>
  )
}