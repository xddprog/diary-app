import LoginUser from "../../components/authComponents/LoginUser.jsx";


const LoginPage = () => {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "80%", flexDirection: "column"}}>
            <div className='rounded-lg drop-shadow' style={{backgroundColor: 'white'}}>
                <div className="" style={{width: "500px", padding: "30px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <LoginUser/>
                </div>
            </div>
        </div>
    )
}

export default LoginPage