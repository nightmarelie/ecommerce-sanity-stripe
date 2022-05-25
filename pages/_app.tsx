import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";

import { StateContext } from "../context/StateContext";

import { Layout } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
