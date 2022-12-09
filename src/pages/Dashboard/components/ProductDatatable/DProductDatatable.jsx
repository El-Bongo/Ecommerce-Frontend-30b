import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "./datatablesource";
import { Link } from "react-router-dom";
import styles from './DProductDatatable.module.scss'
import dark from '../../Dark.module.scss';
import { useSelector } from 'react-redux';

export const DProductDatatable = () => {

  const { darkMode } = useSelector(state => state.darkmode);
  const {allArticles} = useSelector(state => state.articles)

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className={styles.cellAction}>
            <Link to={`/admin/users/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className={`${styles.viewButton} ${darkMode && dark.viewButton}`}>Ver mas</div>
            </Link>
            <div
              className={`${styles.deleteButton} ${darkMode && dark.deleteButton}`}
              // onClick={() =>)}
            >
              Borrar
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className={`${styles.datatable} ${ darkMode && dark.datatable }`}>
      <div className={styles.datatableTitle}>
        Agregar Nuevo Producto
        <Link to="/admin/users/new" className={styles.link}>
          Agregar
        </Link>
      </div>
      <DataGrid
        className={`${styles.datagrid} ${ darkMode && dark.datagrid }`}
        rows={allArticles}
        columns={productColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};
