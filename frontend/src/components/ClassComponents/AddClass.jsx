import {Button, Form, Modal, Select, Space, Typography} from "antd";
import {addNewClass, getClassesOptions} from "../../api/classes.jsx";


function AddClassModal({handler, handlerClasses, modalIsOpen}) {
    const form = Form.useForm()

    async function handleSubmit() {
        try {
            const values = await form[0].validateFields()
            console.log(values)
            values.class_number = Number(values.class_number)
            const response = await addNewClass(values).then(r => r)
            if (response.status === 201) {
                const newClassOptions = await getClassesOptions().then(r => r)
                handlerClasses(newClassOptions)
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
                    Создать
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
                    label="Номер"
                    name="class_number"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, выберите номер класса!'
                        },
                    ]}
                >
                    <Select
                        placeholder='Выберите номер класса'
                        options={[{value: 10, key: 10}, {value: 11, key: 11}]}
                    />
                </Form.Item>
                <Form.Item
                    label="Буква"
                    name="class_word"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, выберите букву класса!'
                        },
                    ]}
                >
                    <Select
                        placeholder='Выберите букву класса'
                        options={'ЫЗВИ'.split('').map(item => {
                            return {
                                value: item,
                                key: item
                            }
                        })}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddClassModal