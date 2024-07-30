import axios from "axios";
const server = axios.create({
    baseURL: 'http://localhost:5500/api',
})

export {server}