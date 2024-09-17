import {Button, Form, Input, InputNumber, Modal, Select, Space, Typography} from "antd";
import {useState} from "react";
import {addStudent, getStudents} from "../../api/students.jsx";
import styled from "styled-components";


function AddStudentModal({classId, modalIsOpen, handler, subjectOptions, handlerStudents}) {
    const form = Form.useForm()

    async function handleSubmit() {
        try {
            const values = await form[0].validateFields()
            values.student_class = classId
            const response = await addStudent(values).then(r => r)
            if (response.status === 201) {
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
            }
            handler()
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Modal
                destroyOnClose
                centered
                open={modalIsOpen}
                onCancel={handler}
                onOk={handleSubmit}
                footer={[
                    <Button form={form[0]} key="submit" type="primary" onClick={handleSubmit}>
                        Добавить
                    </Button>,
                    <Button key="cancel" onClick={handler}>
                        Отмена
                    </Button>
                ]}
            >
                <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}>
                    <Typography.Title level={1} >Добавить ученика</Typography.Title>
                </Space>
                <Form
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
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item
                        label="Имя"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите имя ученика!',
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
                                required: true,
                                message: 'Пожалуйста, введите фамилию ученика!',
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
                                required: true,
                                message: 'Пожалуйста, введите отчество ученика!',
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
                                required: true,
                                message: 'Пожалуйста, введите корректный возраст ученика!',
                            },
                        ]}
                    >
                        <InputNumber min={5} max={25} style={{width:'100%'}}/>
                    </Form.Item>
                    <Form.Item
                        label="Предметы"
                        name="subjects"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, выберите предметы ученика!',
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
                </Form>
            </Modal>
        </div>
    )
}


function AddNewStudent({classId, subjectOptions, handlerStudents}) {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const handleCancel = () => {
        setModalIsOpen(false)
    }

    return (
        <StyledSpace direction="horizontal">
            <StyledButton
                type="primary"
                onClick={() => {
                    setModalIsOpen(true)
                }}
            >
                Добавить ученика
            </StyledButton>
            <AddStudentModal
                modalIsOpen={modalIsOpen}
                handler={handleCancel}
                subjectOptions={subjectOptions}
                handlerStudents={handlerStudents}
                classId={classId}
            />
        </StyledSpace>
    )
}

export default AddNewStudent


const StyledSpace = styled(Space)`
    justify-content: center;
    width: 100%;
`   


const StyledButton = styled(Button)`
    margin-top: 15px;
    margin-bottom: 15px;
`   