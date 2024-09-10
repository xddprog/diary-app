import HomeworksTable from "./HomeworksTable.jsx";
import {useEffect, useState} from "react";
import {DatePicker, Typography} from "antd";
import {getStudentSchedule, getStudentScheduleRows} from "../../../api/schedule.jsx";


function iso8601Week(date) {
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));

    const thursday = date.getTime();

    date.setMonth(0)
    date.setDate(1)

    const jan1st = date.getTime()
    const days = Math.round((thursday - jan1st) / 86400000);
    return Math.floor(days / 7) + 1;
}


function Homeworks() {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const thisDate = new Date();
        getStudentScheduleRows(thisDate.getFullYear(), iso8601Week(thisDate)).then(
            response => setSchedule(response.data)
        )
    }, []);

    const onChange = (date, dateString) => {
        getStudentScheduleRows(date.year(), date.week()).then(
            response => {
                setSchedule(response.data)
                console.log(response.data)
            }
        );
    };

    return (
        <div>
            <div style={{marginBottom: "30px"}}>
                <Typography.Title level={5}> Выбрать неделю</Typography.Title>
                <DatePicker onChange={onChange} picker="week" locale='ru_RU'/>
            </div>
            <HomeworksTable data={schedule} />
        </div>
    )
}

export default Homeworks;