import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { downloadImage } from "../utils";

type Props = {
  data: any;
};

function RenderCards({ data }: Props) {
  // console.log(data);

  const { generateData, setGenerateData } = useContext(DataContext);
  
  // return data.photos?.map((photo: { url: string }, index: string) => (
  return data.photos?.map((photo: { b64_json: string }, index: string) => (
    <div
      key={index}
      className="rounded-xl group relative shadow-card hover:shadow-cardhover card border border-gray-700 cursor-pointer"
      onClick={() =>
        setGenerateData({
          ...generateData,
          photoURL: `data:image/jpeg;base64,${photo.b64_json}`, //openAI images
          // photoURL: `${photo.b64_json}`, //dummyImages
        })
      }
    >
      <img
        className="w-full h-auto object-cover rounded-xl"
        // src={photo.b64_json}  //dummyImages
        // src={photo.url}
        src={`data:image/jpeg;base64,${photo.b64_json}`} //openAI images
        alt={data.prompt}
        width={300}
        height={300}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">
          {data.prompt}
        </p>

        <div className="mt-5 flex justify-between items-center gap-2 cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {data.name[0]}
            </div>
            <p className="text-white text-sm">{data.name}</p>
          </div>
          <button
            type="button"
            onClick={
              () =>
                // downloadImage(photo.url, index)}
                // downloadImage(`${photo.b64_json}`, index) //dummyImages
                downloadImage(`data:image/jpeg;base64,${photo.b64_json}`, index) //openAI images
            }
            className="outline-none bg-transparent border-none text-white"
          >
            <ArrowDownTrayIcon className="w-5 h-6" />
          </button>
        </div>
      </div>
    </div>
  ));
}

export default RenderCards;
