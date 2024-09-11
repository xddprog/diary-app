import {Modal} from "antd";
import {deleteStudent, getStudents} from "../../api/students.jsx";


function DeleteStudentModal({isOpen, handler, handlerStudents, studentId, classId}) {
    async function handleOkButton() {
        await deleteStudent(studentId).then(status => status)
        const newStudents = await getStudents(classId).then(students => students)
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