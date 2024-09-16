import axios from "axios";
import { BASE_API_URL } from "../utils/constants";


export async function getStudentSchedule(year, week){
    const url = `${BASE_API_URL}/students/${localStorage.getItem('user_id')}/schedule/${year}/${week}`

    return await axios.get(url, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token"),
        }
    }).then(
        response => response
    )
}

export async function getStudentScheduleRows(year, week){
    const url = `${BASE_API_URL}/students/${localStorage.getItem('user_id')}/schedule/${year}/${week}/rows`

    return await axios.get(url, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token"),
        }
    }).then(
        response => response
    )
}

export async function sendHomework(homeworkId, files){
    const studentId = localStorage.getItem("user_id")

    const formData = new FormData()
    files.forEach(file => {
        formData.append("files", file)
    })

    return await axios.post(`${BASE_API_URL}/students/${studentId}/homework/${homeworkId}`,formData, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token"),
            'content-type': 'multipart/form-data'
        },
    }).then(response => response)
}
