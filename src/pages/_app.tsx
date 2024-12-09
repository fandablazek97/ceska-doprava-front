import AppLayout from "@layouts/AppLayout";
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

// Fonts
import "@fontsource/bebas-neue";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

// Styles
import GoogleAnalytics from "@components/GoogleAnalytics";
import "../styles/main.css";

// GA
// import GoogleAnalytics from "@bradgarropy/next-google-analytics";

// Disable smooth scroll on route change: https://github.com/vercel/next.js/issues/20125#issuecomment-757547865
function useNormalScrollRoutes() {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      document.documentElement.classList.add("!scroll-auto");
    });
    router.events.on("routeChangeComplete", () => {
      document.documentElement.classList.remove("!scroll-auto");
    });
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  useNormalScrollRoutes();
  return (
    <AppLayout>
      <GoogleAnalytics measurementId="G-DHP10PY3S4" />
      <Component {...pageProps} />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Analytics />
    </AppLayout>
  );
}

export default MyApp;
