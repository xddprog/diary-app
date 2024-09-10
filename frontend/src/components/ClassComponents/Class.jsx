import {useEffect, useState} from "react";
import {getClassInfo} from "../../api/classes.jsx";
import {List, Pagination, Space, Typography} from "antd";
import AddStudent from "../StudentComponents/AddStudent.jsx";
import SetTeacher from "./SetClassTeacher.jsx";




function Class({cls, setTeachersComponents, classesOptions, subjectOptions}) {
    const [teacherComponent, setTeacherComponent] = useState(null);
    const [studentsComponents, setStudentsComponent] = useState([]);
    const [pageMinValue, setPageMinValue] = useState(0);
    const [pageMaxValue, setPageMaxValue] = useState(4);
    const [prevPageValue, setPrevPageValue] = useState(1);
    const [current, setCurrent] = useState(1);

    useEffect(() => {
        getClassInfo(
            cls,
            setTeachersComponents,
            classesOptions,
            setStudentsComponent
        ).then(clsInfo => {
            setStudentsComponent(clsInfo.students)
            setTeacherComponent(clsInfo.teacher)
        })
    }, []);

    const onChangePagination = (value) => {
        console.log(studentsComponents.length);
        if (value > prevPageValue) {
            setPageMinValue(pageMaxValue)
            setPageMaxValue(value * 4)
        } else {
            setPageMaxValue(pageMinValue)
            setPageMinValue(pageMinValue - 4)
        }
        if (pageMinValue * 4 >= studentsComponents.length) {
            setPageMaxValue(studentsComponents.length - 1)
        }
        setPrevPageValue(value)
        setCurrent(value)
    }

    return (
        <Space direction="vertical" >
            <Typography.Title style={{marginBottom: '0px'}}>Классный руководитель</Typography.Title>
            {teacherComponent}
            <SetTeacher classId={cls} handlerTeacher={setTeacherComponent}/>
            <Typography.Title style={{marginTop: '35px', marginBottom: '0px'}}>Ученики</Typography.Title>
            {studentsComponents.length !== 0 ? (<List
                pagination={{
                    pageSize: 4
                }}
                dataSource={studentsComponents}
                renderItem={item => <List.Item style={{border: null}}>{item}</List.Item>}
            />): []}
            <AddStudent handlerStudents={setStudentsComponent} classId={cls} subjectOptions={subjectOptions}/>
        </Space>
    )
}

export default Class;