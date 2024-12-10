import CookieBotDeclaration from "@components/CookieBotDeclaration";
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { cbid } from "../../cookiebot.config.js";

export default function Document() {
  return (
    <Html lang="cs">
      <Head>
        <Script
          strategy="afterInteractive"
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid={cbid}
          data-blockingmode="auto"
          type="text/javascript"
        />
      </Head>
      <body>
        <Main />
        <CookieBotDeclaration />
        <NextScript />
      </body>
    </Html>
  );
}
