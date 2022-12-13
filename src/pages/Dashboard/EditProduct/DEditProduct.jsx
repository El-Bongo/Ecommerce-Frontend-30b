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
  const [productUpdate, setProductUpdate] = useState();
  const { darkMode } = useSelector((state) => state.darkmode);
  // const dispatch = useDispatch();
  const { productId } = useParams();
  const { articulo } = useSelector((state) => state.details.detailedArticle);
  // const navigate = useNavigate();

  const handleUpdateUser = async (user, images) => {
    const resp = await fetch(
      `http://localhost:3001/articulo/modify/${productId}`,
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
              </div>
              <div className={styles.formInput}>
                <label>Precio</label>
                <input
                  type="text"
                  placeholder={`$ ${articulo.price}`}
                  style={{ color: darkMode && "white" }}
                  onChange={(e) =>
                    setProductUpdate({
                      ...productUpdate,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formInput}>
                <label>Stock</label>
                <input
                  type="number"
                  style={{ color: darkMode && "white" }}
                  placeholder={`${articulo.stock} unidades`}
                  onChange={(e) =>
                    setProductUpdate({
                      ...productUpdate,
                      stock: e.target.value,
                    })
                  }
                />
              </div>
              {!avatar?.target.files.length &&
              (productUpdate?.title === "" || !productUpdate?.title) &&
              (productUpdate?.price === "" || !productUpdate?.price) &&
              (productUpdate?.stock === "" || !productUpdate?.stock) ? (
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
