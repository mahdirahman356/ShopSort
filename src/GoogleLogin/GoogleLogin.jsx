import { useContext } from "react";
import { AuthContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {

    let { googleLogIn } = useContext(AuthContext)
    let navigate = useNavigate();
   
    let handleGoogleLogIn = () => {
        googleLogIn()
            .then((result) => {
                console.log(result.user)
             
                navigate("/");

            })
            .catch((error) => {
                console.log(error)
            });
    }


    return (
        <div>
            <div className="flex flex-col lg:flex-row  justify-start gap-7 items-center my-11">
                <p onClick={handleGoogleLogIn} className="p-3 border btn px-6  btn-outline rounded-3xl border-gray-400"><FcGoogle className="text-[25px]" />continue with Google</p>
            </div>
        </div>
    );
};

export default GoogleLogin;