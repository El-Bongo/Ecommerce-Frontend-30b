import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import WidgetsIcon from '@mui/icons-material/Widgets';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import styles from './FloatNav.module.scss'

export const FloatNav = ({ loginWithRedirect, logout, isAuthenticated }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{transform: "translateZ(0px)", flexGrow: 1 }} className={styles.container}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: -670, right: 16 }}
        icon={<WidgetsIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {isAuthenticated ? (
          <SpeedDialAction
            icon={<LogoutIcon />}
            tooltipTitle={"Logout"}
            tooltipOpen
            onClick={() => {
              handleClose();
              logout();
            }}
          />
        ) : (
          <SpeedDialAction
            icon={<LoginIcon />}
            tooltipTitle={"Login"}
            tooltipOpen
            onClick={() => {
              handleClose();
              loginWithRedirect();
            }}
          />
        )}
        <SpeedDialAction
          icon={<DashboardIcon />}
          tooltipTitle={"Dashboard"}
          tooltipOpen
          onClick={handleClose}
        />
      </SpeedDial>
    </Box>
  );
};
