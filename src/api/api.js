import axios from "axios";

const IP = {
    local: `http://localhost:8080/api`,
    ec2: `http://107.20.93.62:8080/api`
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
