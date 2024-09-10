import {Button, Form, Input, Modal, Select, Space, Typography} from "antd";
import {addNewClass, getClassesOptions} from "../../api/classes.jsx";
import {addNewSubject, getSubjectsOptions} from "../../api/subjects.jsx";


function AddSubjectModal({handler, handlerSubjects, modalIsOpen}) {
    const form = Form.useForm()

    async function handleSubmit() {
        try {
            const values = await form[0].validateFields()
            const response = await addNewSubject(values).then(r => r)
            if (response.status === 201) {
                const newSubjectOptions = await getSubjectsOptions().then(r => r)
                handlerSubjects(newSubjectOptions)
                handler(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal
            destroyOnClose
            centered
            open={modalIsOpen}
            onCancel={() => handler(false)}
            onOk={handleSubmit}
            footer={[
                <Button form={form[0]} key="submit" type="primary" onClick={handleSubmit}>
                    Добавить
                </Button>
            ]}
        >
            <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}>
                <Typography.Title level={1} >Добавить класс</Typography.Title>
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
                    label='Название'
                    name="subject_name"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите название предмета!"
                        },
                    ]}
                >
                    <Input placeholder="Введите название предмета" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddSubjectModal