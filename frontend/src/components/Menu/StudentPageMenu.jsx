import {Avatar, Menu} from "antd";
import {useEffect, useState} from "react";
import {UserOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import styled from "styled-components";


export default function StudentPageMenu() {
    const [selectedKey, setSelectedKey] = useState('');
    const location = useLocation()
    const items = [
        {
            label: 'Дневник',
            children: [
                {
                    label: <Link to='diary'>Дневник</Link>,
                    key: 'diary',
                },
                {
                    label: <Link to='homeworks'>Домашнее задание</Link>,
                    key: 'homeworks',
                },
            ]
        },
        {
            label: 'Оценки',
            children: [
                {
                    label: <Link to='all_marks'>Все оценки</Link>,
                    key: 'all_marks',
                },
                {
                    label: 'Итоговые оценки',
                    key: 'final_marks',
                }
            ]
        },
        {
            label: 'Рейтинг',
            key: 'rating'
        },
        {
            label: 'Полезное',
            key: 'useful',
            children: [
                {
                    label: 'Олимпиады',
                    key: 'olympiads'
                }
            ]
        },
        {
            key: 'avatar',
            label: (
                <Avatar size={30} icon={<UserOutlined />} />
            ),
            children: [
                {
                    key: 'studentProfile',
                    label: 'Профиль'
                },
                {
                    key: 'logOut',
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