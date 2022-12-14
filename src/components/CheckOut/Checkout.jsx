import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import { React, Fragment, useState, useEffect } from 'react';
import Cart from '../../pages/Cart/Cart';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { cleanCart } from '../../redux/slices/cartSlice';




function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/" to="/products" >
        HENRY - eCOMMERCE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Cart'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Cart />;
    
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {

  const [searchParams] = useSearchParams();

  const payment_id = searchParams.get("payment_id");

  const dispatch = useDispatch();
  const [comprado, setComprado] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/mercadoPago/checkPurchase/${payment_id}`, {
      method: "GET",
    })
      .then((a) => a.json())
      .then((a) => {
        if (a.estado === "approved") {
          dispatch(cleanCart());
          setComprado(a.compra);
        } else {
          window.location.href = "https://ecommerce-frontend-30b.vercel.app/cart";
        }
      });
  }, [dispatch, payment_id]);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const disabledNext = () => {
    if(activeStep === steps.length -1)
    return true
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is {comprado.transaction_id}. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </Fragment>
          ) : (
            <Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  disabled={disabledNext()}
                >
                  {activeStep === steps.length - 1 ? null : 'Next'}
                </Button>
              </Box>
            </Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}