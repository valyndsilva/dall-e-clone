import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import Post from "../../models/Post";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const Posts = async () => {
    await dbConnect();
    const result = await Post.find({});
    const posts = result.map((doc) => {
      const post = doc.toObject();
      post._id = post._id.toString();
      return post;
    });
    return posts;
  };

  try {
    const resPosts = await Posts();
    response.status(200).json(resPosts);
  } catch (error) {
    response.status(400).json({
      success: false,
      data: "Fetching posts failed, please try again",
    });
  }
}
