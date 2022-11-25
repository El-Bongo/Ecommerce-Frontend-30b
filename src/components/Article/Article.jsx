import styles from "./Article.module.scss";
import {
  addItemToCart,
  cleanItem,
  changeQuantity,
} from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

export default function Article({ data }) {
  const carro = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div className={styles.articleContainer}>
      <Card sx={{ maxWidth: 345 }}>
        <Link to={`/detalles/${data.id}`} style={{ textDecoration: "none" }}>
          <CardMedia component="img" height="240" image={data.images[0]} />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ textAlign: "center", color: "black" }}
            >
              {data.title}
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              style={{ textAlign: "center" }}
            >
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
            <Button onClick={() => dispatch(cleanItem(data.id))}>
              Remover del Carro
            </Button>
          ) : (
            <Button onClick={() => dispatch(addItemToCart(data))}>
              Agregar Al Carro
            </Button>
          )}
          {carro.filter((x) => x.id === data.id).length > 0 ? (
            <input
              type="number"
              value={carro.filter((x) => x.id === data.id)[0].quantity}
              onChange={(e) =>
                dispatch(
                  changeQuantity({ id: data.id, quantity: e.target.value })
                )
              }
            ></input>
          ) : null}
        </CardActions>
      </Card>
    </div>
  );
}
