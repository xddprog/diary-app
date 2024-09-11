import {useNavigate} from "react-router-dom";
import {Button, Form, Input, message, Select, Typography} from "antd";
import {loginUser} from "../../api/auth.jsx";
import {LockOutlined, MailOutlined, NumberOutlined, SkypeOutlined, WhatsAppOutlined} from "@ant-design/icons";
import styled from "styled-components";

export default function LoginUser(){
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const form = Form.useForm()
    const userTypes = [
        {
            label: "Терпила",
            value: 2
        },
        {
            label: "Учитель",
            value: 1
        },
        {
            label: "Менеджер",
            value: 3
        }
    ]
    const userRolesUrls = {
        1: '/teacher',
        2: '/student',
        3: '/manager'
    }
    // const userTypes = await getUserTypes().then(types => types).map(
    //     type => {return {
    //         label: type.name,
    //         value: type.id
    //     }}
    // );

    async function onFinish() {
        try {
            const values = await form[0].validateFields();
            const response = await loginUser(values).then(r => r)

            messageApi.open({
                type: "success",
                content: response.data.message
            })

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user_id', response.data.user_id)

            navigate(userRolesUrls[values.role], { replace: false });
        } catch(error) {
            messageApi.open({
                type: "error",
                content: error.response.data.detail,
            })
        }
    }

    return (
        <>
            {contextHolder}
            <Typography.Title level={1}>Вход в аккаунт</Typography.Title>
            <StyledForm
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                form={form[0]}
            >
                <Form.Item
                    name="role"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, выберите кто вы!',
                        },
                    ]}
                >
                    <Select placeholder="Выберите тип пользователя" options={userTypes}/>
                </Form.Item>
                <Form.Item
                    name="email"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите свою почту!',
                            type: 'email'
                        },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined />}
                        type="email"
                        placeholder="Почта"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите свой пароль!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item>
                    <StyledButton type="primary" htmlType="submit">
                        Войти
                    </StyledButton>
                    <a onClick={() => navigate('/register')}>Регистрация</a>
                </Form.Item>
            </StyledForm>
        </>
    )
}



const StyledForm = styled(Form)`
    width: 100%;
`

const StyledButton = styled(Button)`
    margin-right: 10px;
`