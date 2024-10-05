import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { notify } from "../../../Utils/Notify";
import { vacationServices } from "../../../Services/vacationServices";

type DeleteProps = {
  vacationId: number;
};

export default function Delete(props: DeleteProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  async function handleDelete(): Promise<void> {
    try {
      await vacationServices.deleteVacation(props.vacationId);
      notify.success("You deleted the vacation");
    } catch (error: any) {
      notify.error("Failed to delete vacation");
    }
  }

  return (
    <div>
      <Button sx={{ color: "black", marginLeft: "-12px" }} onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Delete this vacation?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
