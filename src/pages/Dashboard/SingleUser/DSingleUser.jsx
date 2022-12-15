import { DChart } from "../components/Chart/DChart";
import { DNavbar } from "../components/Navbar/DNavbar";
import { DSidebar } from "../components/Sidebar/DSidebar";
import styles from "./DSingleIser.module.scss";
import dark from "../Dark.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneUser } from "../../../redux/actions";

export const DSingleUser = () => {
  const { darkMode } = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { user } = useSelector((state) => state.panel);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneUser(userId));
  }, [dispatch, userId]);

  return (
    <div className={`${styles.single} ${darkMode && dark.dark}`}>
      <DSidebar />
      <div className={styles.singleContainer}>
        <DNavbar />
        <div className={styles.top}>
          {user && (
            <div className={styles.left}>
              <div className={styles.editButton} onClick={() => navigate(`/admin/users/edit/${userId}`)}>Editar</div>
              <h1 className={styles.title}>Informacion</h1>
              <div className={styles.item}>
                {!user.avatar ? (
                  <img
                    src="https://www.mutualblp.com.ar/img/bg-img/no_img.png"
                    alt=""
                    className={styles.itemImg}
                  />
                ) : (
                  <img src={user.avatar} alt="" className={styles.itemImg} />
                )}
                <div className={styles.details}>
                  <h1 className={styles.itemTitle}>{user.nickname}</h1>
                  <div className={styles.detailItem}>
                    <span className={styles.itemKey}>Email:</span>
                    <span className={styles.itemValue}>{user.email}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.itemKey}>Role:</span>
                    <span className={styles.itemValue}>{user.role}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.itemKey}>Estado:</span>
                    <span className={styles.itemValue}>
                      {!user.deletedAt ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.itemKey}>Creado:</span>
                    <span className={styles.itemValue}>
                      {user.created_date?.substr(0, 10)}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.itemKey}>Editado:</span>
                    <span className={styles.itemValue}>
                      {user.updated_at?.substr(0, 10)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className={styles.right}>
            <DChart aspect={3 / 1} title="Ultimos Meses (Gastos)" />
          </div>
        </div>
      </div>
    </div>
  );
};
