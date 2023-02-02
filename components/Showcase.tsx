import { FireIcon, UserIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import Loader from "./Loader";
import ShowcaseCards from "./ShowcaseCards";

type Props = {
  posts: Post[];
};

function Showcase({ posts }: Props) {
  const {
    searchQuery,
    searchedResults,
    showcaseLoading,
    allTab,
    setAllTab,
    myFeedTab,
    setMyFeedTab,
    userPosts,
    session,
  } = useContext(DataContext);
  console.log({ posts });
  console.log({ userPosts });

  return (
    <div className="w-full flex flex-col space-y-6 max-w-screen-2xl p-6 text-white">
      {session && (
        <header className="flex space-x-4">
          <span
            className={`flex gap-2  border-[1px] rounded-full py-3 px-4 text-lg items-center ${
              allTab && "bg-[#EDF2F6] text-black"
            }`}
            onClick={() => {
              setAllTab(true);
              setMyFeedTab(false);
            }}
          >
            <FireIcon className="w-6 h-6" />
            All
          </span>

          <span
            className={`flex gap-2  border-[1px] rounded-full py-3 px-4 text-lg items-center ${
              myFeedTab && "bg-[#EDF2F6] text-black"
            }`}
            onClick={() => {
              setAllTab(false);
              setMyFeedTab(true);
            }}
          >
            <UserIcon className="w-6 h-6" />
            My Feed
          </span>
        </header>
      )}
      {/* OpenAi Generated Images  */}
      <main>
        <section className="mx-auto">
          <div className="">
            <h1 className="font-extrabold text-gray-400 text-[32px]">
              The Community Showcase
            </h1>
            <p className="mt-2 text-[#666e75] text-[14px]">
              Browse through a collection of imaginative and visually stunning
              images generated by DALL-E AI
            </p>
          </div>

          <div className="mt-10">
            {showcaseLoading ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <>
                {searchQuery && (
                  <h2 className="font-medium text-gray-500 text-xl mb-3">
                    Showing Resuls for{" "}
                    <span className="text-gray-300">{searchQuery}</span>:
                  </h2>
                )}
                <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                  {searchQuery ? (
                    <ShowcaseCards
                      data={searchedResults}
                      title="No Search Results Found"
                    />
                  ) : allTab ? (
                    <ShowcaseCards
                      data={posts}
                      title="No Posts Published Yet"
                    />
                  ) : (
                    <ShowcaseCards
                      data={userPosts}
                      title="No Posts Published Yet"
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Showcase;