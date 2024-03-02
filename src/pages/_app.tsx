import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import Script from "next/script";
import { DarkmodeToggle } from "@/components/main/darkmode-toggle";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>{`
        html {
          --font-sans: ${fontSans.variable};
        }
      `}</style>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-J3JZ08YKE2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-J3JZ08YKE2');
        `}
      </Script>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6038855874034663"
        crossOrigin="anonymous"
      />
      <SessionProvider session={session}>
        <main>
          <div className=" absolute right-4 top-4 ">
            <DarkmodeToggle></DarkmodeToggle>
          </div>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
