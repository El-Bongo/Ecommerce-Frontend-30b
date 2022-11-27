import styles from "./Slider.module.scss";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import imgFondo1 from "../../assets/imagenFondo1.png";
import imgFondo2 from "../../assets/ImagenFondo2.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Slider = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const { innerWidth } = useSelector((state) => state.windows);

  const handleSlider = (direction) => {
    if (direction === "left") {
      setSliderIndex(sliderIndex > 0 ? sliderIndex - 1 : 1);
    } else {
      setSliderIndex(sliderIndex < 1 ? sliderIndex + 1 : 0);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.arrow}
        style={{ left: 10 }}
        onClick={() => handleSlider("left")}
      >
        <BiLeftArrow />
      </div>

      <div
        className={styles.wrapper}
        style={{
          transform:
            innerWidth > 500
              ? `translateX(${sliderIndex * -115}vw)`
              : `translateX(${sliderIndex * -95}vw)`,
        }}
      >
        <div className={styles.slider}>
          <div className={styles.infoContainer}>
            <h2>Smart Watch</h2>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <input
                type="button"
                value="Comprar Ahora"
                style={{ margin: 10 }}
              />
            </Link>
          </div>
          <div className={styles.imgContainer}>
            <img src={imgFondo1} alt="" />
          </div>
        </div>
        <div className={styles.slider}>
          <div className={styles.infoContainer}>
            <h2>Zapatillas Nike Air </h2>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <input
                type="button"
                value="Comprar Ahora"
                style={{ margin: 10 }}
              />
            </Link>
          </div>
          <div className={styles.imgContainer}>
            <img src={imgFondo2} alt="" />
          </div>
        </div>
      </div>

      <div
        className={styles.arrow}
        style={{ right: 10 }}
        onClick={() => handleSlider("right")}
      >
        <BiRightArrow />
      </div>
    </div>
  );
};
