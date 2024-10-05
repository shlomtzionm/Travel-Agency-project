import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { UpdateDialog } from "../UpdateDialog/UpdateDialog";
import { VacationModel } from "../../../Models/vacationModel";
import Delete from "../Delete/Delete";

type OptionMenuProps = {
  vacation: VacationModel;
};

export default function OptionMenu(props: OptionMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 48;

  return (
    <div className="OptionMenu">
      <IconButton aria-label="more" id="long-button" aria-controls={open ? "long-menu" : undefined} aria-expanded={open ? "true" : undefined} aria-haspopup="true" onClick={handleOpenMenu}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{ "aria-labelledby": "long-button" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "9ch",
          },
        }}
      >
        <MenuItem>
          <UpdateDialog handleCloseMenu={handleCloseMenu} vacation={props.vacation} />
        </MenuItem>
        <MenuItem>
          <Delete vacationId={props.vacation.id} />
        </MenuItem>
      </Menu>
    </div>
  );
}
