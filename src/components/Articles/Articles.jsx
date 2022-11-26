import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../redux/actions";
import Article from "../Article/Article";
import styles from "./Articles.module.scss";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Articles() {
  const dispatch = useDispatch();
  const articulos = useSelector((state) => state.articles);
  const [pagina, setPagina] = useState(1);
  const [specificOne, setspecificOne] = useState(1);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    if (Math.ceil(articulos.filterArticles.length / 8) < pagina) setPagina(1);
  }, [articulos, pagina]);

  function handlePagina(e) {
    if (
      e.target.value >= 1 &&
      e.target.value <= Math.ceil(articulos.filterArticles.length / 8)
    )
      setspecificOne(e.target.value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.paginationContainer}>
        <Button
          onClick={() =>
            pagina === 1
              ? setPagina(Math.ceil(articulos.filterArticles.length / 8))
              : setPagina(pagina - 1)
          }
          variant="contained"
          startIcon={<ArrowBackIosIcon />}
          style={{ marginRight: 10 }}
        >
          Anterior
        </Button>
        <div className={styles.paginationInputContainer}>
          <Button
            variant="outlined"
            onClick={() => setPagina(specificOne)}
            startIcon={<KeyboardArrowDownIcon />}
            style={{marginRight: 2}}
          >
            Ir a: pag.{" "}
          </Button>
          <input
            type="number"
            placeholder={"1-" + Math.ceil(articulos.filterArticles.length / 8)}
            onChange={(e) => handlePagina(e)}
          ></input>
        </div>
        <Button
          onClick={() =>
            pagina === Math.ceil(articulos.filterArticles.length / 8)
              ? setPagina(1)
              : setPagina(pagina + 1)
          }
          variant="contained"
          endIcon={<ArrowForwardIosIcon />}
          style={{ marginLeft: 10 }}
        >
          Siguiente
        </Button>
      </div>

      <span>Pagina {pagina}</span>

      <div className={styles.articleWrapper}>
        {articulos.filterArticles?.map((x, i) =>
          i < 8 * pagina && i > 8 * pagina - 9 ? (
            <Article data={x} key={x.id} />
          ) : null
        )}
        {articulos.loading ? (
          <div>Cargando....</div>
        ) : articulos.filterArticles?.length === 0 ? (
          "No hay coinsidencias"
        ) : null}
      </div>
    </div>
  );
}
