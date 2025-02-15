import {Avatar, Menu} from "antd";
import {useEffect, useState} from "react";
import {UserOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import styled from "styled-components";


export default function TeacherPageMenu() {
    const [selectedKey, setSelectedKey] = useState('');
    const location = useLocation()
    const items = [
        {
            label: 'Классы',
            children: [
                {
                    label: <Link to='classes/all'>Все классы</Link>,
                    key: 'allClasses',
                },
                {
                    label: <Link to='classes/my'>Мой класс</Link>,
                    key: 'myClass',
                },
            ]
        },
        {
            label: 'Расписание',
            key: 'schedule',
        },
        {
            label: 'Мероприятия',
            key: 'events',
        },
        {
            key: 'avatar',
            label: <Avatar size={30} icon={<UserOutlined />} />,
            children: [
                {
                    key: 'profile',
                    label: <Link to='profile'>Профиль</Link>
                },
                {
                    key: 'logout',
                    label: 'Выйти'
                }
            ]
        },
    ]

    useEffect(() => {
        const thisLocation = location.pathname.split('/')
        setSelectedKey(thisLocation[thisLocation.length - 1])
    }, []);


    return (
        <div>
            <StyledMenu
                mode="horizontal"
                items={items}
                selectedKeys={[selectedKey]}
                onClick={(item) => setSelectedKey(item.key)}
            />
        </div>
    )
}


const StyledMenu = styled(Menu)`
    align-items: center;
    justify-content: center;
`