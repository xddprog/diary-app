import {Menu} from "antd";
import Class from "../ClassComponents/Class.jsx";
import {getTeachers} from "../../api/teachers.jsx";
import AddNewTeacher from "../TeacherComponents/AddTeacher.jsx";
import {useState} from "react";
import AddClassModal from "../ClassComponents/AddClass.jsx";
import AddSubjectModal from "../subjectComponents/AddSubject.jsx";
import Teacher from "../TeacherComponents/Teacher.jsx";
import styled from "styled-components";


export default function ManagerPageMenu(
    {
        setClassComponent,
        setTeachersComponents,
        subjectsOptions,
        classesOptions,
        setClassesOptions,
        setSubjectOptions,
        handlerTeachers
    }
) {
    const [addClassModalIsOpen, setAddClassModalIsOpen] = useState(false);
    const [addSubjectModalIsOpen, setAddSubjectModalIsOpen] = useState(false);

    async function onClickClass(cls){
        const classComponent = (
            <Class
                key={cls.key}
                cls={cls.key}
                setTeachersComponents={setTeachersComponents}
                classesOptions={classesOptions}
                subjectOptions={subjectsOptions.children}
            />
        )
        setClassComponent(classComponent)
        setTeachersComponents([])
    }

    async function onClickSubject(subject){
        setTeachersComponents(
            [
                await getTeachers(
                    subject.key, setTeachersComponents
                ).then(response => response.data.map(teacher => {
                    <Teacher
                        key={teacher.id}
                        teacher={teacher}
                        subject={subject.key}
                        handlerTeachers={handlerTeachers}
                    />
                })),
                <AddNewTeacher
                    subject={subject.key}
                    handlerTeachers={setTeachersComponents}
                />
            ]
        )
        setClassComponent(null)
    }

    async function onClickAddClass(subject){
        setClassComponent(null)
        setTeachersComponents([])
        setAddClassModalIsOpen(true)
    }

    async function onClickAddSubject(subject){
        setClassComponent(null)
        setTeachersComponents([])
        setAddSubjectModalIsOpen(true)
    }

    async function onClickMenuButton(item) {
        switch (item.keyPath[item.keyPath.length - 1]) {
            case 'subjects':
                onClickSubject(item)
                break
            case 'classes':
                onClickClass(item)
                break
            case 'addSubject':
                onClickAddSubject(item)
                break
            case 'addClass':
                onClickAddClass(item)
                break
        }
    }

    return (
        <>
            <StyledMenu
                selectable
                onClick={onClickMenuButton}
                mode="inline"
                items={[
                    subjectsOptions, 
                    classesOptions, 
                    {key: 'addSubject', label:'Добавить предмет'}, 
                    {key: 'addClass', label:'Добавить класс'}
                ]}
            />
            <AddClassModal
                handler={setAddClassModalIsOpen}
                modalIsOpen={addClassModalIsOpen}
                handlerClasses={setClassesOptions}
            />
            <AddSubjectModal
                handler={setAddSubjectModalIsOpen}
                modalIsOpen={addSubjectModalIsOpen}
                handlerSubjects={setSubjectOptions}
            />
        </>
    )
}


const StyledMenu = styled(Menu)`
    width: 256;
    height: 100vh;
    overflow: auto;
`