import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google"
import { authService } from "../../../Services/authService";
import { useNavigate } from "react-router-dom";
import './GoogleLogin.css'


const CLIENT_ID = "736266445281-90bbb6epujrk5gk6jjdggmd1up75dntd.apps.googleusercontent.com";


const LoginGoogle: React.FC = () => {

    const navigate = useNavigate();
    
  const onSuccess = async (cred: CredentialResponse) => {
    try {
        if(cred.credential){
            console.log(cred);
            
            const credential = cred.credential
            const res =    await authService.login(credential);
            const {user , token} = res.data
      
            
            localStorage.setItem('auth_token', token);
            navigate("/list");
        } else{
            console.log("Credential missing from response.");
            
        }


     
   
    } catch (error: any) {
      console.log(error);
      alert("Login failed. Please try again.");
    }
  };

  const onError = () => {
    console.log("Login failed: ");
  };

  return (<div className="container">
    <GoogleOAuthProvider clientId={CLIENT_ID}>
        <div>
            <h2>Login with Google</h2>
        <GoogleLogin onSuccess={onSuccess} onError={onError}/>
        </div>

    </GoogleOAuthProvider>
    </div>
  );
};

export default LoginGoogle
