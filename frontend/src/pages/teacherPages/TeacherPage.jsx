import { Outlet } from "react-router-dom";
import TeacherPageMenu from "../../components/menu/TeacherPageMenu";
import styled from "styled-components";

export default function TeacherPage() {
    return (
        <div >
            <div>
                <div>
                    <TeacherPageMenu />
                </div>
                <TeacherPageContainer>
                    <Outlet />
                </TeacherPageContainer>
            </div>
        </div>
    )
}

const TeacherPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`