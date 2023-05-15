import axios from "../axios";

export const apiPostDP = (data) =>
  axios({
    url: "/datphong/add",
    method: "post",
    data,
    withCredentials: true,
  });
