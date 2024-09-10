import {Table} from "antd";
import {useState} from "react";
import SendHomework from "../homework/SendHomework.jsx";
import Marks from "../mark/ScheduleMark.jsx";
import HomeworkWrapper from "../homework/HomeworkWrapper.jsx";


function ScheduleTable({data}) {
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
            <Table
                bordered
                locale={{'emptyText': <p style={{color: 'black'}}>На этот день нет расписания</p>}}
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
                style={{justifyContent: 'center', width: '1500px', marginBottom: '30px'}}
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

export default ScheduleTable