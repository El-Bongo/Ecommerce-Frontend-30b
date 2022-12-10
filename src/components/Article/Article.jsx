import { useState } from "react";
import styles from "./Article.module.scss";
import { addItemToCart, cleanItem, changeQuantity } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, Button, Typography } from "@mui/material";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addFav, removeFav } from "../../redux/slices/favoriteSlice";
import { Carousel } from "react-responsive-carousel";

export default function Article({ data }) {
  const carro = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [favClick, setFavClick] = useState(true);

  return (
    <div className={styles.articleContainer}>
      <Card sx={{ maxWidth: 345 }}>
        <Button
          className={styles.favBtn}
          onClick={() => {
            if (favClick === true) {
              setFavClick(false);
              dispatch(addFav(data));
            } else {
              setFavClick(true);
              dispatch(removeFav(data.id));
            }
          }}
        >
          {favClick ? <AiOutlineHeart size={"1.5em"} style={{ padding: "0", margin: "0" }} /> : <AiFillHeart size={"1.5em"} style={{ padding: "0", margin: "0" }} />}
        </Button>
        <Carousel showArrows={true} showIndicators={true}>
          {data.images.map((x, i) => (
            <div key={x + i} height="240" with="240">
              <img src={x} alt="carrousel del item" maxHeight="250" />
            </div>
          ))}
        </Carousel>
        <Link to={`/detalles/${data.id}`} style={{ textDecoration: "none" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: "center", color: "black" }}>
              {data.title}
            </Typography>
            <Typography variant="h4" color="text.secondary" style={{ textAlign: "center" }}>
              ${data.price}
            </Typography>
          </CardContent>
        </Link>
        <CardActions
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {carro.filter((x) => x.id === data.id).length > 0 ? (
            <Button onClick={() => dispatch(cleanItem(data.id))}>Remover del Carro</Button>
          ) : data.stock > 0 ? (
            <Button onClick={() => dispatch(addItemToCart(data))}>Agregar Al Carro</Button>
          ) : (
            "No tenemos Stock"
          )}
          {carro.filter((x) => x.id === data.id).length > 0 ? <input type="number" value={carro.filter((x) => x.id === data.id)[0].quantity} onChange={(e) => dispatch(changeQuantity({ id: data.id, quantity: e.target.value }))}></input> : null}
        </CardActions>
      </Card>
    </div>
  );
}
