import { useForm } from "react-hook-form";
import { userService } from "../../../Services/userService";
import { notify } from "../../../Utils/Notify";
import { NavLink, useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/userModel";
import { Button, TextField } from "@mui/material";

export function Register(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserModel>();
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
    <div>
      <form onSubmit={handleSubmit(send)}>
        <TextField
          label="First name:"
          variant="outlined"
          {...register("firstName", { maxLength: 1000, required: "First name is required" })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          label="Last name:"
          variant="outlined"
          {...register("lastName", { maxLength: 1000, required: "Last name is required" })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <TextField label="Email:" variant="outlined" {...register("email", { maxLength: 1000, required: "Email is required" })} error={!!errors.email} helperText={errors.email?.message} />
        <TextField
          type="password"
          label="Password:"
          variant="outlined"
          {...register("password", { maxLength: 1000, minLength: 4, required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>
      <NavLink to={"/login"}>
        <em>have an account?</em>
      </NavLink>
    </div>
  );
}
