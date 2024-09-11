import {Button, Form, Input, InputNumber, Modal, Select, Space, Typography} from "antd";
import {getSubjectsOptions} from "../../api/subjects.jsx";
import {useEffect, useState} from "react";
import {getStudents, updateStudent} from "../../api/students.jsx";
import {getTeachers, updateTeacher} from "../../api/teachers.jsx";


function EditTeacherModal({teacherId, handler, modalIsOpen, subjectId, handlerTeachers}) {
    const form = Form.useForm()
    const [subjectOptions, setSubjectOptions] = useState([])

    useEffect(() => {
        getSubjectsOptions().then(subjects => setSubjectOptions(subjects.children))
    }, []);

    async function handleSubmit() {
        try {
            const values = await form[0].validateFields()
            const response = await updateTeacher(values, teacherId).then(r => r)
            if (response.status === 200) {
                const newStudents = await getTeachers(
                    subject.key, setTeachersComponents
                ).then(response => response.data.map(teacher => {
                    <Teacher
                        key={teacher.id}
                        teacher={teacher}
                        subject={subject.key}
                        handlerTeachers={handlerTeachers}
                    />
                }))
                
                handlerTeachers(newStudents)
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
                </Button>
            ]}
        >
             <Space direction="vertical" style={{width: '100%', justifyContent: 'center'}}>
                 <Typography.Title level={1}>Отредактировать учителя</Typography.Title>
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
                    label="Телеграмм"
                    name="telegram"
                    rules={[
                        {
                            required: false
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Вконтакте"
                    name="vk"
                    rules={[
                        {
                            required: false
                        },
                    ]}
                >
                    <Input />
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
            </Form>
        </Modal>
    )
}

export default EditTeacherModal;