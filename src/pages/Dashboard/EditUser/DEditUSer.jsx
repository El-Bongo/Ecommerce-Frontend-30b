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
  const [userUpdate, setUserUpdate] = useState();
  const { darkMode } = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { user } = useSelector((state) => state.panel);
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneUser(userId));
  }, [dispatch, userId]);

  const handleUpdateUser = async (user, avatar) => {
    const resp = await fetch(
      `https://pf-30b-backend-production.up.railway.app/users/updateProfile/${userId}`,
      {
        method: "POST",
        body: JSON.stringify({ ...user, avatar }),
        headers: new Headers({ "content-type": "application/json" }),
      }
    );
    const data = await resp.json();

    console.log(data);
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
            <img
              src={
                avatar?.target?.files[0]
                  ? URL.createObjectURL(avatar?.target?.files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className={styles.right}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formInput}>
                <label htmlFor="file">
                  Imagen:{" "}
                  <DriveFolderUploadOutlinedIcon className={styles.icon} />
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
                <input
                  type="text"
                  placeholder={user.nickname}
                  style={{ color: darkMode && "white" }}
                  onChange={(e) =>
                    setUserUpdate({ ...userUpdate, nickname: e.target.value })
                  }
                />
              </div>
              <div className={styles.formInput}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder={user.email}
                  style={{ color: darkMode && "white" }}
                  onChange={(e) =>
                    setUserUpdate({ ...userUpdate, email: e.target.value })
                  }
                />
              </div>
              <div className={styles.formInput}>
                <label>Rol</label>
                <input
                  type="text"
                  style={{ color: darkMode && "white" }}
                  placeholder={user.role}
                  onChange={(e) =>
                    setUserUpdate({ ...userUpdate, role: e.target.value })
                  }
                />
              </div>
              {!avatar?.target.files.length &&
              ((userUpdate?.role === "" || !userUpdate?.role) &&
                (userUpdate?.nickname === "" || !userUpdate?.nickname) &&
                (userUpdate?.email === "" || !userUpdate?.email)) ? (
                <button disabled style={{ backgroundColor: "#ac96fd" }}>
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
