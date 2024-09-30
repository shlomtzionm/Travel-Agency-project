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
  const user = useSelector<AppState, UserModel>((store) => store.user);
  const vacations = useSelector<AppState, VacationModel[]>((store) => store.vacations);

  function logout() {
    userService.logout();
    notify.success("Bye bye");
  }

  return (
    <div className="Menu">
      {!user && (
        <>
          <span>Hello Guest</span>
          <img src="icon.ico" className="icon"/>
        </>
      )}

      {user && (
        <>
          <span>
            Hello {user.firstName} {user.lastName}
          </span>
          <img src="icon.ico" className="icon"/>
          <div className="btns">
            {user.roleId === Role.Admin && (
              <>
                <NavLink to="/add" className="noneDecor">
                  <em>Add</em>
                </NavLink>
                <NavLink className="noneDecor" to="/list">
                  <em>List</em>
                </NavLink>
                <button className="textBtn" onClick={()=>createReport(vacations)}>
                  <em>Csv</em>
                </button>
                <NavLink className="noneDecor" to="/chart">
                  <em>Chart</em>
                </NavLink>
              </>
            )}
            <NavLink className="noneDecor" to="/login" onClick={logout}>
              <em>Logout</em>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}
