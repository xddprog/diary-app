import {Button, List, Modal, Space} from "antd";
import {useEffect, useState} from "react";
import {getFreeTeachers} from "../../api/teachers.jsx";
import {setClassTeacher} from "../../api/classes.jsx";
import Teacher from "../TeacherComponents/Teacher.jsx";
import ClassroomTeacher from "./ClassroomTeacher.jsx";


function SetTeacherButton({teacherId, classId, handlerTeacher, handler}) {

    async function setTeacher() {
        const response = await setClassTeacher(teacherId, classId).then(r => r);
        if (response.status === 200) {
            const teacher = response.data;
            const teacherComponent = <ClassroomTeacher teacher={teacher}/>
            handlerTeacher(teacherComponent);
            handler(false)
        }
    }

    return (
        <Button type="primary" onClick={setTeacher}>Выбрать</Button>
    )
}

function SetTeacherModal({modalIsOpen, handlerTeacher, handler, classId, teacherOptions}) {
    
    return (
        <Modal
            centered
            open={modalIsOpen}
            onCancel={handler}
            footer={[]}
        >
            <List
                style={{marginTop: '20px', marginLeft: '10px'}}
                itemLayout="horizontal"
                dataSource={teacherOptions}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <SetTeacherButton
                                teacherId={item.id}
                                classId={classId}
                                handlerTeacher={handlerTeacher}
                                handler={handler}
                            />
                        ]}
                    >
                        <List.Item.Meta
                            title={`${item.name} ${item.surname} ${item.middle_name}`}
                            description={`Предметы: ${item.subjects.map(item => item.subject_name).join(', ')}, Возраст: ${item.age}`}
                        />
                    </List.Item>
                )}
            />
        </Modal>
    )
}


function SetTeacher({handlerTeacher, classId}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [teacherOptions, setTeacherOptions] = useState([]);

    const handleCancel = () => {
        setModalIsOpen(false)
    }

    return (
        <Space direction="vertical">
            <Button
                type="primary"
                style={{ marginTop: "15px"}}
                onClick={() => {
                    setModalIsOpen(true)
                    getFreeTeachers().then(r => setTeacherOptions(r))
                }}
            >
                Выбрать учителя
            </Button>
            <SetTeacherModal
                modalIsOpen={modalIsOpen}
                handler={handleCancel}
                handlerTeacher={handlerTeacher}
                classId={classId}
                teacherOptions={teacherOptions}
            />
        </Space>
    )
}

export default SetTeacher;