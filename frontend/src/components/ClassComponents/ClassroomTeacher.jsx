import {Button, Card, Modal} from "antd";
import {useState} from "react";
import DeleteTeacherModal from "../TeacherComponents/DeleteTeacherModal.jsx";
import styled from "styled-components";


export default function ClassroomTeacher({teacher}) {
    return (
        <>
            <StyledCard
                title={`${teacher.name} ${teacher.surname} ${teacher.middle_name}`}
                bordered={false}
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
            </StyledCard>
        </>
    )
}


const StyledCard = styled(Card)`
  width: 750px;
  margin-top: 15px;
`