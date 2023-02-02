interface Post {
  _id: string;
  _v: number;
  name: string;
  prompt: string;
  dimension: string;
  photoURL: string;
}

interface GenerateData {
  name: string;
  prompt: string;
  dimension: string;
  // photos: { b64_json: string }[]; //dummyImages
  photos: string; // openAI Images
  photoURL: string;
}
