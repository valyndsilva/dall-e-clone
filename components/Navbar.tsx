import {
  BoltIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import DropDown from "./DropDown";
import { DataContext } from "../context/DataContext";

interface Props {
  session: Session;
}
function Navbar({ session }: Props) {
  const { setShowModal } = useContext(ModalContext);
  const {
    searchQuery,
    setSearchQuery,
    searchTimeout,
    setSearchTimeout,
    allPosts,
    searchedResults,
    setSearchedResults,
    setGenerateData,
  } = useContext(DataContext);

  const router = useRouter();
  const path = router?.asPath;
  // console.log(allPosts);
  // console.log(searchedResults);

  const handleSearchChange = (e: any) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts?.filter((post) =>
          post.prompt.toLowerCase().includes(searchQuery?.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleCreate = () => {
    setGenerateData({
      name: "",
      prompt: "",
      dimension: "",
      photos: "",
      photoURL: "",
    });
    router.push("/create");
  };
  return (
    <header className="h-[10vh] w-full flex justify-between items-center bg-[#08080E] sm:px-8 px-4 py-4 border-b border-b-gray-700">
      <div className="flex space-x-6 items-center">
        <Link href="/" className="w-40 text-left flex space-x-2 items-center">
          <BoltIcon className="w-6 h-6 text-white" />
          <h1 className="text-white font-extrabold text-md">DALL-E</h1>
        </Link>

        <form
          method="GET"
          className="bg-[#08080E]"
          onSubmit={(e) => handleSearchChange(e)}
        >
          <div className="hidden md:inline-flex items-center relative border-[1px] border-gray-700 rounded-md text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-outline"
              >
                <MagnifyingGlassIcon className="w-6 h-6 text-[#828085]" />
              </button>
            </span>
            <input
              type="search"
              name="q"
              value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              onChange={(e) => handleSearchChange(e)}
              className="py-2 text-sm w-full text-white bg-[#08080E] rounded-md pl-10 focus:outline-none focus:text-white"
              placeholder="Search..."
              autoComplete="off"
            />
            <span className="border-[1px] rounded-md  border-[#828085] px-2 m-1">
              /
            </span>
          </div>
        </form>
      </div>
      <div className="w-fit flex  space-x-4  items-center">
        {!session ? (
          <>
            <span className="bg-[#1D1921] border-[1px] rounded-md  border-[#828085] p-2">
              <UserIcon className="w-6 h-6 text-[#828085] " />
            </span>
            <button
              className="bg-gradient-to-br from-gray-400 to-black-500 to text-white active:bg-black hover:bg-black flex justify-center items-center gap-2
      font-bold px-6 h-10 rounded-md shadow hover:shadow-lg outline-none focus:outline-none"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Get Started
            </button>
          </>
        ) : (
          <>
            <span className="bg-[#1D1921] rounded-lg">
              <Image
                alt={`${session.user!.name} profile picture`}
                src={session.user!.image!}
                width={40}
                height={40}
                className="rounded-lg"
              />
            </span>
            <DropDown session={session} />

            {path === "/" && (
              <button
                className="hidden md:inline-flex bg-gradient-to-br from-gray-400 to-black-500 to text-white active:bg-black hover:bg-black justify-center items-center gap-2
      font-bold px-6 h-10 rounded-md shadow hover:shadow-lg outline-none focus:outline-none"
                type="button"
                // onClick={() => router.push("/create")}
                onClick={() => handleCreate()}
              >
                <PlusCircleIcon className="w-6 h-6" />
                Create
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
