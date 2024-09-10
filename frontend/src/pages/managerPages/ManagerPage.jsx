import React, {useEffect, useState} from "react";
import {Space} from "antd";
import {getClassesOptions, getClassInfo} from "../../api/classes.jsx";
import {getSubjectsOptions} from "../../api/subjects.jsx";
import {getTeachersCard} from "../../api/teachers.jsx";
import ManagerPageMenu from "../../components/Menu/ManagerPageMenu.jsx";
import AddNewTeacher from "../../components/TeacherComponents/AddTeacher.jsx";
import Class from "../../components/ClassComponents/Class.jsx";
import {checkUser} from "../../api/auth.jsx";
import ErrorBoundary from "../../components/errorComponents/ErrorBoundary.jsx";


function ManagerPage() {
    const [subjectsOptions, setSubjectsOptions] = useState({})
    const [classesOptions, setClassesOptions] = useState({})
    const [teachersComponents, setTeachersComponents] = useState([])
    const [classComponent, setClassComponent] = useState(null)
    const [errorDetail, setErrorDetail] = React.useState(null);
    const [errorStatus, setErrorStatus] = React.useState(null);

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
                <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
                    <ManagerPageMenu
                        setTeachersComponents={setTeachersComponents}
                        setClassComponent={setClassComponent}
                        subjectsOptions={subjectsOptions}
                        classesOptions={classesOptions}
                        addSubjectItem={{key: 'addSubject', label:'Добавить предмет'}}
                        addClassItem={{key: 'addClass', label:'Добавить класс'}}
                        setClassesOptions={setClassesOptions}
                        setSubjectOptions={setSubjectsOptions}
                    />
                    {<Space direction='vertical' style={{justifyContent: 'center', marginLeft: "150px", width:"750px"}}>
                        {teachersComponents}
                    </Space>}
                    {<Space direction='vertical' style={{justifyContent: 'center', marginLeft: "150px", width:"750px"}}>
                        {classComponent}
                    </Space>}
                </div>
            }
        </>
    )
}

export default ManagerPage;