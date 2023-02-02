import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";
type Data = {
  success: boolean;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const { method } = req;
  // Connect to dbConnect
  await dbConnect();

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const { method } = req;
  switch (method) {
    // case "GET":
    //   console.log("GET Method triggered!");
    //   try {
    //     /* Fetch existing data from mongoDB*/
    //     const result = await Post.find({});
    //     const posts = result.map((doc) => {
    //       const post = doc.toObject();
    //       post._id = post._id.toString();
    //       return post;
    //     });
    //     res.status(200).json({ success: true, data: posts});
    //   } catch (error) {
    //     res.status(400).json({
    //       success: false,
    //       data: "Fetching posts failed, please try again",
    //     });
    //   }
    //   break;
    case "POST":
      try {
        // console.log(req.body);
        const { name, prompt, dimension, photoURL } = req.body;
        // const photoUrl = await cloudinary.uploader.upload(photoURL); //saves files in assets. makes it mess to manage.
        const photoUrl = await cloudinary.uploader.upload(photoURL, {
          folder: "midjourney-dall-e",
        }); // saves in a folder in assets called "midjourney-dall-e"

        /* create a new model in the database */
        // console.log("POST Method triggered!");
        const newPost = await Post.create({
          name,
          prompt,
          dimension,
          // photoURL,
          photoURL: photoUrl.url,
        });
        // console.log(newPost);
        res.status(201).json({ success: true, data: newPost });
      } catch (error) {
        res.status(400).json({
          success: false,
          data: "Unable to create a post. Please try again...",
        });
      }
      break;
    default:
      res.status(400).json({
        success: false,
        data: "Unable to create a post. Please try again...",
      });
      break;
  }
}
