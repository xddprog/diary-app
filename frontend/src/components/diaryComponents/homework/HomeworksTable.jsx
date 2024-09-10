import {Table} from "antd";


function HomeworksTable({data}){
    const tableColumns = [
        {
            title: 'Предмет',
            dataIndex: 'subject',
            width: '13%',
        },
        {
            title: 'Дата задания',
            dataIndex: 'startDate',
            width: '10%',
        },
        {
            title: 'Дата сдачи',
            dataIndex: 'endDate',
            width: '10%',
        },
        {
            title: 'Задание',
            dataIndex: 'homework',
            width: '45%',
        },
        {
            title: 'Доп. Материалы',
            dataIndex: 'files',
            width: '13%'
        },
    ]

    return (
        <div>
            <Table
                bordered
                locale={{'emptyText': <p style={{color: 'black'}}>На эту неделю нет домашнего задания</p>}}
                size={'small'}
                pagination={false}
                columns={tableColumns}
                style={{
                    width: '1500px',
                    justifyContent: 'center'
                }}
                dataSource={data.map(row => {
                    return {
                        subject: row.subject.subject_name,
                        startDate: row.start_date,
                        endDate: row.end_date.slice(0, 10).replaceAll('-', '.'),
                        homework: row.homework.description,
                        files: row.homework.additional_files !== null ? row.homework.additional_files: 'Нет доп. материалов',
                    }
                })}
            />
        </div>
    )
}

export default HomeworksTable