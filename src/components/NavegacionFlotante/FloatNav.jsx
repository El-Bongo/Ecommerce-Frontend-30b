import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSelector } from "react-redux";

export const FloatNav = ({ loginWithRedirect, logout, isAuthenticated }) => {
  
  const {innerWidth} = useSelector(state => state.windows);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 330, transform: "translateZ(0px)", flexGrow: 1, display: innerWidth > 500 && 'none' }}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: -350, right: 16 }}
        icon={<SpeedDialIcon />}
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
