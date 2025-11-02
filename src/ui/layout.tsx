import Head from "next/head";
import React from "react";
import { Toaster } from "./toaster";

export function Layout({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactElement;
}) {
  return (
    <>
      <Head>
        <title>
          {title ?? "URL to BibTeX generator - get BibTeX for any website"}
        </title>
        <meta
          name="description"
          content={
            description ??
            "Quickly generate BibTeX entry from any URL and any website. No more manually creating @misc entries for websites! Paste an url and that's it!"
          }
        />
        <meta name="author" content="Karol Dzialowski" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          as="video"
          href="/mascot-waving.mp4"
          type="video/mp4"
        />
      </Head>
      <div>
        {children}
        <Toaster />
      </div>
    </>
  );
}
