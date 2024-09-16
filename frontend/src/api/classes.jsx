import axios from "axios";
import { BASE_API_URL } from "../utils/constants";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


export async function getClassesOptions() {
    return await axios.get(`${BASE_API_URL}/class/all`, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token"),
            role: localStorage.getItem("role")
        }
    }).then((response) => {
        const responseClasses = response.data.map((item) => {
            return getItem(
                `${item.class_number} ${item.class_word}`,
                item.id
            );
        })
        return getItem('Классы', 'classes', null, responseClasses)
    })
}


export async function getClassInfo(classId, handlerTeachers, classesOptions, handlerStudents) {
    return await axios.get(`${BASE_API_URL}/class/${classId}`, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token"),
            role: localStorage.getItem("role")
        }
    }).then(response => response)
}

export async function setClassTeacher(teacherId, classId){
    return await axios.patch(`${BASE_API_URL}/class/${classId}/teacher/${teacherId}`, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(
        (response) => {
            return response
        }
    )
}

export async function addNewClass(values) {
    return await axios.post(`${BASE_API_URL}/class/add`, values, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(
        response => response
    )
}