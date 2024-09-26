import { callApi } from "../apis/api";

const getListProducts = (query = "") => {
  return callApi(`https://jsonplaceholder.typicode.com/posts${query}`, "GET");
};

export const products = { getListProducts };
