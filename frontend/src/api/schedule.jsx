import axios from "axios";

export async function getStudentSchedule(year, week){
    const url = `http://localhost:5000/students/${localStorage.getItem('user_id')}/schedule/${year}/${week}`

    return await axios.get(url, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token"),
        }
    }).then(
        response => response
    )
}

export async function getStudentScheduleRows(year, week){
    const url = `http://localhost:5000/students/${localStorage.getItem('user_id')}/schedule/${year}/${week}/rows`

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

    return await axios.post(`http://localhost:5000/students/${studentId}/homework/${homeworkId}`,formData, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token"),
            'content-type': 'multipart/form-data'
        },
    }).then(response => response)
}
