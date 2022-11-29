import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../../redux/actions";
import { cleanDetails } from "../../redux/slices/detailSlice";
import styles from "./Detalles.module.scss"

export default function Detalles() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const details = useSelector((state) => state.details.detailedArticle);

  useEffect(() => {
    dispatch(getSingleArticle(id));
    return () => dispatch(cleanDetails());
  }, [id, dispatch]);

  return (
    <div>
      {details.articulo === undefined ? 
      <div>Cargando...</div> :
      <div>
      <h1 className={styles.detailsTitle}>{details.articulo.title}</h1>
      <p className={styles.detailsDescription}>{details.articulo.description}</p>
      <h2 className={styles.detailsPrice}>${details.articulo.price}</h2>
      <h3 className={styles.detailsCategory}>{details.articulo.category.name}</h3>
      <div className={styles.detailsImgContainer}>
      {details.articulo.images.map((x) => (
        <img src={x} alt="product" key={x}></img>
      ))}
      </div>
      </div>
      }
    </div>
  );
}
