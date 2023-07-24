import Head from "next/head";
import React from "react";

export function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <Head>
        <title>URL to BibTeX generator - get BibTeX for any website</title>
        <meta name="description" content="Quickly generate BibTeX entry from any URL. No more manually creating @misc entries! Paste an url and that's it!" />
        <meta name="author" content="Karol Dzialowski" />
        <meta property="article:published_time" content="2023-07-24" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}
