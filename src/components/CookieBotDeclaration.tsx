import Script from "next/script";
import { cbid } from "../../cookiebot.config.js";

export default function CookieBotDeclaration() {
  return (
    <Script
      strategy="afterInteractive"
      id="CookieDeclaration"
      src={`https://consent.cookiebot.com/${cbid}/cd.js`}
      type="text/javascript"
      async
    />
  );
}
