import { DNavbar } from "../components/Navbar/DNavbar"
import { DSidebar } from "../components/Sidebar/DSidebar";
import styles from './DProducts.module.scss';
import dark from '../Dark.module.scss';
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from "../../../redux/actions";
import { useEffect } from "react";
import { DProductDatatable } from "../components/ProductDatatable/DProductDatatable";

export const DProducts = () => {

  const dispatch = useDispatch();
  const { darkMode } =useSelector( state => state.darkmode );

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch])
  

  return (
    <div className={`${styles.products} ${darkMode && dark.dark}`}>
      <DSidebar/>
      <div className={`${styles.productsContainer}`}>
        <DNavbar/>
        <DProductDatatable/>
      </div>
    </div>
  )
}
