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
  const user = useSelector<AppState,Partial< UserModel>>(store => store.user);

  const [favoritestate, setFavoritestate] = useState<boolean>(vacation.isFavorite);
  const [favoritesCount, setFavoritesCount] = useState<number>(vacation.favoritesCount);

  useEffect(() => {
    setFavoritestate(vacation.isFavorite);
    setFavoritesCount(vacation.favoritesCount);
  }, [vacation]);

  async function handleClick(): Promise<void> {
    if (!vacation || !user) return;
    try {
      const updatedVacation = await vacationServices.updateIsFavorite(!favoritestate, user.id, vacation.id);
      setFavoritestate(updatedVacation.isFavorite);
      setFavoritesCount(updatedVacation.favoritesCount);
    } catch (error) {
      notify.error("Failed to update vacation");
    }
  }

  return (
    <div className="MyLikeButton">
      <span>{favoritesCount}</span>
      <IconButton onClick={handleClick}>
        <FavoriteSharpIcon sx={{ color: favoritestate ? "red" : "gray" }} />
      </IconButton>
    </div>
  );
}
