import axios from "axios";

const IP = {
    local: `http://localhost:8080/api`,
    img: `http://3.212.111.79:8000`,
    ec2: `https://culinart.ddns.net:443/api`,
    dominio: 'https://culinart.ddns.net:443/api'
}

const api = axios.create({
    baseURL: IP.dominio,
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

