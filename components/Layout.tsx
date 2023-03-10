import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import Footer from "./Footer";

interface Props {
  children?: React.ReactNode;
  session: Session;
}
const Layout = ({ session, children }: Props) => {
  return (
    <>
      <Head>
        <title>DALL-E 2.0 Clone</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="DALL-E 2.0 - Create realistic images and art from a description in natural language"
        />
      </Head>

      <div className="flex flex-col z-0">
        <main className="flex-grow dark:bg-blackseed  bg-cottonseed/60">
          <Navbar session={session} />
          {children}
        </main>
        <Footer/>
      </div>
    </>
  );
};

export default Layout;
