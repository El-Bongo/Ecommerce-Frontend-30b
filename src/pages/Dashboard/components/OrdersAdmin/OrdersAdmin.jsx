import { despachar } from "../../../../redux/actions/index";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import { useState, Fragment } from "react";

export default function OrdersAdmin({ row }) {
  const { data, dispatchOrder } = row;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {data.id}
        </TableCell>
        <TableCell align="right">{data.user.email}</TableCell>
        <TableCell align="right">{data.payment_status}</TableCell>
        <TableCell align="right">{data.payment_method}</TableCell>
        <TableCell align="right">{data.createdAt.split("T")[0]}</TableCell>
        <TableCell align="right">
          {data.payment_status === "approved" && !data.despachada ? (
            <button
              onClick={() => {
                despachar(data.id);
                dispatchOrder(data.id);
              }}
            >
              Dispatch
            </button>
          ) : (
            <button
              onClick={() => {
                despachar(data.id);
                dispatchOrder(data.id);
              }}
              disabled
            >
              Dispatch
            </button>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <p>Total {data.total}</p>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Individual price ($)</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.articles.map((item) => (
                    <TableRow key={item.title}>
                      <TableCell component="th" scope="row">
                        {item.title}
                      </TableCell>
                      <TableCell>{item.categoryId}</TableCell>
                      <TableCell align="right">{item.billitems.quantity}</TableCell>
                      <TableCell align="right">{Math.round(item.price * 100) / 100}</TableCell>
                      <TableCell align="right">{Math.round(item.price * item.billitems.quantity * 100) / 100}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
