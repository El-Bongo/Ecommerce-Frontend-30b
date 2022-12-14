import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Fragment } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { postAddress } from '../../redux/actions';


export default function AddressForm() {

  const dispatch = useDispatch()

  const [ input, setInput ] = useState({
    firstName:"",
      lastName:"",
      city:"", 
      province:"",
      postalCode:"",
      country:"",
      addressLine:""
  })

  const handleFirstName = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  };
  
  const handleLastName = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  };

  const handleCity = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  };

  const handleProvince = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  };

  const handlePostalCode = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  };

  const handleCountry = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  };

  const handleAddressLine = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postAddress(input))  
    alert('Successfully Added!!!')  
  }



    return (
      <form onSubmit={e => handleSubmit(e)}>
        <Fragment>        
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={input.firstName}
            onChange={handleFirstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={input.lastName}
            onChange={e => handleLastName(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="addressLine"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={input.addressLine}
            onChange={e => handleAddressLine(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={input.city}
            onChange={e => handleCity(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="province"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={input.province}
            onChange={e => handleProvince(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="postalCode"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={input.postalCode}
            onChange={e => handlePostalCode(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={input.country}
            onChange={e => handleCountry(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit"  variant="contained" >Submit Address</Button>
        </Grid>
      </Grid>
    </Fragment>
      </form>
  );
}