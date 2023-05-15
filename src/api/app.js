import axios from "../axios";

export const apiGetAllRoom = () =>
  axios({
    url: "/phong/multiphong",
    method: "get",
  });
