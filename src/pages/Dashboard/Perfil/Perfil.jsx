import React from "react";
import { DNavbar } from "../components/Navbar/DNavbar";
import { DSidebar } from "../components/Sidebar/DSidebar";
import styles from "./Perfil.module.scss";
import dark from "../Dark.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Perfil = () => {
  const { darkMode } = useSelector((state) => state.darkmode);
  const { data } = useSelector((state) => state.user);
  const navigate = useNavigate()

  return (
    <div className={`${styles.profile} ${darkMode && dark.dark}`}>
      <DSidebar />
      <div className={`${styles.profileContainer}`}>
        <DNavbar />
        <div className={styles.profileCardContainer}>
          <div className={styles.profileCard}>
            <div className={styles.profileCardHeader}>
              <div className={styles.editContainer} onClick={() => navigate(`/admin/users/edit/${data.id}`)}>
                <span>Editar</span>
              </div>
              <div className={styles.profileCardImgContainer}>
                {
                  data.avatar ? 
                  <img
                    src={data.avatar}
                    alt=""
                  />
                  :
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt=""
                  />
                  
                }
              </div>
              <div className={styles.profileCardTitleContainer}>
                <h1>{data.nickname}</h1>
              </div>
            </div>
            <div className={styles.profileCardBody}>
              <div className={styles.profileCardInfoContainer}>
                <h2>Email: </h2>
                <span>{data.email}</span>
              </div>
              <div className={styles.profileCardInfoContainer}>
                <h2>Rol: </h2>
                <span>{data.role}</span>
              </div>
              <div className={styles.profileCardInfoContainer}>
                <h2>Creado: </h2>
                <span>{data.created_date.substr(0, 10)}</span>
              </div>
              <div className={styles.profileCardInfoContainer}>
                <h2>Modificado: </h2>
                <span>{data.updated_at.substr(0, 10)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
