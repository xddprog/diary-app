import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { getStudentProfile, updateStudent } from "../../api/students";
import styled from "styled-components";


export default function StudentProfile() {
    const form = Form.useForm();
    const [student, setStudent] = useState({});

    useEffect(() => {
        getStudentProfile().then(response => setStudent(response.data))
    }, [])

    async function handleSubmit() {
        try {            
            const values = await form[0].validateFields()
            await updateStudent(values, student.id).then(r => setStudent(r.data))
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <StyledForm
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 18,
            }}
            form={form[0]}
        >
            <Form.Item label="Имя">
                <Input disabled={true} placeholder={student.name}/>
            </Form.Item>
            <Form.Item label="Фамилия">
                <Input disabled={true} placeholder={student.surname}/>
            </Form.Item>
            <Form.Item label="Отчество">
                <Input disabled={true} placeholder={student.middle_name}/>
            </Form.Item>
            <Form.Item label="Возраст">
                <Input disabled={true} placeholder={student.age}/>
            </Form.Item>
            <Form.Item 
                label="Почта"
                name="email"
                rules={[{ required: false, type: "email", message: "Неверная почта!" }]}
            >
                <Input placeholder={student.email}/>
            </Form.Item>
            <Form.Item label="Телеграмм" name="telegram">
                <Input placeholder={student.telegram ?? "Не указан"}/>
            </Form.Item>
            <Form.Item label="Вконтакте" name="vk">
                <Input placeholder={student.vk ?? "Не указан"}/>
            </Form.Item>
            <Button type="primary" onClick={handleSubmit}>Сохранить</Button>
        </StyledForm>
    )
}


const StyledForm = styled(Form)`
    width: 600px;
`