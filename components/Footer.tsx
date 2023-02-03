import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

function Footer({}: Props) {
  return (
    <div className="h-24 w-full items-center justify-center flex bg-[#15191E] text-white border-t border-t-gray-700">
      <p className="flex space-x-2 items-center">
        <span>Powered by</span>{" "}
        <Link href="https://openai.com/" className="flex space-x-2">
          <Image src="/dalle.png" width={25} height={25} alt="logo"/>
          <span>OpenAI</span>
        </Link>
      </p>
    </div>
  );
}

export default Footer;
