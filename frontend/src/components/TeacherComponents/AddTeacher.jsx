import {Button, Form, Input, InputNumber, Modal, Select, Space, Typography} from "antd";
import {useState} from "react";
import {addNewTeacher, getTeachersCard} from "../../api/teachers.jsx";
import * as r from "antd";
import Teacher from "./Teacher.jsx";


function AddTeacherModal({modalIsOpen, handler, subject, handlerTeachers}) {
    const form = Form.useForm()

    async function handleSubmit() {
        try {
            const values = await form[0].validateFields()
            values.age = Number(values.age)
            values.subjects = Number(subject)

            const response = await addNewTeacher(values).then(r => r)
            if (response.status === 201) {
                const newTeachers = await getTeachersCard(subject, handlerTeachers).then(cards => cards)
                handlerTeachers(
                    [
                        newTeachers,
                        <AddNewTeacher
                            subject={subject}
                            handlerTeachers={handlerTeachers}
                        />
                    ]
                )
            }
            handler()
        } catch (error) {
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
                    <Typography.Title level={1} >Добавить учителя</Typography.Title>
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
                                message: 'Пожалуйста, введите имя учителя!',
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
                                message: 'Пожалуйста, введите фамилию учителя!',
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
                                message: 'Пожалуйста, введите отчество учителя!',
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
                                message: 'Пожалуйста, введите корректный возраст учителя!',
                            },
                        ]}
                    >
                        <InputNumber min={20} max={80} style={{width:'100%'}}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

function AddNewTeacher({subject, handlerTeachers}) {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const handleCancel = () => {
        setModalIsOpen(false)
    }

    return (
        <Space
            direction="horizontal"
            style={{ width: '100%', justifyContent: 'center'}}
        >
            <Button
                type="primary"
                style={{ marginTop: "15px"}}
                onClick={() => {
                    setModalIsOpen(true)
                }}
            >
                Добавить учителя
            </Button>
            <AddTeacherModal
                modalIsOpen={modalIsOpen}
                handler={handleCancel}
                subject={subject}
                handlerTeachers={handlerTeachers}
            />
        </Space>
    )
}


export default AddNewTeacher;