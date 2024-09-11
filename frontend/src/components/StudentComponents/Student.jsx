import {Button, Card} from "antd";
import {useState} from "react";
import DeleteStudentModal from "./DeleteStudentModal.jsx";
import EditStudentModal from "./EditStudentModal.jsx";
import styled from "styled-components";


export default function Student({student, handlerStudents, classId}){
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    const handleClickDelete = () => {
        setIsOpenDeleteModal(true)
    }

    const handleClickEdit = () => {
        setIsOpenEditModal(true)
    }

    return(
        <div>
            <StyledCard
                title={`${student.name} ${student.surname} ${student.middle_name}`}
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
            <p><b>Идентификатор:</b>{` ${student.id}`}</p>
            <p><b>Возраст:</b>{` ${student.age}`}</p>

            {(student.register != null) ?
                    <div><p><b>Электронная почта:</b>{
                    (student.email == null)
                        ? ' Не зарегистирован' :
                        ` ${student.email}`
                }
                </p>
                <p><b>Вконтакте:</b>{
                    (student.vk == null)
                        ? ' Не указан' :
                        ` ${student.vk}`
                }
                </p>
                <p><b>Телеграмм:</b>{
                    (student.telegram == null)
                        ? ' Не указан' :
                        ` ${student.telegram}`
                }
                </p>
                </div>: <p><b>Зарегистрирован:</b> Нет</p>}
            </StyledCard>
            <DeleteStudentModal
                isOpen={isOpenDeleteModal}
                handler={setIsOpenDeleteModal}
                handlerStudents={handlerStudents}
                studentId={student.id}
                classId={classId}
            />
            <EditStudentModal
                studentId={student.id}
                handler={setIsOpenEditModal}
                modalIsOpen={isOpenEditModal}
                handlerStudents={handlerStudents}
                classId={classId}
            />
        </div>
    )
}


const StyledCard = styled(Card)`
    width: 750px;
    margin-top: 15px;
`