import Head from "next/head";
import React from "react";

export function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <Head>
        <title>URL to BibTeX generator - get BibTeX for any website</title>
        <meta name="description" content="Quickly generate BibTeX entry from any URL and any website. No more manually creating @misc entries for websites! Paste an url and that's it!" />
        <meta name="author" content="Karol Dzialowski" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {children}
      </div>
    </>
  );
}
