import {Table} from "antd";
import styled from "styled-components";


export default function HomeworksTable({data}){
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
            <StyledTable
                bordered
                locale={{'emptyText': <StyledParagraph>На эту неделю нет домашнего задания</StyledParagraph>}}
                size={'small'}
                pagination={false}
                columns={tableColumns}
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


const StyledTable = styled(Table)`
    width: 1500px;
    justify-content: center;
`

const StyledParagraph = styled.p`
    color: 'black';
`