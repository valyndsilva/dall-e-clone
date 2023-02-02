import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  children?: React.ReactNode;
  session: Session;
}
const Layout = ({ session, children }: Props) => {
  return (
    <>
      <Head>
        <title>MidJourney & Dall-E Clone</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="MidJourney & Dall-E Clone" />
      </Head>

      <div className="flex flex-col z-0">
        <main className="flex-grow dark:bg-blackseed  bg-cottonseed/60">
          <Navbar session={session} />
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
