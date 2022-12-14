import styles from "./DCreateProduct.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { DSidebar } from "../components/Sidebar/DSidebar";
import { DNavbar } from "../components/Navbar/DNavbar";
import dark from "../Dark.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { uploadPhotoToCloudinary } from "../../../hooks/uploadToCloudinary";
import Swal from "sweetalert2";
import { getAllCategories } from "../../../redux/actions";

export const DCreateProduct = () => {
  const categorias = useSelector((state) => state.articles.categorias);
  const propiedades = useSelector((state) => state.articles.allArticles);
  const { darkMode } = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [productCreate, setProductCreate] = useState({
    title: "",
    precio: "",
    stock: 0,
    category: {},
  });
  const [properties, setProperties] = useState({
    brand: "",
    model: "",
    property1: "",
    property2: "",
    property3: "",
  });
  // const navigate = useNavigate();

  var propiedadesNum = 1

  if(productCreate.category.id === "1"){
    var propiedadesNum = 1
  } else if(productCreate.category.id === "2"){
    var propiedadesNum = 30
  } else if(productCreate.category.id === "3"){
    var propiedadesNum = 50
  } else if(productCreate.category.id === "4"){
    var propiedadesNum = 70
  } else if(productCreate.category.id === "5"){
    var propiedadesNum = 90
  } else if(productCreate.category.id === "6"){
    var propiedadesNum = 110
  } else if(productCreate.category.id === "7"){
    var propiedadesNum = 130
  } else if(productCreate.category.id === "8"){
    var propiedadesNum = 150
  } else if(productCreate.category.id === "9"){
    var propiedadesNum = 170
  } else if(productCreate.category.id === "10"){
    var propiedadesNum = 190
  }

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleUpdateUser = async (product, images, properties) => {
    const resp = await fetch("http://localhost:3001/articulo/create", {
      method: "POST",
      body: JSON.stringify({ ...product, images, properties }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    const data = await resp.json();

    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var images;

    if (avatar) {
      const response = uploadPhotoToCloudinary(avatar);
      images = await response();
    }


    Swal.fire({
      title: "Quieres crear un nuevo producto?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Crear",
      denyButtonText: `No Crear`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Creado!", "", "success");
        handleUpdateUser(productCreate, images, properties);
      } else if (result.isDenied) {
        Swal.fire("El producto no fue creado", "", "info");
      }
    });
  };
  console.log(categorias)
  // console.log(propiedades)
  // console.log(productCreate)
  // console.log(properties)
  return (
    <div className={`${styles.new} ${darkMode && dark.dark}`}>
      <DSidebar />
      <div className={styles.newContainer}>
        <DNavbar />
        <div className={styles.top}>
          <h1>Crear Producto</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <img
              src={
                avatar?.target?.files[0]
                  ? URL.createObjectURL(avatar?.target?.files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className={styles.right}>
            <h3 style={{ padding: 10 }}>Generales</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formInput}>
                <label htmlFor="file">
                  Imagen:{" "}
                  <DriveFolderUploadOutlinedIcon className={styles.icon} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={async (e) => {
                    setAvatar(e);
                  }}
                  style={{ display: "none" }}
                />
              </div>
              <div className={styles.formInput}>
                <label>Titulo</label>
                <input
                  type="text"
                  style={{ color: darkMode && "white" }}
                  onChange={(e) =>
                    setProductCreate({
                      ...productCreate,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formInput}>
                <label>Precio</label>
                <input
                  type="text"
                  style={{ color: darkMode && "white" }}
                  onChange={(e) =>
                    setProductCreate({
                      ...productCreate,
                      precio: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formInput}>
                <label>Stock</label>
                <input
                  type="number"
                  style={{ color: darkMode && "white" }}
                  onChange={(e) =>
                    setProductCreate({
                      ...productCreate,
                      stock: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formInput}>
                <label>Categorias</label>
                <select
                  defaultValue="Categorias"
                  onChange={(e) =>
                    setProductCreate({
                      ...productCreate,
                      category: {id: e.target.value },
                    })
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
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3 style={{ padding: 10 }}>Propiedades</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 40,
                  }}
                >
                  <div className={styles.formInput}>
                    <label>Marca</label>
                    <input
                      type="text"
                      style={{ color: darkMode && "white" }}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          brand: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={styles.formInput}>
                    <label>Modelo</label>
                    <input
                      type="text"
                      style={{ color: darkMode && "white" }}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          model: e.target.value,
                        })
                      }
                    />
                  </div>                 
                  <div className={styles.formInput}>
                    <label>Propiedad 1: {Object.keys(propiedades[Number(propiedadesNum)].properties)[2]}</label>
                    <input
                      type="text"
                      style={{ color: darkMode && "white" }}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          property1: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={styles.formInput}>
                    <label>Propiedad 2: {Object.keys(propiedades[Number(propiedadesNum)].properties)[3]}</label>
                    <input
                      type="text"
                      style={{ color: darkMode && "white" }}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          property2: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={styles.formInput}>
                    <label>Propiedad 3: {Object.keys(propiedades[Number(propiedadesNum)].properties)[4]}</label>
                    <input
                      type="text"
                      style={{ color: darkMode && "white" }}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          property3: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {!avatar?.target.files.length ||
              productCreate?.title === "" ||
              !productCreate?.title ||
              productCreate?.precio === "" ||
              !productCreate?.precio ||
              productCreate?.stock === "" ||
              !productCreate?.stock ||
              properties?.brand === "" ||
              !properties?.brand ||
              properties?.model === "" ||
              !properties?.model || !productCreate?.category.id ? (
                <button disabled style={{ backgroundColor: "#ac96fd" }}>
                  Enviar
                </button>
              ) : (
                <button>Enviar</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
