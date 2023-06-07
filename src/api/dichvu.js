import axios from "../axios";

export const apiAllDV = () =>
  axios({
    url: "/dichvu",
    method: "get",
  });
