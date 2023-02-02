import type { GetServerSideProps } from "next";
import Head from "next/head";
import { Modal, Navbar, Showcase } from "../components";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { useContext, useEffect } from "react";
import { ModalContext } from "../context/ModalContext";
import dbConnect from "../lib/dbConnect";
import fetchPosts from "../utils/fetchPosts";
import { DataContext } from "../context/DataContext";
import Post from "../models/Post";

interface Props {
  session: Session;
  posts: any;
}
const Home = ({ session, posts }: Props) => {
  // console.log(session);
  const { setShowcaseLoading, userPosts, setUserPosts, setAllPosts } =
    useContext(DataContext);
  console.log({ posts });
  console.log({ userPosts });

  useEffect(() => {
    setShowcaseLoading(true);
    setTimeout(() => {
      setAllPosts(posts);
      const searchUserPosts = posts!.filter(
        (post: Post) =>
          post.name.toLowerCase() === session?.user!.name!.toLowerCase()
      );
      setUserPosts(searchUserPosts);
    }, 500);
    setShowcaseLoading(false);
  }, [posts]);

  const { showModal } = useContext(ModalContext);
  return (
    <div className="min-h-[90vh] flex flex-col items-center bg-[#15191E]">
      <main
        className={`flex w-full max-w-[1400px] flex-1 flex-col items-center 
          }`}
      >
        <div
          className={`flex w-full  flex-1 flex-col ${
            showModal && "blur-sm z-40"
          }`}
        >
          <Showcase posts={posts} />
        </div>
        <Modal session={session} />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  await dbConnect();
  /* Fetch existing data from mongoDB*/
  const result = await Post.find({});
  const posts = result.reverse().map((doc) => {
    const post = doc.toObject();
    post._id = post._id.toString();
    return post;
  });
  // const posts = await fetchPosts();
  return {
    props: {
      session,
      posts:JSON.parse(JSON.stringify(posts)),
    },
  };
};
