import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "./datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from './DUserDatatable.module.scss'
import dark from '../../Dark.module.scss';
import { useSelector } from 'react-redux';

export const DUserDatatable = () => {

  const { darkMode } = useSelector(state => state.darkmode);
  const [data, setData] = useState(userRows);


  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={styles.cellAction}>
            <Link to="/admin/users/test" style={{ textDecoration: "none" }}>
              <div className={`${styles.viewButton} ${darkMode && dark.viewButton}`}>Ver mas</div>
            </Link>
            <div
              className={`${styles.deleteButton} ${darkMode && dark.deleteButton}`}
              onClick={() => handleDelete(params.row.id)}
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
        Agregar Nuevo Usuario
        <Link to="/admin/users/new" className={styles.link}>
          Agregar
        </Link>
      </div>
      <DataGrid
        className={`${styles.datagrid} ${ darkMode && dark.datagrid }`}
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};
