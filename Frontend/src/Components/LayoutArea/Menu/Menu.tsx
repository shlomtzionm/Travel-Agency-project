import { useSelector } from "react-redux";
import "./Menu.css";
import { NavLink } from "react-router-dom";
import { AppState } from "../../../redux/store";
import { UserModel } from "../../../Models/userModel";
import { userService } from "../../../Services/userService";
import { notify } from "../../../Utils/Notify";
import { Role } from "../../../Models/enums";
import { createReport } from "../../DataArea/Csv/Csv";
import { VacationModel } from "../../../Models/vacationModel";

export function Menu(): JSX.Element {
  const user = useSelector<AppState, UserModel>(store => store.user);
  const vacations = useSelector<AppState, VacationModel[]>(store => store.vacations);

  function logout() {
    userService.logout();
    notify.success("Bye bye");
  }

  return (
    <div className="Menu">
      {!user && (
        <>
          <span>Hello Guest</span>
          <img src="icon.ico" className="Icon" />
        </>
      )}

      {user && (
        <>
          <span>
            Hello {user.firstName} {user.lastName}
          </span>
          <img src="icon.ico" className="Icon" />
          <div className="MenuButtons">
            {user.roleId === Role.Admin && (
              <>
                <NavLink to="/add" className="NoneDecor">
                  <em>Add</em>
                </NavLink>
                <NavLink className="NoneDecor" to="/list">
                  <em>List</em>
                </NavLink>
                <button className="TextBtn" onClick={() => createReport(vacations)}>
                  <em>Csv</em>
                </button>
                <NavLink className="NoneDecor" to="/chart">
                  <em>Chart</em>
                </NavLink>
              </>
            )}
            <NavLink className="NoneDecor" to="/login" onClick={logout}>
              <em>Logout</em>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}
