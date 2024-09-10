import StudentPageMenu from "../../components/Menu/StudentPageMenu.jsx";
import React, {useEffect} from "react";
import {checkUser} from "../../api/auth.jsx";
import ErrorBoundary from "../../components/errorComponents/ErrorBoundary.jsx";
import {Outlet} from "react-router-dom";


function StudentPage() {
    const [errorDetail, setErrorDetail] = React.useState(null);
    const [errorStatus, setErrorStatus] = React.useState(null);

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
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '50px',
                    }}>
                        <Outlet />
                    </div>
                </div>
            }
        </div>
    )
}

export default StudentPage;