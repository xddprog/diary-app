import {Menu} from "antd";
import Class from "../ClassComponents/Class.jsx";
import {getTeachersCard} from "../../api/teachers.jsx";
import AddNewTeacher from "../TeacherComponents/AddTeacher.jsx";
import {useState} from "react";
import AddClassModal from "../ClassComponents/AddClass.jsx";
import AddSubjectModal from "../subjectComponents/AddSubject.jsx";
function ManagerPageMenu(
    {
        setClassComponent,
        setTeachersComponents,
        subjectsOptions,
        classesOptions,
        addSubjectItem,
        addClassItem,
        setClassesOptions,
        setSubjectOptions
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
                await getTeachersCard(
                    subject.key, setTeachersComponents
                ).then(teachers => teachers),
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

    return (
        <>
            <Menu
                style={{
                    width: 256,
                    height: '100vh',
                    overflow: 'auto',
                }}
                selectable
                onClick={(item) => {
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
                            console.log(1)
                            onClickAddClass(item)
                            break
                    }
                }}
                mode="inline"
                items={[subjectsOptions, classesOptions, addSubjectItem, addClassItem]}
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

export default ManagerPageMenu;