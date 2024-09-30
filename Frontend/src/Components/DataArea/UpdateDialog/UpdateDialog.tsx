import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment, useState } from "react";
import { VacationModel } from "../../../Models/vacationModel";
import InputFileUpload from "../InputFileUpload/InputFileUpload";
import { notify } from "../../../Utils/Notify";
import { vacationServices } from "../../../Services/vacationServices";
import { useSelector } from "react-redux";
import { UserModel } from "../../../Models/userModel";
import { AppState } from "../../../redux/store";
import "./UpdateDialog.css";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type UpdateDialogProps = {
  vacation: VacationModel;
  handleCloseMenu: () => void;
};

export function UpdateDialog(props: UpdateDialogProps): JSX.Element {
  const user = useSelector<AppState, UserModel>(store => store.user);
  const vacation = useSelector<AppState, VacationModel>(store => store.vacations.find(v => v.id === props.vacation.id));

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(vacation?.imageUrl || "/path/to/default-image.jpg");

  const [startDate, setStartDate] = useState<Dayjs>(dayjs(vacation.startDate));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(vacation.endDate));

  const { register, handleSubmit,formState: { errors } } = useForm<VacationModel>({
    defaultValues: vacation,
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.handleCloseMenu();
  };

  const onSubmit = async (vacation: VacationModel): Promise<void> => {
    try {
      delete vacation.image;
      const updatedVacation = {
        ...vacation,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
        image: image || null,
      };

      await vacationServices.updateVacation(user.id, vacation.id, updatedVacation);
      props.handleCloseMenu();
      notify.success("Vacation updated successfully!");
    } catch (error: any) {
      notify.error("Failed to update vacation");
    }
  };

  function handleImage(image: File): void {
    const url = URL.createObjectURL(image);
    setImage(image);
    setImageUrl(url);
  }

  return (
    <div>
      <Fragment>
        <Button sx={{ color: "black", marginLeft: "-12px" }} className="menuItemC" onClick={handleClickOpen}>
          Update
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update</DialogTitle>
          <DialogContent className="UpdateDialogMy">
            <form className="UpdateForm" onSubmit={handleSubmit(onSubmit)}>
            <TextField 
          type="text" 
          label="Location:" 
          variant="outlined" 
          {...register("location", { maxLength: 1000, required: "Location is required" })} 
          error={!!errors.location}
          helperText={errors.location?.message}
        />

        <TextField 
          type="text" 
          label="Description:" 
          variant="outlined" 
          {...register("description", { maxLength: 1000, required: "Description is required" })} 
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField 
          type="number" 
          label="Price:" 
          variant="outlined" 
          {...register("price", { min: { value: 0, message: "Price must be at least 0" }, required: "Price is required", max: { value: 10000, message: "Price cannot exceed 10,000" } })} 
          error={!!errors.price}
          helperText={errors.price?.message}
          
        />

              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Start date:"
                      value={startDate}
                      onChange={newValue => setStartDate(newValue)}
                      slotProps={{
                        textField: {
                          required: true,
                          error: !!errors.startDate,
                          helperText: errors.startDate?.message,
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="End date:"
                      value={endDate}
                      onChange={newValue => setEndDate(newValue)}
                      slotProps={{
                        textField: {
                          required: true,
                          error: !!errors.endDate,
                          helperText: errors.endDate?.message,
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <img src={imageUrl} style={{ width: "200px", height: "180px" }} alt="Vacation" />
              <InputFileUpload  setImage={handleImage} />
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Update</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    </div>
  );
}
