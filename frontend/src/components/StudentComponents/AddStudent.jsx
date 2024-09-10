import {Button, Form, Input, InputNumber, Modal, Select, Space, Typography} from "antd";
import {useState} from "react";
import {addStudent, getStudentsCard} from "../../api/students.jsx";


function AddStudentModal({classId, modalIsOpen, handler, subjectOptions, handlerStudents}) {
    const form = Form.useForm()

    async function handleSubmit() {
        try {
            const values = await form[0].validateFields()
            values.student_class = classId
            const response = await addStudent(values).then(r => r)
            if (response.status === 201) {
                const newStudents = await getStudentsCard(classId, handlerStudents).then(cards => cards)
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
        <Space
            direction="horizontal"
            style={{ width: '100%', justifyContent: 'center'}}
        >
            <Button
                type="primary"
                style={{ marginTop: "15px", marginBottom: "15px"}}
                onClick={() => {
                    setModalIsOpen(true)
                }}
            >
                Добавить ученика
            </Button>
            <AddStudentModal
                modalIsOpen={modalIsOpen}
                handler={handleCancel}
                subjectOptions={subjectOptions}
                handlerStudents={handlerStudents}
                classId={classId}
            />
        </Space>
    )
}

export default AddNewStudent