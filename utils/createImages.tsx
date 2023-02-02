import axios from "axios";

const createImages = async (generateData: GenerateData) => {
  const contentType = "application/json";
  // const response = await fetch("api/dall-e", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": contentType,
  //   },
  //   body: JSON.stringify({
  //     prompt: generateData.prompt,
  //     dimension: generateData.dimension,
  //   }),
  // });

  // const data = await response.json();
  // console.log(data);
  // return data.photos;
  try {
    const { data } = await axios(`/api/dall-e`, {
      headers: {
        "Content-Type": contentType,
      },
      data: JSON.stringify({
        prompt: generateData.prompt,
        dimension: generateData.dimension,
      }),
      method: "POST",
    });
    // console.log(data);
    return data.photos;
  } catch (error) {
    console.log(`error: `, error);
  }
};

export default createImages;
