import styles from "./DList.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dark from '../../Dark.module.scss';
import { useSelector } from "react-redux";

export const DList = () => {

  const { darkMode } = useSelector(state => state.darkmode)


  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 Marzo",
      amount: 785,
      method: "Mercado Pago",
      status: "Aprovado",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 Marzo",
      amount: 900,
      method: "Mercado Pago",
      status: "Pendiente",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 Marzo",
      amount: 35,
      method: "Mercado Pago",
      status: "Pendiente",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 Marzo",
      amount: 920,
      method: "Mercado Pago",
      status: "Aprovado",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 Marzo",
      amount: 2000,
      method: "Mercado Pago",
      status: "Pendiente",
    },
  ];
  return (
    <TableContainer component={Paper} className={`${styles.table} ${darkMode && dark.table}`}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={`${styles.tableCell} ${darkMode && dark.tableCell}`}>ID</TableCell>
            <TableCell className={`${styles.tableCell} ${darkMode && dark.tableCell}`}>Producto</TableCell>
            <TableCell className={`${styles.tableCell} ${darkMode && dark.tableCell}`}>Cosumidor</TableCell>
            <TableCell className={`${styles.tableCell} ${darkMode && dark.tableCell}`}>Fecha</TableCell>
            <TableCell className={`${styles.tableCell} ${darkMode && dark.tableCell}`}>Monto</TableCell>
            <TableCell className={`${styles.tableCell} ${darkMode && dark.tableCell}`}>Metodo de Pago</TableCell>
            <TableCell className={`${styles.tableCell} ${darkMode && dark.tableCell}`}>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className={`${styles.tableCell} ${darkMode && dark.tableCell}`}>{row.id}</TableCell>
              <TableCell className={`${styles.tableCell} ${darkMode && dark.tableCell}`}>
                <div className={styles.cellWrapper}>
                  <img src={row.img} alt="" className={styles.image} />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className={`${styles.tableCell} ${darkMode && dark.tableCell}`}>{row.customer}</TableCell>
              <TableCell className={`${styles.tableCell} ${darkMode && dark.tableCell}`}>{row.date}</TableCell>
              <TableCell className={`${styles.tableCell} ${darkMode && dark.tableCell}`}>{row.amount}</TableCell>
              <TableCell className={`${styles.tableCell} ${darkMode && dark.tableCell}`}>{row.method}</TableCell>
              <TableCell className={`${styles.tableCell} ${darkMode && dark.tableCell}`}>
                <span className={`${styles.status} ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

