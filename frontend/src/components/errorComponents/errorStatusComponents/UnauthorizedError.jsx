import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

function Unauthorized({detail}) {
    const navigate = useNavigate();

    function handleButton() {
        navigate("/login", { replace: false });
    }

    return(
        <Result
            status="403"
            title="403"
            subTitle={detail}
            extra={<Button type="primary" onClick={handleButton}>Войти в аккаунт</Button>}
        />
     )
}

export default Unauthorized