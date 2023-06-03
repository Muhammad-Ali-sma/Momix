import axios from "axios"

const API = "https://momix.360telecom.fr/api";


const get = async (host) => {
    const Token = localStorage.getItem("momixToken");
    return await axios.get(host, { headers: { 'Authorization': (Token != '' ? 'Bearer ' + Token : '') } })
        .then(({ data }) => {
            return data;
        })
        .catch(async (error) => {
            return null;
        });
}

const post = async (host, data) => {
    const Token = localStorage.getItem("momixToken");
    return await axios.post(host, data, { headers: { 'Content-Type': 'application/json-patch+json', 'Authorization': (Token != '' ? 'Bearer ' + Token : '') } })
        .then(({ data }) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
}

const postWithoutAuth = async (host, data) => {
    const Token = localStorage.getItem("momixToken");
    return await axios.post(host, data, { headers: { 'Content-Type': 'application/json-patch+json' } })
        .then(({ data }) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
}



export { API,get,post,postWithoutAuth};