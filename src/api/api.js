import axios from "axios";

const IP = {
    gabriel: `http://10.18.34.91:8080`,
    local: `http://localhost:8080`,
    ec2: `http://107.20.93.62:8080`
}

const api = axios.create({
    baseURL: IP.ec2,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

export default api;