import {Button, Card, Modal} from "antd";
import {useState} from "react";
import DeleteTeacherModal from "./DeleteTeacherModal.jsx";
import EditTeacherModal from "./EditTeacherModal.jsx";


function Teacher({teacher, handlerTeachers, subject}) {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    const handleClickDelete = () => {
        setIsOpenDeleteModal(true)
    }

    const handleClickEdit = () => {
        setIsOpenEditModal(true)
    }

    return (
        <>
            <Card
                title={`${teacher.name} ${teacher.surname} ${teacher.middle_name}`}
                bordered={false}
                style={{
                    width: "750px",
                    marginTop: "15px"
                }}
                extra={
                    <div>
                        <Button
                            type="primary"
                            style={{marginRight: "10px"}}
                            onClick={handleClickEdit}
                        >
                            Редактировать
                        </Button>
                        <Button
                            type="primary"
                            danger
                            ghost
                            onClick={handleClickDelete}
                        >
                            Удалить
                        </Button>
                    </div>
                }
            >
                <p><b>Идентификатор:</b>{` ${teacher.id}`}</p>
                <p><b>Возраст:</b>{` ${teacher.age}`}</p>
                <p><b>Классный руководитель:</b>
                    {
                        (teacher.teacher_class == null)
                            ? ' Не является классным руководителем' :
                            ` ${teacher.teacher_class.class_number} ${teacher.teacher_class.class_word}`
                    }
                </p>
                {(teacher.register != null) ?
                    <div><p><b>Электронная почта:</b>{
                    (teacher.email == null)
                        ? ' Не зарегистирован' :
                        ` ${teacher.email}`
                }
                </p>
                <p><b>Вконтакте:</b>{
                    (teacher.vk == null)
                        ? ' Не указан' :
                        ` ${teacher.vk}`
                }
                </p>
                <p><b>Телеграмм:</b>{
                    (teacher.telegram == null)
                        ? ' Не указан' :
                        ` ${teacher.telegram}`
                }
                </p>
                </div>: <p><b>Зарегистрирован:</b> Нет</p>}
            </Card>
            <DeleteTeacherModal
                teacherId={teacher.id}
                isOpen={isOpenDeleteModal}
                handler={setIsOpenDeleteModal}
                handlerTeachers={handlerTeachers}
                subject={subject}
            />
            <EditTeacherModal
                teacherId={teacher.id}
                handler={setIsOpenEditModal}
                modalIsOpen={isOpenEditModal}
                handlerTeachers={handlerTeachers}
                subjectId={subject}
            />
        </>
    )
}

export default Teacher;