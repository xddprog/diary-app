import StudentPageMenu from "../../components/Menu/StudentPageMenu.jsx";
import {useEffect, useState} from "react";
import {checkUser} from "../../api/auth.jsx";
import ErrorBoundary from "../../components/errorComponents/ErrorBoundary.jsx";
import {Outlet} from "react-router-dom";
import { FlexColumn } from "../../components/BaseComponents.jsx";
import styled from "styled-components";


export default function StudentPage() {
    const [errorDetail, setErrorDetail] = useState(null);
    const [errorStatus, setErrorStatus] = useState(null);

    useEffect(() => {
        checkUser(2).then(r => r).catch(err => {
            setErrorStatus(err.response.status)
            setErrorDetail(err.response.data.detail)
        });
    }, []);

    return(
        <div >
            {errorStatus ?
                <ErrorBoundary errorStatus={errorStatus} errorDetail={errorDetail} />:
                <div>
                    <div>
                        <StudentPageMenu/>
                    </div>
                    <StudentPageContainer>
                        <Outlet />
                    </StudentPageContainer>
                </div>
            }
        </div>
    )
}


const StudentPageContainer = styled(FlexColumn)`
    margin-top: 50px;
`