import "./VacationCard.css";
import { VacationModel } from "../../../Models/vacationModel";
import { useSelector } from "react-redux";
import { UserModel } from "../../../Models/userModel";
import { AppState } from "../../../redux/store";
import { Role } from "../../../Models/enums";
import OptionMenu from "../OptionMenu/OptionMenu";

interface VacationCardProps {
  vacation: VacationModel;
  role: number;
}

function VacationCard(props: VacationCardProps): JSX.Element {
  const vacation = props.vacation;
  const user = useSelector<AppState,Partial< UserModel>>(store => store.user);


  return (
    <div>
      <div className="card">
        <img src={vacation.imageUrl}></img>
<div className="content">
  <h3>{vacation.location}</h3>
<p>{new Date(vacation.startDate).toLocaleDateString()} - {new Date(vacation.endDate).toLocaleDateString()}</p>
<p>{vacation.price} $</p>
<p>{vacation.description}</p>
</div>
      </div>
     <div className="options">
  {user.roleId === Role.Admin && (
    <OptionMenu vacation={vacation} />
  )}
</div>

    </div>
  );
}

export default VacationCard;
