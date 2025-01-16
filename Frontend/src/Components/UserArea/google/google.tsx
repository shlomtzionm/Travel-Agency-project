import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { appConfig } from "../../../Utils/AppConfig";
import { userService } from "../../../Services/userService";
export function Google(): JSX.Element {
  const handleSuccess = async (response: CredentialResponse) => {
    console.log("Google id token:", response.credential);
console.log(await userService.isTokenValid())
  };
  const handleFailure=()=> {
    console.log("Login failed");
  };

  return (
    <>
      <GoogleOAuthProvider clientId={appConfig.CLIENT_ID}>
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure}/>
      </GoogleOAuthProvider>
    </>
  );
}
