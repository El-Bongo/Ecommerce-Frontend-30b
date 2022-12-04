import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import WidgetsIcon from "@mui/icons-material/Widgets";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import styles from "./DFloatNav.module.scss";
import { useNavigate } from "react-router-dom";

export const DFloatNav = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <Box
      sx={{ transform: "translateZ(0px)", flexGrow: 1 }}
      className={styles.container}
      style={{ position: "absolute", bottom: 100, right: 16 }}
    >
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        icon={<WidgetsIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        FabProps={{
          sx: {
            bgcolor: "#8884d8",
            "&:hover": {
              bgcolor: "#8884d8",
            },
          },
        }}
      >
        <SpeedDialAction
          icon={<LoginIcon />}
          tooltipTitle={"Tienda"}
          tooltipOpen
          onClick={() => {
            handleClose();
            navigate("/");
          }}
        />
        <SpeedDialAction
          icon={<PersonIcon />}
          tooltipTitle={"Perfil"}
          tooltipOpen
          onClick={() => {
            handleClose();
            navigate("/admin/profile");
          }}
        />
      </SpeedDial>
    </Box>
  );
};
