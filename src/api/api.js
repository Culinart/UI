import axios from "axios";

const IP = {
    local: `http://localhost:8080/api`,
    img: `http://23.21.48.222:8000`,
    ec2: `http://34.235.192.141/api`
}

const api = axios.create({
    baseURL: IP.local,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});


const apiImg = axios.create({
    baseURL: IP.img,
    timeout: 15000
});

export {
    api,
    apiImg
};

