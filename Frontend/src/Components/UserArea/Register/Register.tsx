import { useForm } from "react-hook-form";
import { userService } from "../../../Services/userService";
import { notify } from "../../../Utils/Notify";
import { NavLink, useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/userModel";
import { Button, TextField } from "@mui/material";

export function Register(): JSX.Element {
  const { register, handleSubmit } = useForm<UserModel>();
  const navigate = useNavigate();

  async function send(user: UserModel): Promise<void> {
    try {
      await userService.register(user);
      notify.success("Welcome!");
      navigate("/list");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div >
      <form onSubmit={handleSubmit(send)}>
        <TextField   label="First name:" variant="outlined" {...register("firstName")} />
        <TextField   label="Last name:" variant="outlined" {...register("lastName")} />
        <TextField   label="Email:" variant="outlined" {...register("email")} />
        <TextField type="password"  label="Password:" variant="outlined" {...register("password")} />


        <Button type="submit" variant="contained">Login</Button>

      </form>
      <NavLink to={"/login"}>
        <em className="link">have an account?</em>
      </NavLink>
    </div>
  );
}
