import styles from './DUserDatatable.module.scss'
export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Usuario",
    width: 230,
    renderCell: (params) => {
      return (
        <div className={styles.cellWithImg}>
          <img className={styles.cellImg} src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Edad",
    width: 100,
  },
  {
    field: "status",
    headerName: "Estado",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={ 
          params.row.status === 'activo' ? `${styles.cellWithStatus} ${styles.activo}` 
          : params.row.status === 'inactivo' ? `${styles.cellWithStatus} ${styles.inactivo}` 
          : `${styles.cellWithStatus} ${styles.pendiente}`
        }>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Santiago",
    img: "https://avatars.githubusercontent.com/u/56309904?s=96&v=4",
    status: "activo",
    email: "santis@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Santiago",
    img: "https://avatars.githubusercontent.com/u/56309904?s=96&v=4",
    email: "santis@gmail.com",
    status: "inactivo",
    age: 42,
  },
  {
    id: 3,
    username: "Santiago",
    img: "https://avatars.githubusercontent.com/u/56309904?s=96&v=4",
    email: "santis@gmail.com",
    status: "pendiente",
    age: 45,
  },
  {
    id: 4,
    username: "Santiago",
    img: "https://avatars.githubusercontent.com/u/56309904?s=96&v=4",
    email: "santis@gmail.com",
    status: "activo",
    age: 16,
  },
  {
    id: 5,
    username: "Santiago",
    img: "https://avatars.githubusercontent.com/u/56309904?s=96&v=4",
    email: "santis@gmail.com",
    status: "inactivo",
    age: 22,
  },
  {
    id: 6,
    username: "Santiago",
    img: "https://avatars.githubusercontent.com/u/56309904?s=96&v=4",
    email: "santis@gmail.com",
    status: "activo",
    age: 15,
  },
  {
    id: 7,
    username: "Santiago",
    img: "https://avatars.githubusercontent.com/u/56309904?s=96&v=4",
    email: "santis@gmail.com",
    status: "inactivo",
    age: 44,
  },
  {
    id: 8,
    username: "Santiago",
    img: "https://avatars.githubusercontent.com/u/56309904?s=96&v=4",
    email: "santis@gmail.com",
    status: "activo",
    age: 36,
  },
  {
    id: 9,
    username: "Santiago",
    img: "https://avatars.githubusercontent.com/u/56309904?s=96&v=4",
    email: "santis@gmail.com",
    status: "pendiente",
    age: 65,
  },
  {
    id: 10,
    username: "Santiago",
    img: "https://avatars.githubusercontent.com/u/56309904?s=96&v=4",
    email: "santis@gmail.com",
    status: "activo",
    age: 65,
  },
];
