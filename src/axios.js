import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:3300/api/",
});

instance.interceptors.request.use(function (config) {
    return config;
}, function(err) {
    return Promise.reject(err)
})

instance.interceptors.response.use(function (response) {
    return response.data;
}, function(err) {
    return err.data
})

export default instance;
