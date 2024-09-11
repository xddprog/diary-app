import {Table} from "antd";
import {useState} from "react";
import SendHomework from "../homework/SendHomework.jsx";
import Marks from "../mark/ScheduleMark.jsx";
import HomeworkWrapper from "../homework/HomeworkWrapper.jsx";
import styled from "styled-components";


export default function ScheduleTable({data}) {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [thisHomework, setThisHomework] = useState(null);
    const tableColumns = [
        {
            title: '№',
            dataIndex: 'rowNumber',
            width: '4%',
        },
        {
            title: 'Предмет',
            dataIndex: 'subject',
            width: '15%'
        },
        {
            title: 'Домашнее задание',
            dataIndex: 'homework',
            render: (text) => (
                <button
                    onClick={() => setDrawerIsOpen(true)}
                    style={{background: null, border: null}}
                >
                    {text}
                </button>
            )
        },
        {
            title: 'Оценки',
            dataIndex: 'marks',
            width: '15%'
        },
    ]

    return (
        <>
            <StyledTable
                bordered
                locale={{'emptyText': <StyledParagraph>На этот день нет расписания</StyledParagraph>}}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setThisHomework(record.homework.key)
                        }
                    }
                }}
                size={'small'}
                pagination={false}
                columns={tableColumns}
                dataSource={data.constructor !== Array ? data.rows.map(((row, index) => {
                    return {
                        rowNumber: index + 1,
                        subject: row.subject.subject_name,
                        homework: <HomeworkWrapper homework={row.homework.description} key={row.homework.id}/>,
                        marks: <Marks marks={row.subject.marks} />,
                    }
                })): []}
            />
            <SendHomework drawerIsOpen={drawerIsOpen} handler={setDrawerIsOpen} homeworkId={thisHomework} />
        </>
    )
}


const StyledTable = styled(Table)`
    justify-content: 'center';
    width: 1500px;
    margin-bottom: 30px;
`


const StyledParagraph = styled.p`
    color: 'black';
`