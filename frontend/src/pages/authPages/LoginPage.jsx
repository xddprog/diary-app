import {styled} from 'styled-components'
import { FlexColumn } from "../../components/BaseComponents.jsx";
import LoginUser from "../../components/authComponents/LoginUser.jsx";


export default function RegisterPage() {
    return (
        <Container>
            <Wrapper>
                <LoginUser/>
            </Wrapper>
        </Container>
    )
}


const Wrapper = styled.div`
    background-color: white;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.02); 
    border-radius: 0.5rem;
    width: 500px;
    padding: 30px;
`


const Container = styled(FlexColumn)`
    height: 80%;
`
