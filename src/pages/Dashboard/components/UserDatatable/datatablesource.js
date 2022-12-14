import { Avatar } from '@mui/material';
import styles from './DUserDatatable.module.scss'

export const userColumns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "user",
    headerName: "Usuario",
    width: 180,
    renderCell: (params) => {
      return (
        <div className={styles.cellWithImg}>
          {
            !params.row.avatar 
            ? <Avatar className={styles.cellImg}>{params.row.nickname.substr(0,2).toUpperCase()}</Avatar>
            : <Avatar className={styles.cellImg} src={params.row.avatar} />

          }
          {params.row.nickname}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
  },

  {
    field: "role",
    headerName: "Role",
    width: 180,
  },
  {
    field: "deletedAt",
    headerName: "Estado",
    width: 180,
    renderCell: (params) => {
      return (
        <div className={ 
          params.row.deletedAt ? `${styles.cellWithStatus} ${styles.inactivo}` 
          : `${styles.cellWithStatus} ${styles.activo}` 
        }>
          {
            params.row.deletedAt ? 'inactivo' : 'activo'
          }
        </div>
      );
    },
  },
];
