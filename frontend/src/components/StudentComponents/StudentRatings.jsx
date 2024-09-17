import { Select, List, Progress, DatePicker, Form, Button } from "antd";
import { FlexColumn, FlexRow } from "../BaseComponents";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import { getSubjectsOptions } from "../../api/subjects";
import { getClassesOptions } from "../../api/classes";
import { getStudentsRating } from "../../api/students";


export default function StudentRatings() {
    const form = Form.useForm()
    const [subjectOptions, setSubjectOptions] = useState([])
    const [classesOptions, setClassesOptions] = useState([])
    const [students, setStudents] = useState([])
    const [selectedClasses, setSelectedClasses] = useState([])
    const [selectedSubjects, setSelectedSubjects] = useState([])
    const [selectedYear, setSelectedYear] = useState(null)

    useEffect(() => {
        getSubjectsOptions().then(subjects => setSubjectOptions(
            subjects.children.map(subject => {
                return {
                    value: subject.key,
                    label: subject.label,
                }
            }))
        )    
        getClassesOptions().then(classes => setClassesOptions(
            classes.children.map(cls => {
                return {
                    value: cls.key,
                    label: cls.label,
                }
            }))
        )
        getStudentsRating().then(response => setStudents(
            response.data
        ))
    }, [])

    async function handleSubmit() {
        const fields = await form[0].validateFields()
        await getStudentsRating(fields).then(response => setStudents(
            response.data
        ))
    }

    return (
        <RatingContainer>
            <Form layout="inline" form={form[0]}>
                <FormItemsFlex>
                <StyledFormItem name="classes">
                    <StyledSelect 
                        placeholder="Выберите классы" 
                        options={classesOptions} 
                        mode="multiple"
                    />
                </StyledFormItem>
                <StyledFormItem name="subjects">
                    <StyledSelect 
                        placeholder="Выберите предметы" 
                        options={subjectOptions}
                        mode="multiple"
                    />
                </StyledFormItem>
                <Form.Item name="year">
                    <StyledDatePicker picker="year" locale="ru_RU"/>
                </Form.Item>
                <Button type="primary" onClick={handleSubmit}>Составить</Button>
                </FormItemsFlex>
                
            </Form>
            <StyledList
                dataSource={students}
                bordered
                pagination={{
                    pageSize: 10,
                    align: "start",
                }}
                renderItem={(item, index) => (
                    <List.Item >
                        <List.Item.Meta
                            title={
                                <Title level={5} >
                                    {`
                                        ${index + 1} место: ${item.name} ${item.surname} 
                                        ${item.middle_name}, ${item.student_class}
                                    `}
                                </Title>
                            }
                            description={
                                <RatingDescriptionContainer>
                                    <Progress percent={item.average_mark * 20} showInfo={false}/>
                                    <StyledAverageMark>{item.average_mark.toFixed(2)}</StyledAverageMark>
                                </RatingDescriptionContainer>
                            }
                        />
                    </List.Item>
                )}
            />
        </RatingContainer>
    )
}


const RatingContainer = styled(FlexColumn)`
    width: 700px;   
    align-items: start;
`

const StyledList = styled(List)`
    margin-top: 20px;
    background-color: white;
    width: 100%;
`

const RatingDescriptionContainer = styled(FlexRow)`
    justify-content: space-between;
`

const StyledAverageMark = styled.p`
    font-size: 15px;
    color: black;
    margin-left: 15px;
`

const StyledSelect = styled(Select)`
    margin-right: 20px;
`

const StyledFormItem = styled(Form.Item)`
    width: 180px;
`

const StyledDatePicker = styled(DatePicker)`
    width: 180px;
`

const FormItemsFlex = styled(FlexRow)`
    justify-content: space-between;
`