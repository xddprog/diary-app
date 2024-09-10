import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

function NotFoundError({detail}) {
    const navigate = useNavigate();

    function handleButton() {
        navigate("/", { replace: false });
    }

    return(
         <Result
            status="404"
            title="404"
            subTitle={detail}
            extra={<Button type="primary" onClick={handleButton}>Вернуться назад</Button>}
        />
     )
}

export default NotFoundError;