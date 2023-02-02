import axios from "axios";
import FileSaver from "file-saver";
import { surpriseMePrompts } from "../utils/prompts";

export function getRandomPrompt(prompt: string) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt: string = surpriseMePrompts[randomIndex];
  return randomPrompt;
}

export async function downloadImage(photo: string | Blob, _id: any) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}

export async function getData(url: string) {
  const response = await fetch(url); /* external API endpoint */
  const jsonData = await response.json();
  return jsonData;
}

export async function getAxios(url: string) {
  const response = await axios.get(url); /* external API endpoint */
  const jsonData = response.data;
  return jsonData;
}
