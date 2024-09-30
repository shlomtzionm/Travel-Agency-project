import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { notify } from "../../../Utils/Notify";
import { userService } from "../../../Services/userService";

interface Props {
  children: React.ReactNode;
}

export const LoginAuthorization: React.FC<Props> = ({ children }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    async function isTokenValid() {
      try {
        if (localStorage.length !== 0) {
          const valid = await userService.isTokenValid();
          setIsValid(valid);
        } else {
          setIsValid(false);
        }
      } catch (error: any) {
        userService.logout();
        setIsValid(false);
      }
    }
    isTokenValid();
  }, []);

  if (isValid === false) {
    notify.error("You are not logged in");
    userService.logout();
    return <Navigate to="/login" />;
  }

  if (isValid === true) {
    return <>{children}</>;
  }
};
