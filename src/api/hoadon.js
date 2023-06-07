import axios from "../axios";

export const apiUpdateHD = (MaHoaDon, data) =>
  axios({
    url: `/hoadon/update/${MaHoaDon}`,
    method: "put",
    data
  });
