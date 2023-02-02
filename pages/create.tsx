import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { RenderCards } from "../components";
import { DataContext } from "../context/DataContext";
import { getRandomPrompt } from "../utils";
import { dummyImg } from "../utils/dummyData";
import createPost from "../utils/createPost";
import createImages from "../utils/createImages";

interface Props {
  session: Session;
}
function create({ session }: Props) {
  // console.log(dummyImg);

  const router = useRouter();
  const {
    generateData,
    setGenerateData,
    generatingImg,
    setGeneratingImg,
    loading,
    setLoading,
    errorMsg,
    setErrorMsg,
  } = useContext(DataContext);
  console.log(generateData);

  // When suprise me button is clicked:
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(generateData.prompt);
    setGenerateData({ ...generateData, prompt: randomPrompt });
  };

  // On submitting the form
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (generateData.prompt && generateData.dimension) {
      try {
        setGeneratingImg(true);
        const images = await createImages(generateData);
        setGenerateData({
          ...generateData,
          name: `${session.user!.name}`,
          photos: images, // b64_json images from openAi
          // photos: dummyImg, // dummyImages
        });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };
  // When Share button is clicked
  const handleShare = async (generateData: GenerateData) => {
    if (
      generateData.prompt &&
      generateData.dimension &&
      generateData.photoURL
    ) {
      setLoading(true);
      try {
        await createPost(generateData);
        router.push("/");
      } catch (err) {
        // console.log(err);
        setErrorMsg(`Failed to add post: ${err}`);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please select an image you want to share.");
    }
  };
  if (session) {
    return (
      <div className="min-h-[90vh] grid grid-cols-1 md:grid-cols-7">
        <aside className="col-span-2 px-10 space-y-6 border-r border-r-gray-700 bg-[#15191E] ">
          {/* Intro */}
          <div className="mt-5">
            <h1 className="font-extrabold text-gray-400 text-[32px]">Create</h1>
            <p className="mt-2 text-gray-400 text-[14px] max-w-[500px]">
              Generate an imaginative image through DALL-E AI and share it with
              the community
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Propmt Input */}
            <fieldset className="space-y-2 text-gray-400 ">
              <div className="flex items-center gap-2 mb-2">
                <label
                  htmlFor="prompt-textarea"
                  className="text-lg font-medium"
                >
                  Prompt
                </label>
                <button
                  type="button"
                  onClick={handleSurpriseMe}
                  className="font-semibold text-xs bg-gray-100 py-1 px-2 rounded-[5px] text-black"
                >
                  Surprise me
                </button>
              </div>
              <p className="text-sm font-medium">
                What do you want to see? You can use a single word or a full
                sentence.
              </p>
              <textarea
                onChange={(e) =>
                  setGenerateData({
                    ...generateData,
                    [e.target.name]: e.target.value,
                  })
                }
                name="prompt"
                value={generateData.prompt}
                id="prompt-textarea"
                placeholder="Tiny underwater complete world in large glass bowl, water, omnilight, Sharp, detailed and intricate environment"
                className="w-full h-36 max-h-60 resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block p-3"
              ></textarea>
            </fieldset>

            {/* Image Dimensions */}
            <fieldset className="space-y-2 text-gray-400 ">
              <label className="text-lg font-medium">Image Dimensions</label>
              <p className="text-sm font-medium">
                Width × Height of the finished image.
              </p>
              <div className="flex flex-row flex-wrap gap-x-2 gap-y-2">
                <div
                  className={`flex flex-row flex-wrap ${
                    generateData.dimension === "256x256" && "text-blue-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="dimension"
                    value="256x256"
                    className="radio-input  hidden"
                    id="option1"
                    onChange={(e) =>
                      setGenerateData({
                        ...generateData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <label
                    htmlFor="option1"
                    className={`!text-[11px]  w-[98px] rounded-md border-2 border-gray-400 py-2 px-3 text-center leading-3 font-medium text-md cursor-pointer ${
                      generateData.dimension === "256x256" &&
                      "text-blue-400 border-2 border-blue-400"
                    }`}
                  >
                    256 x 256
                  </label>
                </div>
                <div
                  className={`flex flex-row flex-wrap ${
                    generateData.dimension === "512x512" && "text-blue-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="dimension"
                    value="512x512"
                    className="radio-input hidden"
                    id="option2"
                    onChange={(e) =>
                      setGenerateData({
                        ...generateData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <label
                    htmlFor="option2"
                    className={`!text-[11px]  w-[98px] rounded-md border-2 border-gray-400 py-2 px-3 text-center leading-3 font-medium text-md cursor-pointer ${
                      generateData.dimension === "512x512" &&
                      "text-blue-400 border-2 border-blue-400"
                    }`}
                  >
                    512 × 512
                  </label>
                </div>
                <div
                  className={`flex flex-row flex-wrap ${
                    generateData.dimension === "1024x1024" && "text-blue-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="dimension"
                    value="1024x1024"
                    className="radio-input  hidden"
                    id="option3"
                    onChange={(e) =>
                      setGenerateData({
                        ...generateData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <label
                    htmlFor="option3"
                    className={`!text-[11px]  w-[98px] rounded-md border-2 border-gray-400 py-2 px-3 text-center leading-3 font-medium text-md cursor-pointer ${
                      generateData.dimension === "1024x1024" &&
                      "text-blue-400 border-2 border-blue-400"
                    }`}
                  >
                    1024 × 1024
                  </label>
                </div>
              </div>
            </fieldset>

            <div className="mt-5 flex gap-5">
              <button
                type="submit"
                className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {" "}
                {generatingImg ? "Generating..." : "Generate"}
              </button>
            </div>
          </form>
          <div className="mt-10">
            <p className="mt-2 text-gray-400 text-[14px]">
              Once you have created the image you want, you can share it with
              others in the community
            </p>
            <button
              onClick={() => handleShare(generateData)}
              className="mt-3 text-white bg-gray-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? "Sharing..." : "Share with the Community"}
            </button>
            <p className="text-red-600 my-4 text-sm font-light">{errorMsg}</p>
          </div>
        </aside>
        <main
          className="col-span-5 flex p-4 flex-col bg-[#04020E]
         "
        >
          {generateData.photos ? (
            <div className="flex flex-col w-full  flex-1 items-center">
              <h2 className="w-full font-medium text-gray-400 text-xl mb-3">
                Showing Results for:{" "}
                <span className="italic">"{generateData.prompt}"</span>
              </h2>
              <div className="grid lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 grid-cols-1 gap-3 w-full h-full">
                <RenderCards data={generateData} />
              </div>
            </div>
          ) : (
            <div className="flex w-full  flex-1 items-center justify-center">
              <h2 className="w-full font-bold text-center text-gray-400 text-xl">
                Enter a prompt, select a dimension and hit Generate to display
                results...
              </h2>
            </div>
          )}
        </main>
      </div>
    );
  }
  router.push("/");
}

export default create;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};
