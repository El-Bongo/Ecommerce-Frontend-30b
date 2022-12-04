import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DFloatNav } from "../FloatNav/DFloatNav";

export const DBottomNav = () => {
  const [value, setValue] = useState(0);
  const { innerWidth } = useSelector((state) => state.windows);
  const { darkMode } = useSelector((state) => state.darkmode);
  const navigate = useNavigate();

  return (
    <Box
      sx={{ width: "100%", position: "relative" }}
      style={{
        position: "fixed",
        bottom: 0,
        zIndex: 9999,
        display: innerWidth < 500 ? "block" : "none",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{
          backgroundColor: darkMode && "#111",
          borderTop: "1px solid #9c9c9c",
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate("/admin")}
          style={{
            color: darkMode && value !== 0 ? "#9c9c9c" : '#8884d8',
            backgroundColor: value === 0 && !darkMode && "#f1efef"
          }}
        />
        <BottomNavigationAction
          label="Usuarios"
          icon={<PersonIcon />}
          onClick={() => navigate("/admin/users")}
          style={{
            color: darkMode && value !== 1 ? "#9c9c9c" : '#8884d8',
            backgroundColor: value === 1 && !darkMode && "#f1efef"
          }}
        />
        <BottomNavigationAction
          label="Productos"
          icon={<StorefrontIcon />}
          onClick={() => navigate("/admin/users")}
          style={{
            color: darkMode && value !== 2 ? "#9c9c9c" : '#8884d8',
            backgroundColor: value === 2 && !darkMode && "#f1efef"
          }}
        />
        <BottomNavigationAction
          label="Ordenes"
          icon={<LocalShippingIcon />}
          onClick={() => navigate("/admin/users")}
          style={{
            color: darkMode && value !== 3 ? "#9c9c9c" : '#8884d8',
            backgroundColor: value === 3 && !darkMode && "#f1efef"
          }}
        />
      </BottomNavigation>
      <DFloatNav/>
    </Box>
  );
};
