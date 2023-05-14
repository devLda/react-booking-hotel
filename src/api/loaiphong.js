import axios from "../axios";

export const apiGetAllLoaiPhong = () =>
  axios({
    url: "/loaiphong",
    method: "get",
  });
