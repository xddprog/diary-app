import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { FlexColumn } from "../../components/BaseComponents.jsx";
import StudentPageMenu from "../../components/menu/StudentPageMenu.jsx";


export default function StudentPage() {
    return (
        <div >
            <div>
                <div>
                    <StudentPageMenu />
                </div>
                <StudentPageContainer>
                    <Outlet />
                </StudentPageContainer>
            </div>
        </div>
    )
}


const StudentPageContainer = styled(FlexColumn)`
    margin-top: 50px;
`