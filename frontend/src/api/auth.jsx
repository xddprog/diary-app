import axios from "axios";
import { BASE_API_URL } from "../utils/constants";


export async function registerUser(values) {
    return await  axios.post(`${BASE_API_URL}/auth/register`, values).then(
        response => response
    )
}


export async function loginUser(values) {
    return await axios.post(`${BASE_API_URL}/auth/login`, values).then(
        response => response
    )
}

export async function checkUser(role) {
    return await axios.get(`${BASE_API_URL}/auth/check`, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token"),
            role: role
        }
    }).then(
        response => response
    )
}