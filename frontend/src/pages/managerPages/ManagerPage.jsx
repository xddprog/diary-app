import {useEffect, useState} from "react";
import {Space} from "antd";
import {getClassesOptions} from "../../api/classes.jsx";
import {getSubjectsOptions} from "../../api/subjects.jsx";
import ManagerPageMenu from "../../components/Menu/ManagerPageMenu.jsx";
import {checkUser} from "../../api/auth.jsx";
import ErrorBoundary from "../../components/errorComponents/ErrorBoundary.jsx";
import { FlexRow } from "../../components/BaseComponents.jsx";
import styled from "styled-components";


export default function ManagerPage() {
    const [subjectsOptions, setSubjectsOptions] = useState({})
    const [classesOptions, setClassesOptions] = useState({})
    const [teachersComponents, setTeachersComponents] = useState([])
    const [classComponent, setClassComponent] = useState(null)
    const [errorDetail, setErrorDetail] = useState(null);
    const [errorStatus, setErrorStatus] = useState(null);

    useEffect(() => {
        checkUser(3).then().catch(err => {
            setErrorStatus(err.response.status)
            setErrorDetail(err.response.data.detail)
        })
        getSubjectsOptions().then(subjects => setSubjectsOptions(subjects))
        getClassesOptions().then(classes => setClassesOptions(classes))
    }, []);

    return (
        <>
            {errorStatus ?
                <ErrorBoundary errorStatus={errorStatus} errorDetail={errorDetail} /> :
                <MainPageContainer>
                    <ManagerPageMenu
                        setTeachersComponents={setTeachersComponents}
                        setClassComponent={setClassComponent}
                        subjectsOptions={subjectsOptions}
                        classesOptions={classesOptions}
                        setClassesOptions={setClassesOptions}
                        setSubjectOptions={setSubjectsOptions}
                        handlerTeachers={setTeachersComponents}
                    />
                    {<StyledSpace direction='vertical'> {teachersComponents} </StyledSpace>}
                    {<StyledSpace direction='vertical'> {classComponent} </StyledSpace>}
                </MainPageContainer>
            }
        </>
    )
}


const MainPageContainer = styled(FlexRow)`
    display: flex;
    flex-flow: row nowrap;
`

const StyledSpace = styled(Space)`
    justify-content: center;
    margin-left: 150px;
    width: 750px
`