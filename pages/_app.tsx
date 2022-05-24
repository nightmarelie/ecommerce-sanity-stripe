import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";

import { Layout } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
