import React, {useEffect, useState} from 'react';
import {LockOutlined, MailOutlined, NumberOutlined, SkypeOutlined, WhatsAppOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, message, Select, Typography} from 'antd';
import {checkUser, registerUser} from "../../api/auth.jsx";
import {useNavigate} from "react-router-dom";
import * as r from "antd";
import styled from 'styled-components';


function RegisterUser() {
    const navigate = useNavigate();
    const [userStatus, setUserStatus] = useState(401);
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
    const userRolesNavigateUrls = {
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
        const values = await form[0].validateFields();
        try {
            const response = await registerUser(values).then(r => r)

            messageApi.open({
                type: "success",
                content: response.data.message
            });
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user_id", response.data.user_id);

            navigate(userRolesNavigateUrls[values.role], { replace: false });
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
            <Typography.Title level={1}>Регистрация</Typography.Title>
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
                    name="register_code"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите код доступа!',
                        },
                    ]}
                >
                    <Input prefix={<NumberOutlined />} placeholder="Код доступа"/>
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
                    name="hashed_password"
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
                <Form.Item
                    name="vk"
                    rules={[
                        {
                            required: false
                        },
                    ]}
                >
                    <Input
                        prefix={<SkypeOutlined />}
                        placeholder="Вконтакте"
                    />
                </Form.Item>
                <Form.Item
                    name="telegram"
                    rules={[
                        {
                            required: false
                        },
                    ]}
                >
                    <Input
                        prefix={<WhatsAppOutlined />}
                        placeholder="Телеграмм"
                    />
                </Form.Item>
                <Form.Item>
                    <StyledButton type="primary" htmlType="submit">
                        Зарегистрироваться
                    </StyledButton>
                    <a onClick={() => navigate('/login')}>Войти</a>
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

export default RegisterUser;