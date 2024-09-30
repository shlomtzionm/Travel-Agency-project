import { useEffect, useState } from "react";
import "./List.css";
import { VacationModel } from "../../../Models/vacationModel";
import VacationCard from "../VacationCard/VacationCard";
import { vacationServices } from "../../../Services/vacationServices";
import { useSelector } from "react-redux";
import { UserModel } from "../../../Models/userModel";
import { AppState } from "../../../redux/store";
import { notify } from "../../../Utils/Notify";
import Filter from "../Filter/Filter";
import { MyPagination } from "../Pagination/Pagination";
import { Role } from "../../../Models/enums";

function List(): JSX.Element {
  const user = useSelector<AppState, UserModel>(store => store.user);
  const vacationsFromRedux = useSelector<AppState, VacationModel[]>(store => store.vacations);

  const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>(vacationsFromRedux);
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (user) {
      vacationServices
        .getAllVacations(user.id)
        .then(vacations => console.log(vacations))
        .catch((error: any) => notify.error(error));
    }
  }, []);

  return (
    <div className="List">
      {user.roleId === Role.User && <Filter setCurrentPage={setCurrentPage} setFilteredVacations={setFilteredVacations} />}
      <div className="CardsContainer">
        {vacations.length === 0 && <p>there are no vacations</p>}
        {vacations.length > 0 && vacations.map(vacation => <VacationCard vacation={vacation} key={vacation.id} role={user.roleId} />)}
      </div>
      {user.roleId === Role.User && <MyPagination vacations={filteredVacations} setVacationsToDisplay={setVacations} setCurrentPage={setCurrentPage} currentPage={currentPage} />}
      {user.roleId === Role.Admin && <MyPagination vacations={vacationsFromRedux} setVacationsToDisplay={setVacations} setCurrentPage={setCurrentPage} currentPage={currentPage} />}
    </div>
  );
}

export default List;
