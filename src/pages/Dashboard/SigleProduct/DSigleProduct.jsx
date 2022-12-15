import { DNavbar } from "../components/Navbar/DNavbar";
import { DSidebar } from "../components/Sidebar/DSidebar";
import styles from "./DSingleProduct.module.scss";
import dark from "../Dark.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSingleArticle } from "../../../redux/actions";

export const DSingleProduct = () => {
  const { darkMode } = useSelector((state) => state.darkmode);
  const { articulo } = useSelector((state) => state.details.detailedArticle);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleArticle(productId));
  }, [dispatch, productId]);

  return (
    <div className={`${styles.single} ${darkMode && dark.dark}`}>
      <DSidebar />
      <div className={styles.singleContainer}>
        <DNavbar />
        <div className={styles.top}>
          {articulo && (
            <div className={styles.left}>
              <div
                className={styles.editButton}
                onClick={() => navigate(`/admin/products/edit/${productId}`)}
              >
                Editar
              </div>
              <h1 className={styles.title}>Informacion</h1>
              <div className={styles.item}>
                {!articulo.images[0] ? (
                  <img
                    src="https://www.mutualblp.com.ar/img/bg-img/no_img.png"
                    alt=""
                    className={styles.itemImg}
                  />
                ) : (
                  <img
                    src={articulo.images[0]}
                    alt=""
                    className={styles.itemImg}
                  />
                )}
                <div className={styles.details}>
                  <h1 className={styles.itemTitle}>{articulo?.title}</h1>
                  <div className={styles.itemsProps}>
                    <div>
                      <div className={styles.detailItem}>
                        <span className={styles.itemKey}>Stock:</span>
                        <span className={styles.itemValue}>
                          {articulo?.stock} unidades
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.itemKey}>Precio:</span>
                        <span className={styles.itemValue}>
                          ${articulo?.price}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.itemKey}>Categoria:</span>
                        <span className={styles.itemValue}>
                          {articulo?.category.name}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className={styles.detailItem}>
                        <span className={styles.itemKey}>Creado:</span>
                        <span className={styles.itemValue}>
                          {articulo.createdAt?.substr(0, 10)}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.itemKey}>Editado:</span>
                        <span className={styles.itemValue}>
                          {articulo.updatedAt?.substr(0, 10)}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.itemKey}>Estado:</span>
                        <span className={styles.itemValue}>
                          {articulo.deletedAt ? (
                            "Inactivo"
                          ) : (
                            <span
                              style={{
                                color: "#008000",
                                backgroundColor: "#0080000d",
                                padding: 3,
                                borderRadius: 5,
                              }}
                            >
                              Activo
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
