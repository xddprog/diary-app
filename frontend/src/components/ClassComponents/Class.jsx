import {useEffect, useState} from "react";
import {getClassInfo} from "../../api/classes.jsx";
import {List, Pagination, Space, Typography} from "antd";
import AddStudent from "../StudentComponents/AddStudent.jsx";
import SetTeacher from "./SetClassTeacher.jsx";
import Student from "../StudentComponents/Student.jsx";
import ClassroomTeacher from "./ClassroomTeacher.jsx";
import styled from "styled-components";




export default function Class({cls, setTeachersComponents, classesOptions, subjectOptions}) {
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
        ).then((response) => {
            let classroomTeacher    
            const clsInfo = response.data;
            const classStudents = clsInfo.students.map((student) => {
                return (
                    <Student
                        student={student}
                        key={student.id}
                        handlerStudents={handlerStudents}
                        classId={cls}
                    />
                )
            })

            if (clsInfo.classroom_teacher !== null) {
                classroomTeacher = (
                    <ClassroomTeacher teacher={clsInfo.classroom_teacher}/>
                )
            } else {
                classroomTeacher = (
                    <ClassroomTeacherNotFound level={5}>
                        Классного руководителя в данном классе нет
                    </ClassroomTeacherNotFound>
                )
            }
            
            setStudentsComponent(classStudents)
            setTeacherComponent(classroomTeacher)
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
            <ClassTitle>Классный руководитель</ClassTitle>
            {teacherComponent}
            <SetTeacher classId={cls} handlerTeacher={setTeacherComponent}/>
            <ClassStudentsContainerTitle>Ученики</ClassStudentsContainerTitle>
            {studentsComponents.length !== 0 ? (<List
                pagination={{
                    pageSize: 4
                }}
                dataSource={studentsComponents}
                renderItem={item => <StyledListItem>{item}</StyledListItem>}
            />): []}
            <AddStudent 
                handlerStudents={setStudentsComponent} 
                classId={cls} 
                subjectOptions={subjectOptions}
            />
        </Space>
    )
}

const ClassTitle = styled(Typography.Title)`
    margin-bottom: 0px;
`

const ClassroomTeacherNotFound = styled(ClassTitle)`
    margin-top: 15px;
`

const ClassStudentsContainerTitle = styled(ClassTitle)`
    margin-top: 35px;
`

const StyledListItem = styled(List.Item)`
    border: none;
`