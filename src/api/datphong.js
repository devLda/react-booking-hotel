import axios from "../axios";

export const apiPostDP = (data) =>
  axios({
    url: "/datphong/add",
    method: "post",
    data,
    withCredentials: true,
  });

export const apiCancelDP = (id) =>
  axios({
    url: `/datphong/cancel/${id}`,
    method: "get",
  });

export const apiChangeDay = (id, data) =>
  axios({
    url: `/datphong/updateday/${id}`,
    method: "put",
    data,
  });
