import React, { useContext } from "react";
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DataContext } from "../context/DataContext";
import { downloadImage } from "../utils";
import { useRouter } from "next/router";
import axios from "axios";

type Props = {
  data: any;
  title: string;
};

function ShowcaseCards({ data, title }: Props) {
  const { generateData, setGenerateData, setErrorMsg, session } =
    useContext(DataContext);
  // console.log(data);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      // await fetch(`/api/post/${id}`, {
      //   method: "Delete",
      // });
      await axios.delete(`/api/post/${id}`);
      router.push("/");
    } catch (error) {
      setErrorMsg("Failed to delete the post.");
    }
  };
  if (data?.length > 0) {
    return data?.map((post: Post, index: string) => (
      <div
        key={index}
        className="rounded-xl group relative shadow-card hover:shadow-cardhover card border border-gray-700 cursor-pointer"
        onClick={() =>
          setGenerateData({
            ...generateData,
            photoURL: `${post.photoURL}`,
          })
        }
      >
        <img
          className="w-full h-auto object-cover rounded-xl"
          src={post.photoURL}
          alt={post.prompt}
          width={300}
          height={300}
        />
        <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
          <p className="text-white text-sm overflow-y-auto prompt">
            {post.prompt}
          </p>

          <div className="mt-5 flex justify-between items-center cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
                {post.name[0]}
              </div>
              <p className="text-white text-sm">{`${post.name.substring(
                0,
                18
              )}...`}</p>
            </div>
            {session && (
              <div className="space-x-4">
                <button
                  type="button"
                  onClick={() =>
                    // downloadImage(photo.url, index)}
                    // downloadImage(`data:image/jpeg;base64,${photo.b64_json}`, index)
                    downloadImage(`${post.photoURL}`, index)
                  }
                  className="outline-none bg-transparent text-white  p-2 border border-gray-500 rounded-full hover:bg-gray-400 hover:text-gray-800"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                </button>
                {session.user?.name === post.name && (
                  <button
                    type="button"
                    onClick={() => handleDelete(`${post._id}`)}
                    className="outline-none bg-transparent text-white p-2 border border-gray-500 rounded-full hover:bg-gray-400 hover:text-gray-800"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  }

  return <h2 className="mt-5 font-bold text-gray-400 text-xl">{title}</h2>;
}

export default ShowcaseCards;
