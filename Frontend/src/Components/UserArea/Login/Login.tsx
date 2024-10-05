import { useForm } from "react-hook-form";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { userService } from "../../../Services/userService";
import { notify } from "../../../Utils/Notify";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "./Login.css";

export function Login(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();
  const navigate = useNavigate();

  async function send(credentials: CredentialsModel): Promise<void> {
    try {
      await userService.login(credentials);
      notify.success("Welcome back!");
      navigate("/list");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div>
      <form className="LoginForm" onSubmit={handleSubmit(send)}>
        <TextField id="outlined-basic" label="Email:" variant="outlined"    {...register("email", { maxLength: 50, required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField type="password" id="outlined-basic" label="Password:" variant="outlined"    {...register("password", { maxLength: 100, required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
       />

        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
      <NavLink to={"/register"}>
        <em className="link">dont have an account?</em>
      </NavLink>
    </div>
  );
}
