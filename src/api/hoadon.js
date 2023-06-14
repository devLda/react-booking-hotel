import axios from "../axios";

export const apiUpdateHD = (MaHoaDon, data) =>
  axios({
    url: `/hoadon/update/${MaHoaDon}`,
    method: "put",
    data,
  });

export const apiHuyDV = (MaHoaDon, data) =>
  axios({
    url: `/hoadon/huydv/${MaHoaDon}`,
    method: "put",
    data,
  });
