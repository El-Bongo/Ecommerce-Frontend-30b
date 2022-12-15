import { useEffect, useState } from "react";
import OrdersAdmin from "../components/OrdersAdmin/OrdersAdmin";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DNavbar } from "../components/Navbar/DNavbar";
import { DSidebar } from "../components/Sidebar/DSidebar";
import styles from "./Ordenes.module.scss";
import dark from "../Dark.module.scss";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

export default function Orders() {
  const [ordenes, setOrdenes] = useState([]);
  const [orden, setOrden] = useState(false);
  const { darkMode } = useSelector((state) => state.darkmode);

  useEffect(() => {
    fetch("https://pf-30b-backend-production.up.railway.app/orders/getAll", { method: "GET" })
      .then((answer) => answer.json())
      .then((data) => (orden ? setOrdenes(ordenes.filter((x) => !x.despachada && x.payment_status === "approved")) : setOrdenes(data.reverse())));
  }, [orden]);

  function dispatchOrder(id) {
    ordenes.forEach((x, i) => {
      if (x.id === id) {
        let nuevaOrden = [...ordenes];
        nuevaOrden[i].despachada = true;
        setOrdenes(nuevaOrden);
      }
    });
  }

  return (
    <div>
      <div className={`${styles.users} ${darkMode && dark.dark}`}>
        <DSidebar />
        <div className={`${styles.usersContainer}`}>
          <DNavbar />
          Show Only Orders ready to Dispatch <button onClick={() => setOrden(!orden)}>{orden ? "Yes" : "No"}</button>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Payment Method</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordenes.map((c) => (
                  <OrdersAdmin key={c.id} row={{ data: c, dispatchOrder }} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
