import styles from "./DNewUser.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { DSidebar } from "../components/Sidebar/DSidebar";
import { DNavbar } from "../components/Navbar/DNavbar";
import { userInputs } from "./formSource";
import dark from "../Dark.module.scss";
import { useSelector } from "react-redux";

export const DNewUser = () => {
  const [file, setFile] = useState("");
  const { darkMode } = useSelector((state) => state.darkmode);

  return (
    <div className={`${styles.new} ${darkMode && dark.dark}`}>
      <DSidebar />
      <div className={styles.newContainer}>
        <DNavbar />
        <div className={styles.top}>
          <h1>Agregar Nuevo Producto</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className={styles.right}>
            <form>
              <div className={styles.formInput}>
                <label htmlFor="file">
                  Imagen:{" "}
                  <DriveFolderUploadOutlinedIcon className={styles.icon} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {userInputs.map((input) => (
                <div className={styles.formInput} key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    style={{ color: darkMode && "white" }}
                  />
                </div>
              ))}
              <button>Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
