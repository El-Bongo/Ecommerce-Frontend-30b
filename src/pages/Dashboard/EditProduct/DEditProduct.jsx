import styles from "./DEditProduct.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { DSidebar } from "../components/Sidebar/DSidebar";
import { DNavbar } from "../components/Navbar/DNavbar";
import dark from "../Dark.module.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadPhotoToCloudinary } from "../../../hooks/uploadToCloudinary";
import Swal from "sweetalert2";

export const DEditProduct = () => {
  const [avatar, setAvatar] = useState(null);
  const [productUpdate, setProductUpdate] = useState({});
  const { darkMode } = useSelector((state) => state.darkmode);
  // const dispatch = useDispatch();
  const { productId } = useParams();
  const { articulo } = useSelector((state) => state.details.detailedArticle);
  // const navigate = useNavigate();

  const handleUpdateUser = async (user, images) => {
    const resp = await fetch(
      `https://pf-30b-backend.onrender.com/articulo/modify/${productId}`,
      {
        method: "PUT",
        body: JSON.stringify({ ...user, images }),
        headers: new Headers({ "content-type": "application/json" }),
      }
    );
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
      title: "Quieres aceptar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Editar",
      denyButtonText: `No Editar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Editado!", "", "success");
        handleUpdateUser(productUpdate, images);
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se guardaron", "", "info");
      }
    });
  };

  const handleErrorTitle = (e) =>{
    if(e === undefined){
      return null
    }else{
      if(e.length < 10) return "El título es demasiado corto"
      else if(e.length > 200) return "El título es demasiado largo"
      else return null
    }
  }
  const handleErrorPrice = (e) =>{
    if(!/^[0-9\.,]+$/i.test(e)) return "El precio debe ser un número"
    else if(e < 1) return "El precio no puede ser 0"
    else return null
  }
  const handleErrorStock = (e) =>{
    if(!/^[0-9]+$/i.test(e)) return "El stock debe ser un número"
    else if(e < 1) return "El stock no puede ser 0"
    else return null
  }



  return (
    <div className={`${styles.new} ${darkMode && dark.dark}`}>
      <DSidebar />
      <div className={styles.newContainer}>
        <DNavbar />
        <div className={styles.top}>
          <h1>Editar Producto</h1>
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
            <form onSubmit={handleSubmit}>
              <div className={styles.formInput}>
                <label htmlFor="file">
                  Imagen:{" "}
                  <DriveFolderUploadOutlinedIcon className={styles.icon} />
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/png,image/jpeg"
                  onChange={async (e) => {
                    setAvatar(e);
                  }}
                  style={{ display: "none" }}
                />
              </div>
              <div className={styles.formInput}>
                <label>Title</label>
                <input
                  type="text"
                  placeholder={articulo.title}
                  style={{ color: darkMode && "white" }}
                  onChange={(e) =>
                    setProductUpdate({
                      ...productUpdate,
                      title: e.target.value,
                    })
                  }
                />
                <b style={{color:"red"}}>{
                  productUpdate.hasOwnProperty("title") ? handleErrorTitle(productUpdate.title) : null
                }</b>
              </div>
              <div className={styles.formInput}>
                <label>Precio</label>
                <input
                  type="number"
                  min="0"
                  placeholder={`$ ${articulo.price}`}
                  style={{ color: darkMode && "white" }}
                  onChange={(e) =>
                    setProductUpdate({
                      ...productUpdate,
                      price: e.target.value,
                    })
                  }
                />
                <b style={{color:"red"}}>{
                  productUpdate.hasOwnProperty("price") ? handleErrorPrice(productUpdate.price) : null
                }</b>
              </div>
              <div className={styles.formInput}>
                <label>Stock</label>
                <input
                  type="number"
                  min="0"
                  style={{ color: darkMode && "white" }}
                  placeholder={`${articulo.stock} unidades`}
                  onChange={(e) =>
                    setProductUpdate({
                      ...productUpdate,
                      stock: e.target.value,
                    })
                  }
                />
                <b style={{color:"red"}}>{
                  productUpdate.hasOwnProperty("stock") ? handleErrorStock(productUpdate.stock) : null
                }</b>
              </div>
              {!avatar?.target.files.length &&
              ((typeof handleErrorTitle(productUpdate.title) || 
                typeof handleErrorPrice(productUpdate.price) || 
                typeof handleErrorStock(productUpdate.stock)) === "string") ? (
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
