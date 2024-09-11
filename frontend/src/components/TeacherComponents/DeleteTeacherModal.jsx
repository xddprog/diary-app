import {deleteTeacher, getTeachers} from "../../api/teachers.jsx";
import {Modal} from "antd";
import AddNewTeacher from "./AddTeacher.jsx";

function DeleteTeacherModal({isOpen, handler, handlerTeachers, teacherId, subject}) {
    async function handleOkButton(){
        await deleteTeacher(teacherId).then(status => status)

        const newTeachers = await getTeachers(
            subject.key, setTeachersComponents
        ).then(response => response.data.map(teacher => {
            <Teacher
                key={teacher.id}
                teacher={teacher}
                subject={subject.key}
                handlerTeachers={handlerTeachers}
            />
        }))

        handlerTeachers(
            [
                newTeachers,
                <AddNewTeacher
                    subject={subject}
                    handlerTeachers={handlerTeachers}
                    teachers={newTeachers}
                />
            ]
        )
        handler(false);
    }

    return (
        <Modal
            centered
            open={isOpen}
            title="Вы точно хотите удалить данного учителя из базы?"
            okText='Удалить'
            cancelText='Отмена'
            onOk={handleOkButton}
            onCancel={() => handler(false)}
        />
    )
}

export default DeleteTeacherModal