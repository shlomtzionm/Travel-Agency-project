import "./VacationCard.css";
import { VacationModel } from "../../../Models/vacationModel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { LikeButton } from "../LikeButton/LikeButton";
import { Role } from "../../../Models/enums";
import OptionMenu from "../OptionMenu/OptionMenu";

interface VacationCardProps {
  vacation: VacationModel;
  role: number;
}

function VacationCard(props: VacationCardProps): JSX.Element {
  const vacation = props.vacation;

  return (
    <Card id="MyCard">
      <CardMedia className="CardImage" image={vacation.imageUrl} />
      <CardContent className="CardContent">
        <Typography gutterBottom variant="h6" marginBottom={0}>
          {vacation.location}
        </Typography>
        <Typography variant="body2">start date: {new Date(vacation.startDate).toLocaleDateString()}</Typography>
        <Typography variant="body2">end date: {new Date(vacation.endDate).toLocaleDateString()}</Typography>
        <Typography variant="body2" color="text.secondary">
          {vacation.description}
        </Typography>

        <Typography variant="body2">price: ${vacation.price}</Typography>
      </CardContent>
      {props.role === Role.User && <LikeButton vacation={vacation} />}
      {props.role === Role.Admin && <OptionMenu vacation={vacation} />}
    </Card>
  );
}

export default VacationCard;
