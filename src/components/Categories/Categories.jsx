import styles from "./Categories.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAll } from "../../redux/actions";
import { Link } from "react-router-dom";
import { getDataForFiltering } from "../../redux/slices/articlesSlice";

export const Categories = () => {
  const dispatch = useDispatch();
  const { categorias } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2>Categorias</h2>
      <div className={styles.categoryWrapper}>
        {categorias.map((c) => (
          <Link to="/products" key={c.id} onClick={() => dispatch(getDataForFiltering({ categoria: [c.id] }))}>
            <div className={styles.categoryContainer}>
              <img src={c.image} alt="" />
              <div className={styles.infoContainer}>
                <h2 className={styles.title}>{c.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
