import axios from "../axios";

export const apiPostDP = (data) =>
  axios({
    url: "/datphong/add",
    method: "post",
    data,
    withCredentials: true,
  });

  export const apiCancelDP = (data) =>
  axios({
    url: "/datphong/cancel",
    method: "put",
    data
  }) 

  export const apiChangeDay = (id, data) =>
  axios({
    url: `/datphong/updateday/${id}`,
    method: "put",
    data
  }) 