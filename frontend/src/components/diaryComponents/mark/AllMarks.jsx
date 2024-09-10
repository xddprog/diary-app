import {DatePicker, Typography} from "antd";
import AllMarksTable from "./AllMarksTable.jsx";
import {useEffect, useState} from "react";
import {getStudentAllMarks} from "../../../api/students.jsx";


function AllMarks(){
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const thisYear = new Date()
        getStudentAllMarks(thisYear.getFullYear()).then(response => setSubjects(response.data.subjects))
    }, []);

    const onChange = (item) => {
        getStudentAllMarks(item.year()).then(response => setSubjects(response.data.subjects))
    }

    return (
        <div>
            <div style={{marginBottom: "30px"}}>
                <Typography.Title level={5}> Выбрать неделю</Typography.Title>
                <DatePicker onChange={onChange} picker='year' locale='ru_RU'/>
            </div>
            <AllMarksTable subjects={subjects} />
        </div>
    )
}

export default AllMarks;