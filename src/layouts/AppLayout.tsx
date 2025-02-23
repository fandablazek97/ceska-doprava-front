import { CookieBanner } from "@components/cookies/CookieConsent";
import { Footer } from "@components/root/footer";
import { Head } from "@components/root/head";
import { Navbar } from "@components/root/navbar";
import { SkipToContent } from "@components/root/skipToContent";

type AppShellOptions = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppShellOptions) {
  return (
    <>
      <header>
        <SkipToContent />
        <Head />
        <Navbar />
      </header>
      <main id="main">{children}</main>
      <Footer />
      <CookieBanner showOnScroll />
    </>
  );
}
