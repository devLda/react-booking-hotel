import axios from "../axios";

export const apiGetAllPhong = () =>
  axios({
    url: "/phong",
    method: "get",
  });
