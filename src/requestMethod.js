import axios from "axios";

const BASE_URL = "https://react-ecommerce-dbgk.onrender.com/api/v1/";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
})