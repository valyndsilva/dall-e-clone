import "../styles/globals.css";
import type { AppProps } from "next/app";
import ModalProvider from "../context/ModalContext";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import DataProvider from "../context/DataContext";
import { Layout } from "../components";
function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <SessionProvider session={pageProps.session}>
      <ModalProvider>
        <DataProvider>
          <Layout session={pageProps.session}>
            <Component {...pageProps} />
          </Layout>
        </DataProvider>
      </ModalProvider>
    </SessionProvider>
  );
}

export default MyApp;
