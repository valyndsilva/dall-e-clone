import type { NextApiRequest, NextApiResponse } from "next";
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
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const post = await Post.findById(id);
        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({
          success: false,
          data: "Unable to find post, please try again",
        });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const post = await Post.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!post) {
          return res.status(400).json({
            success: false,
            data: undefined,
          });
        }
        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({
          success: false,
          data: undefined,
        });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedPost = await Post.deleteOne({ _id: id });
        if (!deletedPost) {
          return res.status(400).json({
            success: false,
            data: undefined,
          });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({
          success: false,
          data: undefined,
        });
      }
      break;

    default:
      res.status(400).json({
        success: false,
        data: undefined,
      });
      break;
  }
}
