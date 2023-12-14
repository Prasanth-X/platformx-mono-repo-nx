import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const MenuList = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box className="iconsmob" onClick={handleClickListItem}>
        <MoreHorizIcon className="horizThreeDotIcon" />
        <MoreVertIcon className="vertThreeDotIcon" />
      </Box>
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          ".Platform-x-Menu-paper": {
            boxShadow: "0 3px 7px 0 rgba(0, 0, 0, 0.03)",
            borderRadius: "7px",
            marginTop: "5px",
          },
          ".Platform-x-Menu-list": {
            borderRadius: "4px",
            boxShadow: "0 0 2px 0 rgba(115, 114, 114, 0.14)",
            border: "solid 1px rgba(112, 112, 112, 0.1)",
          },
          ".Platform-x-MenuItem-root": {
            ".Platform-x-SvgIcon-root": {
              fontSize: 20,
              marginRight: "10px",
            },
            paddingLeft: "18px",
            fontSize: "16px",
            zIndex: 999,
          },
          textTransform: "capitalize",
        }}>
        <MenuItem>
          <VisibilityIcon /> View
        </MenuItem>
        <MenuItem>
          <EditIcon /> Edit
        </MenuItem>
        <MenuItem>
          <DeleteIcon /> Deactivate
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MenuList;
