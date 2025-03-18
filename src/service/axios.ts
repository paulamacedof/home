import axios from "axios";

const bffURL =
  process.env.NODE_ENV === "production"
    ? process.env.HOME_URL
    : "http://localhost:3001";

export const api = axios.create({
  baseURL: bffURL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
