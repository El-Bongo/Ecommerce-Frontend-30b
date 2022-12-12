import React from 'react';
import { useState, useEffect } from "react" 
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import './AddReview.css'
import ReactStars from "react-rating-stars-component";
import { createReview } from '../../redux/actions';
import { useNavigate } from "react-router-dom";


 var justloaded = true

 const validate = (input) => {
  const errors = {}
  justloaded = false
  console.log(input)
  if (!input.rating) {
    errors.rating = '¡Debes seleccionar una calificación!'
  }
  if (input.review.length >= 250) {
    errors.review = '¡El máximo de caracteres es 250!'
  }

  return errors
}


const AddReview = () => {

    let { id } = useParams(); 
    const User = useSelector(state => state.user)
    const { Article } = useSelector((state) => state.details.detailedArticle);
    var reader = new FileReader()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
      rating: "",
      review: "",
      username: "testuser",
      item: id,
/*       image: '', Por ahora no, debo charlar como lo haremos.
 */    });

    let handleChange = (e) => {
      e.preventDefault();
      setInput({
          ...input,
          [e.target.name]: e.target.value
      })
      setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
      }, Article))
    }

    

    let handleSubmit = (e) => {
       e.preventDefault();
      dispatch(createReview(input))
      navigate()
 
    }
    const ratingChanged = (newRating) => {
      console.log(newRating);
      input.rating=newRating
      setErrors(validate(
        input))
      };
    
  return (
    <>
    <div id="background2">
    <div/>
{/*     <Nav/>
 */}    <div>
    <form id = "form" onSubmit={handleSubmit}>    

    <div className="review">
        <label htmlFor="name">Inserta tu comentario o reseña</label>
        <input
          value={input.review}
          className={errors.review && 'danger'}
          type="text"
          name="review"
          onChange={handleChange}
        />
    </div>
    <div className="stars">
    <ReactStars
          count={5}
          onChange={ratingChanged}
          size={36}
          activeColor="#ffd700"
        />  
    </div>
    <div >
{/*     <input type="file"  accept="image/*" name="image" id="file"  onChange={loadFile}></input>
    <img id="output" width="200" alt="Sin imagen" />
      </div>        
        <div id='types'> */}



      </div>
       <div class="flex flex-row product-star-con" id="w__stars"></div>
      <button disabled={errors.review || errors.rating || justloaded === true} type="submit" className>Añadir reseña</button>
      { errors.review && (<p className="danger">{errors.review}</p>) }
      { errors.rating && (<p className="danger">{errors.rating}</p>) }

      </form>

      </div>  
      </div> 
      </>
 
  ); 
};

export default AddReview;
