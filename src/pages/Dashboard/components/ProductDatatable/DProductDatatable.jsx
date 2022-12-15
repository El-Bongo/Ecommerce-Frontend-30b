import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "./datatablesource";
import { Link } from "react-router-dom";
import styles from "./DProductDatatable.module.scss";
import dark from "../../Dark.module.scss";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteArticle, restore } from "../../../../redux/slices/articlesSlice";
import { deleteProduct, restoreArticle } from "../../../../redux/actions";

export const DProductDatatable = () => {
  const { darkMode } = useSelector((state) => state.darkmode);
  const { allArticles, deletedArticles } = useSelector(
    (state) => state.articles
  );
  const dispatch = useDispatch();


  const handdleDelete = (id) => {
    Swal.fire({
      title: "Quieres aceptar los cambios?",
      showDenyButton: true,
      confirmButtonText: "Borrar",
      denyButtonText: `No Borrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteArticle(id));
        deleteProduct(id);
        Swal.fire("Producto Borrado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("El producto no fue borrado", "", "info");
      }
    });
  };

  const haddleRestore = (id) => {
    Swal.fire({
      title: "Quieres aceptar los cambios?",
      showDenyButton: true,
      confirmButtonText: "Restaurar",
      denyButtonText: `No Restaurar`,
    }).then((result) => {
      if (result.isConfirmed) {
        restoreArticle(id);
        dispatch(restore(id));
        Swal.fire("Producto Restaurado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("El producto no fue restaurado", "", "info");
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
                  to={`/admin/products/${params.row.id}`}
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
                  onClick={() => handdleDelete(params.row.id)}
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
                  onClick={() => haddleRestore(params.row.id)}
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
        Agregar Nuevo Producto
        <Link to="/admin/products/new" className={styles.link}>
          Agregar
        </Link>
      </div>
      <DataGrid
        className={`${styles.datagrid} ${darkMode && dark.datagrid}`}
        rows={
          deletedArticles
            ? deletedArticles?.concat(allArticles)
            : allArticles.concat(deletedArticles)
        }
        columns={productColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};
