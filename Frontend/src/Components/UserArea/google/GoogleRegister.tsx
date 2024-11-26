import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google"
import { authService } from "../../../Services/authService";
import { useNavigate } from "react-router-dom";
import './GoogleLogin.css'
import { appConfig } from "../../../Utils/AppConfig";





const RegisterGoogle: React.FC = () => {

    const navigate = useNavigate();
   
 const handleLoginSuccess = async (response: CredentialResponse) => {

try {
 await authService.register(response.credential)
 navigate("/list")
    
} catch (error:any) {
    console.log(error);
    alert("Sign up failed. Please try again.");
}
 }

 const onError = () => {
    console.log("Login failed: ");
  };
  return ( 
    <GoogleOAuthProvider clientId={appConfig.CLIENT_ID}> {/* Wrap with GoogleOAuthProvider and pass the client ID */}
    <div>
      <h2>Sign Up with Google</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}  // onSuccess handler
        onError={onError}  // onError handler
        useOneTap={true}    // Optional: Display Google One Tap login if desired
      />
    </div>
  </GoogleOAuthProvider>
  );
};

export default RegisterGoogle
