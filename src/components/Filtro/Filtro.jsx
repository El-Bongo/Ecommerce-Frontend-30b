import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataForFiltering } from "../../redux/slices/articlesSlice";
import { MultiSelect } from "react-multi-select-component";
import { Button } from "@mui/material";
import styles from "./Filtro.module.scss";

export default function Filtro({ categoria }) {
  const dispatch = useDispatch();
  const initalState = {
    title: "",
    order: null,
    priceRange: { min: "", max: "" },
    categoria: categoria ? [categoria] : [],
  };

  const [filter, setFilter] = useState(initalState);
  const categorias = useSelector((state) => state.articles.categorias);

  useEffect(() => {
    dispatch(getDataForFiltering(filter));
  }, [filter, dispatch]);

  function handlePrice(e) {
    switch (e.target.id) {
      case "filter_price_order":
        setFilter({
          ...filter,
          order: filter.order === null ? "+Precio-" : filter.order === "-Precio+" ? null : "-Precio+",
        });
        break;
      case "filter_price_min":
        setFilter({
          ...filter,
          priceRange: {
            ...filter.priceRange,
            min: e.target.value.length > 0 ? e.target.value : "",
          },
        });
        break;
      case "filter_price_max":
        setFilter({
          ...filter,
          priceRange: {
            ...filter.priceRange,
            max: e.target.value.length > 0 ? e.target.value : "",
          },
        });
        break;
      default:
        break;
    }
  }

  function handleCategoria(e) {
    setFilter({ ...filter, categoria: e });
  }

  function handleTitle(e) {
    setFilter({
      ...filter,
      title: e.target.value.length > 0 ? e.target.value : "",
    });
  }

  function handleReset() {
    setFilter(initalState);
  }

  return (
    <div className={styles.container}>
      <div
        style={{
          width: "90%",
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ color: "#b1b1b1", margin: "30px 20px 20px 0px" }}>Filtro de Categorias</span>
        <MultiSelect
          options={categorias.map((x) => {
            return { label: x.name, value: x.id };
          })}
          value={filter.categoria}
          onChange={handleCategoria}
          labelledBy="Select"
          className={styles.multiSelected}
        />
      </div>

      <div
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ color: "#b1b1b1", margin: "30px 20px 20px 0px" }}>Filtro de Precios</span>
        <input
          type="number"
          min={0}
          step={10}
          placeholder="Precio Minimo"
          id="filter_price_min"
          onChange={handlePrice}
          value={filter.priceRange.min}
          style={{
            height: 35,
            borderRadius: 5,
            width: "100%",
            paddingLeft: 5,
            fontSize: 16,
            borderColor: "#ccc",
            borderWidth: 1,
          }}
        />
        <input
          type="number"
          min={Number(filter.priceRange.min) + 10}
          step={10}
          id="filter_price_max"
          onChange={handlePrice}
          value={filter.priceRange.max}
          placeholder="Precio Maximo"
          style={{
            height: 35,
            borderRadius: 5,
            width: "100%",
            paddingLeft: 5,
            fontSize: 16,
            borderColor: "#ccc",
            borderWidth: 1,
            marginTop: 5,
            marginBottom: 5,
          }}
        />
        <Button variant="outlined" id="filter_price_order" onClick={handlePrice} style={{ fontFamily: "inherit" }}>
          {filter.order === null ? "Ordenar por Precio" : filter.order === "+Precio-" ? "Ordenar de Mayor a Menor precio" : "Ordenar de Menor a Mayor Precio"}
        </Button>
      </div>
      <dir
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ color: "#b1b1b1", margin: "30px 20px 20px 0px" }}>Buscar por Nombre</span>
        <input
          type="text"
          onChange={handleTitle}
          value={filter.title}
          placeholder="Buscar..."
          style={{
            height: 35,
            borderRadius: 5,
            width: "100%",
            paddingLeft: 5,
            fontSize: 16,
            borderColor: "#ccc",
            borderWidth: 1,
            marginBottom: 5,
          }}
        />
      </dir>
      <Button onClick={handleReset} variant="outlined" color="error" style={{ fontFamily: "inherit" }}>
        Reset
      </Button>
    </div>
  );
}
