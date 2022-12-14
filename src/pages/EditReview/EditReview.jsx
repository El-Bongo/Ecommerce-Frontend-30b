import React from 'react';
import { useState } from "react" 
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import {  editReview } from "../../redux/actions/index";
 var justloaded = true

 let usuario 

 const validate = (input) => {
  const errors = {}
  justloaded = false
  if (input.username !== usuario){
    errors.user = '¡No eres la persona que hizo esta reseña!'
  }
  if (!input.rating) {
    errors.rating = '¡Debes seleccionar una calificación!'
  }
  if (input.review.length >= 250) {
    errors.review = '¡El máximo de caracteres es 250!'
  }

  return errors
}

const EditReview = () => {
    let { idReview } = useParams(); 
    console.log(idReview)
    const User = useSelector(state => state.user)
    const Reviews = useSelector((state) => state.reviews.reviewList.reviews);
    const Review = (Reviews.filter(review => review.id === idReview))[0]
    console.log(Review)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
      rating: Review.rating,
      review: Review.review,
 });
    input.username = Review.username
    usuario = User.data.nickname




    let handleChange = (e) => {
      e.preventDefault();
      setInput({
          ...input,
          review: e.target.value
      })
      setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
      }, Review))
    }

    

    let handleSubmit = (e) => {
       e.preventDefault();
       dispatch(editReview(idReview, input))
       navigate(`/detalles/${Review.articleId}`)
    }
    const ratingChanged = (newRating) => {      
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
        <label htmlFor="name">Edita tu comentario</label>
        <br/>
        <br/>

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
          value={Review.rating}
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
       <button disabled={errors.review || errors.rating || errors.user || justloaded === true} type="submit" className>Editar reseña</button>
      { errors.review && (<p className="danger">{errors.review}</p>) }
      { errors.rating && (<p className="danger">{errors.rating}</p>) }
      { errors.user && (<p className="danger">{errors.user}</p>) }

      </form>

      </div>  
      </div> 
      </>
 
  ); 
};

export default EditReview;
