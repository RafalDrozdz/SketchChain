import axios from "axios";

console.log(process.env.NEXT_PUBLIC_BACKEND_HOST);

export const gameService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_HOST,
});
