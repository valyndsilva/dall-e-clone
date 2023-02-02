import type { NextApiRequest, NextApiResponse } from "next";
import { configuration } from "../../utils/constants";
import { ImagesResponseDataInner, OpenAIApi } from "openai";

type Data = {
  photos: ImagesResponseDataInner[];
};

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, dimension } = req.body;

  // The image generations endpoint allows you to create an original image given a text prompt
  const response = await openai.createImage({
    // prompt: "a white siamese cat", //
    prompt: prompt, // A text description of the desired image(s). The maximum length is 1000 characters.
    n: 4, // You can request 1-10 images at a time using the n parameter.
    size: dimension, // Generated images can have a size of 256x256, 512x512, or 1024x1024 pixels. Smaller sizes are faster to generate.
    // response_format: "url", //The format in which the generated images are returned. Must be one of url or b64_json.
    response_format: "b64_json", // to avoid CORS problems
  });

  const imageData = response.data;
  console.log({ imageData });
  console.log(imageData.data);
  // const image_url = imageData.data[0].url;
  // const image_url = imageData.data[0].b64_json;
  // console.log(image_url);
  // if (image_url === undefined) throw new Error("No suggestion found");

  // res.status(200).json({ photo: image_url });
  res.status(200).json({ photos: imageData.data });
}
