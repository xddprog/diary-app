import axios from "axios";
import { BASE_API_URL } from "../utils/constants";

export async function deleteStudent(studentId) {
    console.log(studentId);
    return await axios.delete(
        `${BASE_API_URL}/students/${studentId}`, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token"),
            role: localStorage.getItem("role")
        }
    }).then(response => response.status);
}


export async function getStudents(classId) {
    return await axios.get(`${BASE_API_URL}/students/${classId}`, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(response => response)
}

export async function addStudent(values) {
    return await axios.post(`${BASE_API_URL}/students/add`, values, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(
        response => response
    )
}

export async function updateStudent(values, studentId) {
    return await axios.put(`${BASE_API_URL}/students/${studentId}`, values, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(
        response => response
    )
}

export async function getStudentAllMarks(year) {
    const url = `${BASE_API_URL}/students/${localStorage.getItem('user_id')}/marks/${year}/all`
    return await axios.get(url, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(
        response => response
    )
}

export async function getStudentsRating({classes, subjects, year}) {
    const url = `${BASE_API_URL}/students/rating`
    
    return await axios.post(url, {
            classes: classes ? classes : null,
            subjects: subjects ? subjects : null,
            year: year ? year.$y : null
        },
        {
            headers: {
                Authorization:"Bearer " + localStorage.getItem("token")
            }
        }).then(
        response => response
    )
}