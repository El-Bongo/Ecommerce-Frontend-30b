import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';


/*const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];*/

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];


export default function Review() {

  const carro = useSelector((state) => state.cart.cartItems)
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {carro.map((product) => (
          <ListItem key={product.properties.model} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.category?.name} secondary={product.properties.brand} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          $
                {carro.reduce(
                  (acumulador, currentValue) =>{
                    return acumulador = acumulador +
                    Number(currentValue.price) * currentValue.quantity
                    
                  },
                  0
                )}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        
      </Grid>
    </Fragment>
  );
}