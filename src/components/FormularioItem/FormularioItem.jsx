import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPhotoToCloudinary } from "../../hooks/uploadToCloudinary";
import { getAllCategories, postArticle } from "../../redux/actions";
import styles from "./FormularioItem.module.scss"

export default function FormularioItem({ data }) {
  const categorias = useSelector((state) => state.articles.categorias);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const values = {
    title: data.title || "",
    precio: data.price || "",
    images: data.images || [],
    stock: data.stock || 0,
    category: { new: false, title: "new", photo: "", id: data.categoryId },
    description: data.description || "",
    loading: false,
    updated: false,
  };

  const [item, setItem] = useState(values);

  function handleTitle(e) {
    setItem({ ...item, title: e.target.value });
  }
  function handlePrecio(e) {
    setItem({ ...item, precio: e.target.value });
  }
  function handleStock(e) {
    setItem({ ...item, stock: e.target.value });
  }
  async function handleImage(e) {
    setItem({ ...item, loading: true });
    const response = uploadPhotoToCloudinary(e);
    const d = await response();
    setItem({ ...item, images: item.images.concat(d), loading: false });
  }
  function descripcion(e) {
    setItem({ ...item, description: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postArticle(item));
    setItem({ ...item, updated: true });
  }

  return (
    <form className={styles.itemForm} onSubmit={(e) => handleSubmit(e)}>
      <input
        className={styles.itemTitle}
        placeholder="Titulo"
        value={item.title}
        onChange={(e) => handleTitle(e)}
        type="text"
      ></input>
      <input
        className={styles.itemPrice}
        placeholder="Precio"
        onChange={(e) => handlePrecio(e)}
        type="number"
        step="0.01"
      ></input>
      <input
        className={styles.itemStock}
        placeholder="Stock"
        onChange={(e) => handleStock(e)}
        type="number"
        step="1"
      ></input>
      <textarea
        className={styles.itemDescription}
        placeholder="Descripción del producto"
        onChange={(e) => descripcion(e)}
        value={item.description}
        cols="40" rows="3"
      ></textarea>
      <input
        className={styles.itemImage}
        name="formulario_uploadPhoto"
        multiple="multiple"
        type="file"
        accept="image/png,image/jpeg"
        onChange={(e) => handleImage(e)}
      ></input>
      {item.category.new ? (
        "deberia poner para crear una nueva categoria aca"
      ) : (
        <select
          className={styles.itemCategory}
          defaultValue="Categorias"
          onChange={(e) =>
            setItem({ ...item, category: { new: false, id: e.target.value } })
          }
        >
          <option disabled hidden>
            Categorias
          </option>
          {categorias.map((x) => (
            <option key={x.id + x.name} value={x.id}>
              {x.name}
            </option>
          ))}
        </select>
      )}

      {item.images.length > 0
        ? item.images.map((x) => (
            <div key={x}>
              <img src={x} alt="articulo"></img>{" "}
              <button
              className={styles.itemImageDeleteButton}
                type="button"
                onClick={() =>
                  setItem({
                    ...item,
                    images: item.images
                      .slice(0, item.images.indexOf(x))
                      .concat(
                        item.images.slice(
                          item.images.indexOf(x) + 1,
                          item.images.length
                        )
                      ),
                  })
                }
              >
                X
              </button>
            </div>
          ))
        : item.loading
        ? "Cargando"
        : null}

      <button type="submit">Actualizar/Crear Producto</button>
    </form>
  );
}
