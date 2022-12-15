import { Avatar } from "@mui/material";
import styles from "./DProductDatatable.module.scss";

export const productColumns = [
  { field: "id", headerName: "ID", width: 90},
  {
    field: "product",
    headerName: "Producto",
    width: 180,
    renderCell: (params) => {
      return (
        <div className={styles.cellWithImg}>
          <Avatar className={styles.cellImg} src={params.row?.images[0]} />
          {params.row?.title}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Precio",
    width: 180,
    renderCell: (params) => {
      return <span style={{marginLeft: 10}}>${params.row.price}</span>;
    },
  },

  {
    field: "stock",
    headerName: "Stock",
    width: 180,
    renderCell: (params) => {
      return <span>{params.row.stock} unidades</span>;
    },
  },
  {
    field: "deletedAt",
    headerName: "Estado",
    width: 180,
    renderCell: (params) => {
      return (
        <div
          className={
            params.row.deletedAt
              ? `${styles.cellWithStatus} ${styles.inactivo}`
              : `${styles.cellWithStatus} ${styles.activo}`
          }
        >
          {params.row.deletedAt ? "inactivo" : "activo"}
        </div>
      );
    },
  },
];
