import {Table} from "antd";
import {useEffect, useState} from "react";
import {getStudentAllMarks} from "../../../api/students.jsx";

function QuarterMarksRow({marks, average}) {
    return (
        <div style={{display: "flex", flexDirection: 'row', justifyContent: "space-between", alignItems: "center"}}>
            <div
                style={{display: 'flex', marginRight: '15px'}}
            >
                {marks.map(item => <p style={{marginRight: '10px'}}>{item.mark_value}</p>)}
            </div>
            <div><p style={{fontSize: '15px', fontWeight: '500', color: '#1677ff'}}>{average.toFixed(2)}</p></div>
        </div>
    )
}


function AllMarksTable({subjects}) {
    const tableColumns = [
        {
            title: 'Предмет',
            dataIndex: 'subject',
            width: '14%',
        },
        {
            title: 'Первая четверть',
            dataIndex: 'first_quarter',
            width: '20%'
        },
        {
            title: 'Вторая четверть',
            dataIndex: 'second_quarter',
            width: '20%'
        },
        {
            title: 'Третья четверть',
            dataIndex: 'third_quarter',
            width: '20%'
        },
        {
            title: 'Четвертая четверть',
            dataIndex: 'fourth_quarter',
            width: '20%'
        },
        {
            title: 'Ср. балл',
            dataIndex: 'average_year',
            width: '6%',
        }
    ]

    return (
        <Table
            bordered
            locale={{'emptyText': <p style={{color: 'black'}}>Данные по оценкам для заданного года не найдены</p>}}
            size={'large'}
            pagination={false}
            columns={tableColumns}
            style={{
                width: '1500px',
                justifyContent: 'center'
            }}
            dataSource={subjects.map(row => {
                return {
                    subject: row.subject_name,
                    first_quarter: <QuarterMarksRow marks={row.first_quarter.marks} average={row.first_quarter.average}/>,
                    second_quarter: <QuarterMarksRow marks={row.second_quarter.marks} average={row.second_quarter.average}/>,
                    third_quarter: <QuarterMarksRow marks={row.third_quarter.marks} average={row.third_quarter.average}/>,
                    fourth_quarter: <QuarterMarksRow marks={row.fourth_quarter.marks} average={row.fourth_quarter.average}/>,
                    average_year: row.average.toFixed(2),
                }
            })}
        />
    )
}

export default AllMarksTable