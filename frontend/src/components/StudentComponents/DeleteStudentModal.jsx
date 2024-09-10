import {Modal} from "antd";
import {deleteStudent, getStudentsCard} from "../../api/students.jsx";


function DeleteStudentModal({isOpen, handler, handlerStudents, studentId, classId}) {
    async function handleOkButton() {
        await deleteStudent(studentId).then(status => status)
        const newStudents = await getStudentsCard(classId, handlerStudents).then(students => students)
        handlerStudents(newStudents)
        handler(false)
    }

    return (
        <Modal
            centered
            open={isOpen}
            title="Вы точно хотите удалить данного ученика из базы?"
            okText='Удалить'
            cancelText='Отмена'
            onOk={handleOkButton}
            onCancel={() => handler(false)}
        />
    )
}

export default DeleteStudentModal