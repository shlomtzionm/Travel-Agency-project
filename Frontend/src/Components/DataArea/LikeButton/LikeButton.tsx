import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import { UserModel } from "../../../Models/userModel";
import { VacationModel } from "../../../Models/vacationModel";
import { AppState } from "../../../redux/store";
import { vacationServices } from "../../../Services/vacationServices";
import "./LikeButton.css";
import { useState, useEffect } from "react";
import { notify } from "../../../Utils/Notify";

interface LikeButtonProps {
  vacation: VacationModel;
}

export function LikeButton({ vacation }: LikeButtonProps): JSX.Element {
  const user = useSelector<AppState, UserModel>(store => store.user);

  const [likeState, setLikeState] = useState<boolean>(vacation.isLiked);
  const [likesCount, setLikesCount] = useState<number>(vacation.likesCount);

  useEffect(() => {
    setLikeState(vacation.isLiked);
    setLikesCount(vacation.likesCount);
  }, [vacation]);

  async function handleClick(): Promise<void> {
    if (!vacation || !user) return;
    try {
      const updatedVacation = await vacationServices.updateIsLiked(!likeState, user.id, vacation.id);
      setLikeState(updatedVacation.isLiked);
      setLikesCount(updatedVacation.likesCount);
    } catch (error) {
      notify.error("Failed to update vacation");
    }
  }

  return (
    <div className="MyLikeButton">
      <span>{likesCount}</span>
      <IconButton onClick={handleClick}>
        <FavoriteSharpIcon sx={{ color: likeState ? "red" : "gray" }} />
      </IconButton>
    </div>
  );
}
