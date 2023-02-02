import axios from "axios";
import { getAxios, getData } from ".";

const fetchPosts = async () => {
  // const response = await fetch(`${process.env.NEXTAUTH_URL}/api/getPosts`);
  // const data = await response.json();
  // console.log(data);
  // return data.reverse();
  try {
    // const { data } = await axios.get(
    //   `${process.env.NEXTAUTH_URL}/api/getPosts`
    // );
    const data = await getAxios(`${process.env.NEXTAUTH_URL}/api/getPosts`); //output is a json object
    console.log(data);
    return data.reverse();
  } catch (error) {
    console.log(`error: `, error);
  }
};

export default fetchPosts;
