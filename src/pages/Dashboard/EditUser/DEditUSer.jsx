import styles from "./DEditUser.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { DSidebar } from "../components/Sidebar/DSidebar";
import { DNavbar } from "../components/Navbar/DNavbar";
import dark from "../Dark.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneUser } from "../../../redux/actions";
import { uploadPhotoToCloudinary } from "../../../hooks/uploadToCloudinary";
import Swal from "sweetalert2";

export const DEditUser = () => {
  const [avatar, setAvatar] = useState(null);
  const [userUpdate, setUserUpdate] = useState({});
  const { darkMode } = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { user } = useSelector((state) => state.panel);
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneUser(userId));
  }, [dispatch, userId]);

  const handleUpdateUser = async (user, avatar) => {
    const resp = await fetch(`http://localhost:3001/users/updateProfile/${userId}`, {
      method: "POST",
      body: JSON.stringify({ ...user, avatar }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    const data = await resp.json();

    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var d;

    if (avatar) {
      const response = uploadPhotoToCloudinary(avatar);
      d = await response();
    }

    Swal.fire({
      title: "Quieres aceptar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Editar",
      denyButtonText: `No Editar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Editado!", "", "success");
        handleUpdateUser(userUpdate, d && d[0]);
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se guardaron", "", "info");
      }
    });
  };

  function handleErrorNick(e){
    if(e.length < 4) return "El nombre es demasiado corto"
    else if(e.length > 30) return "El nombre es demasiado largo"
    else if(!/^[a-zA-Z0-9\s\-\_.]+$/i.test(e)) return "El nombre tiene caracteres incorrectos"
    else return null
  }

  function handleErrorRole(e){
    if(e !== "client" && e !== "admin")return 'El rol no puede ser diferente de "client" o "admin"'
    else return null
  }

  function handleErrorEmail(e){
    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(e)) return "Debes ingresar un email valido"
    else return null
  }


  return (
    <div className={`${styles.new} ${darkMode && dark.dark}`}>
      <DSidebar />
      <div className={styles.newContainer}>
        <DNavbar />
        <div className={styles.top}>
          <h1>Editar Usuario</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <img src={avatar?.target?.files[0] ? URL.createObjectURL(avatar?.target?.files[0]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className={styles.right}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formInput}>
                <label htmlFor="file">
                  Imagen: <DriveFolderUploadOutlinedIcon className={styles.icon} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={async (e) => {
                    setAvatar(e);
                  }}
                  style={{ display: "none" }}
                />
              </div>
              <div className={styles.formInput}>
                <label>Nickname</label>
                <input type="text" placeholder={user.nickname} style={{ color: darkMode && "white" }} onChange={(e) => setUserUpdate({ ...userUpdate, nickname: e.target.value })} />
                <b style={{color:"red"}}>{
                  userUpdate.hasOwnProperty("nickname") ? handleErrorNick(userUpdate.nickname) : null
                }</b> 
              </div>
              <div className={styles.formInput}>
                <label>Email</label>
                <input type="email" placeholder={user.email} style={{ color: darkMode && "white" }} onChange={(e) => setUserUpdate({ ...userUpdate, email: e.target.value })} />
                <b style={{color:"red"}}>{
                  userUpdate.hasOwnProperty("email") ? handleErrorEmail(userUpdate.email) : null
                }</b> 
              </div>
              <div className={styles.formInput}>
                <label>Rol</label>
                <input type="text" style={{ color: darkMode && "white" }} placeholder={user.role} onChange={(e) => setUserUpdate({ ...userUpdate, role: e.target.value })} />
                <b style={{color:"red"}}>{
                  userUpdate.hasOwnProperty("role") ? handleErrorRole(userUpdate.role) : null
                }</b> 
              </div>
              {!avatar?.target.files.length && (
                (userUpdate.hasOwnProperty("nickname") ? handleErrorNick(userUpdate.nickname) : null || 
                userUpdate.hasOwnProperty("email") ? handleErrorEmail(userUpdate.email) : null || 
                userUpdate.hasOwnProperty("role") ? handleErrorRole(userUpdate.role) : null
                ) === "string") ? (
                <button disabled style={{ backgroundColor: "#ac96fd", cursor: "not-allowed" }}>
                  Enviar
                </button>
              ) : (
                <button>Enviar</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
