import {Table} from "antd";
import {useEffect, useState} from "react";
import {getStudentAllMarks} from "../../../api/students.jsx";
import { FlexRow } from "../../BaseComponents.jsx";
import styled from "styled-components";

function QuarterMarksRow({marks, average}) {
    return (
        <StyledMarksRow>
            <StyledMarksBlock>
                {marks.map(item => <StyledMark>{item.mark_value}</StyledMark>)}
            </StyledMarksBlock>
            <div><StyledAverageMark>{average.toFixed(2)}</StyledAverageMark></div>
        </StyledMarksRow>
    )
}


export default function AllMarksTable({subjects}) {
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
        <StyledTable
            bordered
            locale={{'emptyText': (
                <StyledParagrapg >
                    Данные по оценкам для заданного года не найдены
                </StyledParagrapg>
            )}}
            size={'large'}
            pagination={false}
            columns={tableColumns}
            dataSource={subjects.map(row => {
                return {
                    subject: row.subject_name,
                    first_quarter: (
                        <QuarterMarksRow 
                            marks={row.first_quarter.marks} 
                            average={row.first_quarter.average}
                        />
                    ),
                    second_quarter: (
                        <QuarterMarksRow 
                            marks={row.second_quarter.marks} 
                            average={row.second_quarter.average}
                        />
                    ),
                    third_quarter: (
                        <QuarterMarksRow 
                            marks={row.third_quarter.marks} 
                            average={row.third_quarter.average}
                        />
                    ),
                    fourth_quarter: (
                        <QuarterMarksRow 
                            marks={row.fourth_quarter.marks} 
                            average={row.fourth_quarter.average}
                        />
                    ),
                    average_year: row.average.toFixed(2),
                }
            })}
        />
    )
}


const StyledTable = styled(Table)`
    width: 1500px;
    justify-content: center;
`

const StyledParagrapg = styled.p`
    color: black;
`

const StyledMarksRow = styled(FlexRow)`
    justify-content: space-between;
`


const StyledMarksBlock = styled.div`
    display: flex;
`

const StyledMark = styled.p`
    margin-right: 10px;
`

const StyledAverageMark = styled.p`
    font-size: 15px;
    font-weight: 500;
    color: #1677ff
`