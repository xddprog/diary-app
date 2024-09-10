import axios from "axios";
import Student from "../components/StudentComponents/Student.jsx";


export async function deleteStudent(studentId) {
    console.log(studentId);
    return await axios.delete(
        `http://localhost:5000/students/${studentId}`, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token"),
            role: localStorage.getItem("role")
        }
    }).then(response => response.status);
}


export async function getStudentsCard(classId, handlerStudents) {
    return await axios.get(`http://localhost:5000/students/${classId}`, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(response => {
        return response.data.map(student => {
            return (
                <Student
                    student={student}
                    handlerStudents={handlerStudents}
                    classId={classId}
                />
            )
        })
    })
}

export async function addStudent(values) {
    return await axios.post(`http://localhost:5000/students/add`, values, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(
        response => response
    )
}

export async function updateStudent(values, studentId) {
    return await axios.put(`http://localhost:5000/students/${studentId}`, values, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(
        response => response
    )
}

export async function getStudentAllMarks(year) {
    const url = `http://localhost:5000/students/${localStorage.getItem('user_id')}/marks/${year}/all`
    return await axios.get(url, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(
        response => response
    )
}