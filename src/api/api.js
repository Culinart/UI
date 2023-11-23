import axios from "axios";

const api = axios.create({
    // baseURL: `http://localhost:8080`,
    baseURL: `https://653dc13df52310ee6a9a4ab7.mockapi.io`,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});
export default api;