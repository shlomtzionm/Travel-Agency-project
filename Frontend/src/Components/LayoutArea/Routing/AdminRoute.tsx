import { useSelector } from "react-redux"; 
import { AppState } from "../../../redux/store"; 
import { Role } from "../../../Models/enums";
import { NotAuthorized } from "../NotAuthorizedPage/NotAuthorized";

interface Props {
  children: React.ReactNode;
}

const AdminRoute: React.FC<Props> = ({ children }) => {
  const user = useSelector((state: AppState) => state.user);

  const isAdmin = user.roleId === Role.Admin;

  if (!isAdmin) {
    return <NotAuthorized />;
  }

  return <>{children}</>;
};

export default AdminRoute;
