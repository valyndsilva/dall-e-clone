import axios from "axios";

const createPost = async (generateData: GenerateData) => {
  const contentType = "application/json";
  // await fetch("/api/post", {
  //   method: "POST",
  //   headers: {
  //     Accept: contentType,
  //     "Content-Type": contentType,
  //   },
  //   body: JSON.stringify({
  //     name: generateData.name,
  //     prompt: generateData.prompt,
  //     dimension: generateData.dimension,
  //     photoURL: generateData.photoURL,
  //   }),
  // });

  try {
    await axios(`/api/post`, {
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      data: JSON.stringify({
        name: generateData.name,
        prompt: generateData.prompt,
        dimension: generateData.dimension,
        photoURL: generateData.photoURL,
      }),
      method: "POST",
    });
  } catch (error) {
    console.log(`error: `, error);
  }
};

export default createPost;
