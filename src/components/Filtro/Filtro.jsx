import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataForFiltering } from "../../redux/slices/articlesSlice";
import { MultiSelect } from "react-multi-select-component";
import { ListSubheader, List, ListItemButton, Button } from "@mui/material";
import styles from "./Filtro.module.scss";

export default function Filtro() {
  const dispatch = useDispatch();
  const initalState = {
    title: "",
    order: null,
    priceRange: { min: "", max: "" },
    categoria: [],
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
          order:
            filter.order === null
              ? "+Precio-"
              : filter.order === "-Precio+"
              ? null
              : "-Precio+",
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
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Categorias
          </ListSubheader>
        }
      >
        <ListItemButton>
          <MultiSelect
            options={categorias.map((x) => {
              return { label: x.name, value: x.id };
            })}
            value={filter.categoria}
            onChange={handleCategoria}
            labelledBy="Select"
            className={styles.multiSelected}
          />
        </ListItemButton>
      </List>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Filtro de Precios
          </ListSubheader>
        }
      >
        <ListItemButton>
          <input
            type="number"
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
        </ListItemButton>
        <ListItemButton>
          <input
            type="number"
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
            }}
          />
        </ListItemButton>
        <ListItemButton>
          <Button
            variant="outlined"
            id="filter_price_order"
            onClick={handlePrice}
          >
            {filter.order === null
              ? "Ordenar por Precio"
              : filter.order === "+Precio-"
              ? "Ordenar de Mayor a Menor precio"
              : "Ordenar de Menor a Mayor Precio"}
          </Button>
        </ListItemButton>
      </List>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Buscar Por Nombre
          </ListSubheader>
        }
      >
        <ListItemButton>
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
            }}
          />
        </ListItemButton>
      </List>
      <Button onClick={handleReset} variant="outlined" color="error">
        Reset
      </Button>
    </div>
  );
}
