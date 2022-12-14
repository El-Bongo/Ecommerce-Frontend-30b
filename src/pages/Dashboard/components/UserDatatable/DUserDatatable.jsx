import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./datatablesource";
import { Link } from "react-router-dom";
import styles from "./DUserDatatable.module.scss";
import dark from "../../Dark.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { restoreUsers, startDeleteUser } from "../../../../redux/actions";
import { deleteDelete } from "../../../../redux/slices/adminPanel";
import { restore } from "../../../../redux/slices/adminPanel";

export const DUserDatatable = () => {
  const { darkMode } = useSelector((state) => state.darkmode);
  const { users, usersDeleted } = useSelector((state) => state.panel);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Quieres borrar este usuario?",
      showDenyButton: true,
      confirmButtonText: "Borrar",
      denyButtonText: `No Borrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDelete(id));
        startDeleteUser(id);
        Swal.fire("Usuario Borrado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("El usuario no fue borrado", "", "info");
      }
    });
  };

  const handleRestore = (id) => {
    Swal.fire({
      title: "Quieres restaurar este usuario?",
      showDenyButton: true,
      confirmButtonText: "Restaurar",
      denyButtonText: `No Restaurar`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(restore(id));
        restoreUsers(id);
        Swal.fire("Usuario Borrado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("El usuario no fue borrado", "", "info");
      }
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className={styles.cellAction}>
            {!params.row.deletedAt ? (
              <>
                <Link
                  to={`/admin/users/${params.row.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className={`${styles.viewButton} ${
                      darkMode && dark.viewButton
                    }`}
                  >
                    Ver mas
                  </div>
                </Link>
                <div
                  className={`${styles.deleteButton} ${
                    darkMode && dark.deleteButton
                  }`}
                  onClick={() => handleDelete(params.row.id)}
                >
                  Borrar
                </div>
              </>
            ) : (
              <>
                <div
                  className={`${styles.viewButton} ${
                    darkMode && dark.viewButton
                  }`}
                  onClick={() => handleRestore(params.row.id)}
                >
                  Restaurar
                </div>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className={`${styles.datatable} ${darkMode && dark.datatable}`}>
      <div className={styles.datatableTitle}>
        Usuarios
      </div>
      <DataGrid
        className={`${styles.datagrid} ${darkMode && dark.datagrid}`}
        rows={
          usersDeleted ? usersDeleted.concat(users) : users.concat(usersDeleted)
        }
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};
