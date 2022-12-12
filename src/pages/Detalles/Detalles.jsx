import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../../redux/actions";
import AddReview  from "../../pages/AddReview/AddReview";
import ReviewCard  from "../../pages/ReviewCard/ReviewCard";

import { addItemToCart, cleanItem } from "../../redux/slices/cartSlice";
import { cleanDetails } from "../../redux/slices/detailSlice";
import styles from "./Detalles.module.scss";

export default function Detalles() {
  const dispatch = useDispatch();
  const carro = useSelector((state) => state.cart.cartItems);
  const { id } = useParams();
  const { articulo } = useSelector((state) => state.details.detailedArticle);

  useEffect(() => {
    dispatch(getSingleArticle(id));
    return () => dispatch(cleanDetails());
  }, [id, dispatch]);

  return (
    <div className={styles.container}>
      {articulo === undefined ? (
        <div>Cargando...</div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.imgContainer}>
            {articulo.images?.map((a) => (
              <img src={a} alt="" key={a} />
            ))}
          </div>
          <div className={styles.infoContainer}>
            <div>
              <h2 className={styles.title}>{articulo.title}</h2>
              <h3 className={styles.price}>${articulo.price}</h3>
              <h3>Stock: {articulo.stock} unidades</h3>
            </div>
            <div className={styles.filterContainer}>
              {Object.keys(articulo.properties).map((property) => (
                <div className={styles.filter} key={property}>
                  <span className={styles.filterTitle}>{property}:</span>
                  <div className={styles.filterFilterContainer}>
                    <div className={`${styles.filterSize}`}>
                      <span>{articulo.properties[property]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.addContainer}>
              <div className={styles.amoutContainer}>
                <div>
                  <span>-</span>
                </div>
                <div style={{ cursor: "none" }}>
                  <span>1</span>
                </div>
                <div>
                  <span>+</span>
                </div>
              </div>
              <div className={styles.addButtonContainer}>
                {carro.filter((x) => x.id === articulo.id).length > 0 ? (
                  <input type="button" value="Remover al Carrito" onClick={() => dispatch(cleanItem(articulo.id))}/>
                ) : articulo.stock > 0 ? (
                  <input type="button" value="Agregar al Carrito" onClick={() => dispatch(addItemToCart(articulo))}/>
                ) : (
                  "No tenemos Stock"
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div> {AddReview()}</div>
      <div> {ReviewCard()}</div>
    </div>
  );
}
