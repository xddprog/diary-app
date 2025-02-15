import { Table, Typography } from "antd";
import styled from "styled-components";

export default function AllTeacherClasses() {
    const columns = [
        {
            title: 'Класс',
            dataIndex: 'class',
            render: (text, record, index) => {
                const rowSpan = calculateRowSpan(index);
                return rowSpan > 0 ? <Typography.Text>{text}</Typography.Text> : '';
            },
            onCell: (record, index) => ({
                rowSpan: calculateRowSpan(index),
            }),
        },
        {
            title: 'Предмет',
            dataIndex: 'subject',
            render: (text) => (
                <Typography.Text>{text}</Typography.Text>
            ),
        }, 
        {
            title: 'Следующий урок',
            dataIndex: 'nextLesson',
            render: (nextLesson) => (
                <Typography.Text>{new Date(nextLesson).toLocaleString()}</Typography.Text>
            ),
        }
    ];

    const classes = [
        {
            class: '11 "А"',
            subjects: [
                { name: 'Subject 1', id: 1, nextLesson: '2022-08-01T00:00:00.000Z' },
                { name: 'Subject 2', id: 2, nextLesson: '2022-08-02T00:00:00.000Z' }
            ]
        },
        {
            class: '11 "В"',
            subjects: [
                { name: 'Subject 3', id: 3, nextLesson: '2022-08-03T00:00:00.000Z' }
            ]
        }
    ];

    const dataSource = classes.flatMap((classItem) =>
        classItem.subjects.map((subject) => ({
            key: `${classItem.class}-${subject.id}`,
            class: classItem.class,
            subject: subject.name,
            nextLesson: subject.nextLesson,
        }))
    );

    function calculateRowSpan(index) {
        const currentClass = dataSource[index]?.class;
        let span = 0;
        
        if (index === 0 || dataSource[index - 1].class !== currentClass) {
            span = dataSource.filter(item => item.class === currentClass).length;
        }

        return span;
    }

    return (
        <StyledTable 
            dataSource={dataSource}
            columns={columns} 
            pagination={false}
            bordered
        />
    );
}

const StyledTable = styled(Table)`
    margin-top: 50px;
    width: 700px;
    justify-content: center;
`;
