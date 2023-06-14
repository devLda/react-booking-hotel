import axios from "../axios";

export const apiGetAllPhong = () =>
  axios({
    url: "/phong",
    method: "get",
  });

  export const apiGetPhong = (MaPhong) =>
  axios({
    url: `/phong/maphong/${MaPhong}`,
    method: "get",
  });