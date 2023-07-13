import Head from "next/head";
import React from "react";

export function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <Head>
        <title>getbibtex</title>
        <meta name="description" content="URL to BibTeX generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}
