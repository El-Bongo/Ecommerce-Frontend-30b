import { useState } from "react";
import styles from "./Article.module.scss";
import { addItemToCart, cleanItem, changeQuantity } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, Button, CardMedia, Typography } from "@mui/material";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addFav, removeFav } from "../../redux/slices/favoriteSlice";
import { Carousel } from "react-responsive-carousel";
import { useEffect } from "react";
import { getWishlist } from "../../redux/actions";

export default function Article({ data }) {
  const carro = useSelector((state) => state.cart.cartItems);
  const reduxUser = useSelector((state) => state.user.data);
  const favItem = useSelector((state) => state.favorite.favItem);
  const dispatch = useDispatch();

  const [favClick, setFavClick] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      if(reduxUser.id !== 0) dispatch(getWishlist(reduxUser.id))
    }, 3000)
  },[favClick])

  function handleClick(){
    if(favClick === false){
      setFavClick(!favClick)
      let assignWish = {
        userId: reduxUser.id,
        articleData: data
      }
      dispatch(addFav(assignWish))
    }
    else {
      setFavClick(!favClick)
      const article = favItem.find(e => e.id === data.id)
      const deleteWish = {
        id: data.id,
        wish: article.wishlist.id
      }
      dispatch(removeFav(deleteWish))
    }
  }

  return (
    <div className={styles.articleContainer}>
      <Card sx={{ maxWidth: 345 }}>
      { reduxUser.id !== 0 ? 
          <Button className={styles.favBtn} onClick={handleClick}>
            {/* {
              favItem.some(e => e.id === data.id) ? 
              <AiFillHeart size={"1.5em"} style={{padding:"0", margin:"0"}} /> : 
              <AiOutlineHeart size={"1.5em"} style={{padding:"0", margin:"0"}}/>
            } */}
          </Button> : null
        }
        <Carousel showArrows={true} showIndicators={true}>
          {data.images.length > 1
            ? data.images.map((x, i) => (
                <div key={x + i} height="240" with="240">
                  <img src={x} alt="carrousel del item" maxHeight="250" />
                </div>
              ))
            : null}
        </Carousel>
        <Link to={`/detalles/${data.id}`} style={{ textDecoration: "none" }}>
          {data.images.length === 1 ? <CardMedia component="img" height="240" image={data.images[0]} /> : null}

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
