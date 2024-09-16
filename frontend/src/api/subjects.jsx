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


export async function getSubjectsOptions() {
    return await axios.get(`${BASE_API_URL}/subjects/all`, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then((response) => {
        let responseSubjects = response.data.map((item) => {
            return getItem(
                item.subject_name,
                item.id
            );
        })
        return getItem('Предметы', 'subjects', null, responseSubjects)
    })
}


export async function addNewSubject(values) {
    return await axios.post(`${BASE_API_URL}/subjects/add`, values, {
        headers: {
            Authorization:"Bearer " + localStorage.getItem("token")
        }
    }).then(
        response => response
    )
}