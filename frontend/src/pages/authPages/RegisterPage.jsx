import RegisterUser from "../../components/authComponents/RegisterUser.jsx";


const RegisterPage = () => {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "80%", flexDirection: "column"}}>
            <div className='rounded-lg drop-shadow' style={{backgroundColor: 'white'}}>
                <div className="" style={{width: "500px", padding: "30px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <RegisterUser/>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage