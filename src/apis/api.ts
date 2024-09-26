import axios from "axios";

export const callApi = (
  endPoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: unknown
) => {
  const urlBase = "";

  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  return axios({
    method,
    url: `${urlBase}${endPoint}`,
    data: body,
    headers: { "Content-Type": "application/json" },
  });
};
