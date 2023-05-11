import axios from "axios";

export const apiGetAllRoom = () => axios ({
    url: '/room',
    method: 'get'
})