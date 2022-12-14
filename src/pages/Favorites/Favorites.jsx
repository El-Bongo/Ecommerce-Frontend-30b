import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Favorites.module.scss";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { removeFav } from "../../redux/slices/favoriteSlice";

export default function Favorites() {

  const favItem = useSelector((state) => state.favorite.favItem);
  const dispatch = useDispatch()


  return(
    <div className={styles.mainContainer}>
      <h2>Lista de favoritos</h2>
      <div className={styles.containerDisplay}>
        {
          favItem?.length > 0 ? favItem.map(e=> (
            <Card className={styles.favoriteArticle}>
              <CardMedia
                component="img"
                sx={{ width: 140 }}
                image={e.images[0]}
                alt={`Imagen de ${e.properties.brand + " " + e.properties.model}`}
              />
              <Box className={styles.infoArticle}>
                <CardContent className={styles.content}>
                  <Typography component="div" variant="h5">
                    {e.properties.brand + " " + e.properties.model}
                  </Typography>
                  <Typography variant="h6" color="text.primary" component="div">
                    ${e.price}
                  </Typography>
                </CardContent>
              </Box>
              <Box className={styles.infoArticle}>
                <Link to={`/detalles/${e.id}`} className={styles.moreDetails}>
                  <Typography component="div" variant="primary.text">
                    Más detalles
                  </Typography>
                </Link>
                <Typography onClick={() => {
                    const deleteWish = {
                      id: e.id,
                      wish: e.wishlist.id
                    }
                    dispatch(removeFav(deleteWish))}}
                  className={styles.moreDetails} component="div" variant="primary.text">
                  Elimina de favoritos
                </Typography>
              </Box>
            </Card>
          )) : <h2> No hay ningun item dentro de favoritos</h2>
        }
      </div>
    </div>
  )
}