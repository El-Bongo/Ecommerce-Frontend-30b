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
  const [cargando, setCargando] = useState(false);
  const [productCreate, setProductCreate] = useState({
    title: "",
    precio: "",
    stock: 0,
    category: {},
  });
  const [properties, setProperties] = useState({
    brand: "",
    model: ""
  });
  // const navigate = useNavigate();

  var propiedadesNum = 1

  if(productCreate.category.id === "1"){
     propiedadesNum = 1
  } else if(productCreate.category.id === "2"){
     propiedadesNum = 30
  } else if(productCreate.category.id === "3"){
     propiedadesNum = 50
  } else if(productCreate.category.id === "4"){
     propiedadesNum = 70
  } else if(productCreate.category.id === "5"){
     propiedadesNum = 90
  } else if(productCreate.category.id === "6"){
     propiedadesNum = 110
  } else if(productCreate.category.id === "7"){
     propiedadesNum = 130
  } else if(productCreate.category.id === "8"){
     propiedadesNum = 150
  } else if(productCreate.category.id === "9"){
     propiedadesNum = 170
  } else if(productCreate.category.id === "10"){
     propiedadesNum = 190
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
      setCargando(true);
      images = await response();
      setCargando(false);
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

  const handleErrorTitle = (e) =>{
    if(e.length < 10) return "El título es demasiado corto"
    else if(e.length > 200) return "El título es demasiado largo"
  }
  const handleErrorPrice = (e) =>{
    if(!/^[0-9\.,]+$/i.test(e)) return "El precio debe ser un número"
    else if(e < 1) return "El precio no puede ser 0"
  }
  const handleErrorStock = (e) =>{
    if(!/^[0-9]+$/i.test(e)) return "El stock debe ser un número"
    else if(e < 1) return "El stock no puede ser 0"
  }


  function mapImagenes() {
    let a = [];
    for (let i = 0; i < avatar.target.files.length; i++) {
      a.push(<img src={URL.createObjectURL(avatar.target.files[i])} alt="producto" key={i} className={styles.imgarrayproduct}></img>);
    }
    return a;
  }
  console.log(properties)
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
            {avatar?.target?.files?.length > 1 ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}> {mapImagenes()} </div>
            ) : (
              <img src={avatar?.target?.files[0] ? URL.createObjectURL(avatar?.target?.files[0]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
            )}
          </div>
          <div className={styles.right}>
            <h3 style={{ padding: 10 }}>Generales</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formInput}>
                <label htmlFor="file">
                  Imagen: <DriveFolderUploadOutlinedIcon className={styles.icon} />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple="multiple"
                  accept="image/png,image/jpeg"
                  onChange={async (e) => {
                    setAvatar(e);
                  }}
                  style={{ display: "none" }}
                />
              </div>
              <div className={styles.formInput}>
                <label>Título</label>
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
                <b style={{color:"red"}}>{handleErrorTitle(productCreate.title)}</b>
              </div>
              <div className={styles.formInput}>
                <label>Precio</label>
                <input
                  type="number"
                  min="0"
                  style={{ color: darkMode && "white" }}
                  onChange={(e) =>
                    setProductCreate({
                      ...productCreate,
                      precio: e.target.value,
                    })
                  }
                />
                <b style={{color:"red"}}>{handleErrorPrice(productCreate.precio)}</b>
              </div>
              <div className={styles.formInput}>
                <label>Stock</label>
                <input
                  type="number"
                  min="0"
                  style={{ color: darkMode && "white" }}
                  onChange={(e) =>
                    setProductCreate({
                      ...productCreate,
                      stock: e.target.value,
                    })
                  }
                />
                <b style={{color:"red"}}>{handleErrorStock(productCreate.stock)}</b>
              </div>
              <div className={styles.formInput}>
                <label>Categorias</label>
                <select
                  defaultValue="Categorias"
                  onChange={(e) => {
                    setProductCreate({
                      ...productCreate,
                      category: { id: e.target.value },
                    })
                    setProperties({
                      brand: "",
                      model: ""
                    })
                  }
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
                    <label>{Object.keys(propiedades[Number(propiedadesNum)].properties)[2]}</label>
                    <input
                      name={Object.keys(propiedades[Number(propiedadesNum)].properties)[2]}
                      type="text"
                      style={{ color: darkMode && "white" }}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={styles.formInput}>
                    <label>{Object.keys(propiedades[Number(propiedadesNum)].properties)[3]}</label>
                    <input
                      name={Object.keys(propiedades[Number(propiedadesNum)].properties)[3]}
                      type="text"
                      style={{ color: darkMode && "white" }}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={styles.formInput}>
                    <label>{Object.keys(propiedades[Number(propiedadesNum)].properties)[4]}</label>
                    <input
                      name={Object.keys(propiedades[Number(propiedadesNum)].properties)[4]}
                      type="text"
                      style={{ color: darkMode && "white" }}
                      onChange={(e) =>
                        setProperties({
                          ...properties,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {!avatar?.target.files.length ||
              ((typeof handleErrorTitle(productCreate.title) || 
              typeof handleErrorPrice(productCreate.price) || 
              typeof handleErrorStock(productCreate.stock)) === "string") ||
              cargando ? (
                <button disabled style={{ backgroundColor: "#ac96fd", cursor: "not-allowed" }}>
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
