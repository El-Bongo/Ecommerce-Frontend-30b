import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../redux/actions";
import Article from "../Article/Article";
import styles from "./Articles.module.scss";
import { Pagination } from "@mui/material";

export default function Articles() {
  const dispatch = useDispatch();
  const articulos = useSelector((state) => state.articles);
  const [pagina, setPagina] = useState(1);
  // const [specificOne, setspecificOne] = useState(1);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    if (Math.ceil(articulos.filterArticles.length / 8) < pagina) setPagina(1);
  }, [articulos, pagina]);

  function handlePagina(e, value) {
    // if (
    //   e.target.value >= 1 &&
    //   e.target.value <= Math.ceil(articulos.filterArticles.length / 8)
    // )
    setPagina(value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.paginationContainer}>
        <Pagination count={Math.ceil(articulos.filterArticles.length / 8)} page={pagina} onChange={handlePagina} />
      </div>

      <div className={styles.articleWrapper}>
        {articulos.filterArticles?.map((x, i) => (i < 8 * pagina && i > 8 * pagina - 9 ? <Article data={x} key={x.id} /> : null))}
        {articulos.loading ? <div>Cargando....</div> : articulos.filterArticles?.length === 0 ? "No hay coinsidencias" : null}
      </div>
    </div>
  );
}
