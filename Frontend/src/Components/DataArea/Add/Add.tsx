import { useForm } from "react-hook-form";
import "./Add.css";
import { VacationModel } from "../../../Models/vacationModel";
import { notify } from "../../../Utils/Notify";
import { vacationServices } from "../../../Services/vacationServices";
import { useNavigate } from "react-router-dom";
import InputFileUpload from "../InputFileUpload/InputFileUpload";
import { useState } from "react";
import defaultImage from "../../../assets/images/coming-soon-image.jpg";
import { Button, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

function Add(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<VacationModel>();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(defaultImage);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  function handleImage(image: File): void {
    const url = URL.createObjectURL(image);
    setImage(image);
    setImageUrl(url);
  }

  async function send(vacation: VacationModel): Promise<void> {
    try {
      if (!image) {
        notify.error("Please upload an image.");
        return;
      }
      vacation.image = image;
      vacation.startDate = startDate?.format("YYYY-MM-DD") || '';
      vacation.endDate = endDate?.format("YYYY-MM-DD") || '';
      await vacationServices.addVacation(vacation);
      notify.success("You added a vacation");
      navigate("/list");
    } catch (error: any) {
      notify.error(error);
    }
  }

  return (
    <div className="Add">
      <form className="addForm" onSubmit={handleSubmit(send)}>
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
                minDate={dayjs(new Date())}
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
                minDate={dayjs(new Date())}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <InputFileUpload setImage={handleImage} />

        <img className="addImage" src={imageUrl} alt="Preview" />

        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
}

export default Add;
