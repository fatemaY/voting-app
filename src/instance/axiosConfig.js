import axios from "axios";

const instance = axios.create({
    baseURL:'https://6571d11bd61ba6fcc013a871.mockapi.io',
    headers:{
        'Content-Type': 'application/json',
        // Authorization: "some Token"
    }
})

export default instance;
