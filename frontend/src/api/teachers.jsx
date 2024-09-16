import axios from "axios";
import { BASE_API_URL } from "../utils/constants";


export async function getFreeTeachers() {
    return await axios.get(`${BASE_API_URL}/teachers/free`, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(response => {
        return response.data;
    })
}


export async function getTeachers(subjectId) {
    return await axios.get(`${BASE_API_URL}/teachers/${subjectId}`, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(response => response)
}

export async function deleteTeacher(teacherId) {
    return await axios.delete(`${BASE_API_URL}/teachers/${teacherId}`, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(
        response => response.status
    );
}

export async function addNewTeacher(values){
    return await axios.post(`${BASE_API_URL}/teachers/add`, values, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(
        response => response
    );
}

export async function updateTeacher(values, teacherId){
    return await axios.put(`${BASE_API_URL}/teachers/${teacherId}`, values, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(
        response => response
    )
}