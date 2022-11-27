import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

export const BottomNav = () => {
  const [value, setValue] = useState(0);
  const { innerWidth } = useSelector((state) => state.windows);
  const navigate = useNavigate();

  return (
    <Box
      sx={{ width: "100%" }}
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
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={ () => navigate('/')}/>
        <BottomNavigationAction label="Productos" icon={<StorefrontIcon />} onClick={ () => navigate('/products')}/>
        <BottomNavigationAction label="Agregar Producto" icon={<AddIcon />} onClick={ () => navigate('/addItem')}/>
      </BottomNavigation>
    </Box>
  );
};
