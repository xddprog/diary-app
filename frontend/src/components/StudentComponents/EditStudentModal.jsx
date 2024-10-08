import {Button, Form, Input, InputNumber, Modal, Select, Space, Typography} from "antd";
import {getSubjectsOptions} from "../../api/subjects.jsx";
import {useEffect, useState} from "react";
import {getClassesOptions} from "../../api/classes.jsx";
import {getStudents, updateStudent} from "../../api/students.jsx";
import Student from "./Student.jsx";
import styled from "styled-components";


export default function EditStudentModal(
    {
        studentId, 
        handler,
        modalIsOpen, 
        classId, 
        handlerStudents
    }
) {
    const form = Form.useForm()
    const [subjectOptions, setSubjectOptions] = useState([])
    const [classesOptions, setClassesOptions] = useState([])

    useEffect(() => {
        getSubjectsOptions().then(subjects => setSubjectOptions(subjects.children))
        getClassesOptions().then(classes => setClassesOptions(classes.children))
    }, []);

    async function handleSubmit() {
        try {
            const values = await form[0].validateFields()
            const response = await updateStudent(values, studentId).then(r => r)
            if (response.status === 200) {
                const newStudents = await getStudents(classId).then(
                    response => response.data.map(student => {
                        return (
                            <Student
                                student={student}
                                handlerStudents={handlerStudents}
                                classId={classId}
                            />
                        )
                    })
                )
                handlerStudents(newStudents)
                handler(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            destroyOnClose
            centered
            open={modalIsOpen}
            onOk={handleSubmit}
            onCancel={() => handler(false)}
            footer={[
                <Button form={form[0]} key="submit" type="primary" onClick={handleSubmit}>
                    Сохранить
                </Button>,
            ]}
        >
            <StyledSpace direction="vertical">
                 <Typography.Title level={1}>Отредактировать ученика</Typography.Title>
            </StyledSpace>
            <StyledForm
                form={form[0]}
                layout="horizontal"
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 18,
                }}
            >
                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[
                        {
                            required: false
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Фамилия"
                    name="surname"
                    rules={[
                        {
                            required: false
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Отчество"
                    name="middle_name"
                    rules={[
                        {
                            required: false
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Возраст"
                    name="age"
                    rules={[
                        {
                            required: false
                        },
                    ]}
                >
                    <InputNumber min={20} max={80} style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item
                    label="Предметы"
                    name="subjects"
                    rules={[
                        {
                            required: false
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder='Выберите предметы'
                        options={subjectOptions.map(subject => {
                            return {
                                value: subject.key,
                                label: subject.label,
                            }
                        })}
                    />
                </Form.Item>
                <Form.Item
                    label="Класс"
                    name="student_class"
                    rules={[
                        {
                            required: false
                        },
                    ]}
                >
                    <Select
                        placeholder='Выберите класс'
                        options={classesOptions.map(subject => {
                            return {
                                value: subject.key,
                                label: subject.label,
                            }
                        })}
                    />
                </Form.Item>
            </StyledForm>
        </Modal>
    )
}


const StyledSpace = styled(Space)`
    width: 100%;
    justify-content: center;
`

const StyledForm = styled(Form)`
    width: 600px;
`