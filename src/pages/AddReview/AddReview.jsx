import React from 'react';
import { useState, useEffect } from "react" 
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import './AddReview.css'
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
  if (input.description.length >= 250) {
    errors.description = '¡El máximo de caracteres es 250!'
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
      description: "",
      user: "testuser",
      item: id,
/*       image: '', Por ahora no, debo charlar como lo haremos.
 */    });


/*     const loadFile = function(e) {
      const image = document.getElementById('output');
      const file = e.target.files[0]
      reader.addEventListener("load", () => {
        // convert image file to base64 string
        image.src = reader.result;
        setInput({
          ...input,
          [e.target.name]: reader.result
      })
      }, false);
      if (file) {
        reader.readAsDataURL(file);
      }    
      setInput({
        ...input,
        [e.target.name]: reader.result
    })
  } */


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

    const stars = [];
    for (let i = 0; i <= 4; i++) {
        stars.push({
        active: false,
        index: i
      });
    }
    
    const renderStars = (parentElement, stars, activeContent, notActiveContent) => {
        parentElement.innerHTML = '';
        stars.forEach(({ active, index }) => {
        parentElement.innerHTML += `
            <span class="r__icon">${active ? activeContent : notActiveContent}</span>`;
      });
      
      Array.from(parentElement.querySelectorAll('.r__icon')).forEach((item, itemIndex) => {
        const star = stars.find(({ index }) => index === itemIndex);
        stars[star.index].element = item;
      
        item.addEventListener('click', (e) => {
            const itemElement = e.target;
          const starIndex = stars.findIndex(({ element }) => element === itemElement);
          if (starIndex === -1) {
            return;
          }
          
          const toActive = stars[starIndex].active !== true;
          input.rating = starIndex+1
          validate(input)    
          stars = stars.map(star => {
            if (toActive) {
                // Set items before index to true, and after to false
                if (star.index <= starIndex) {
                return {
                    ...star,
                  active: true
                };
              }
              
              return {
                ...star,
                active: false
              };
            } else {
                // Set items after index to false, and before to true
              if (star.index >= starIndex) {
                return {
                  ...star,
                  active: false
                };
              }
              
              return {
                ...star,
                active: true
              };
            }
          });
          
          renderStars(parentElement, stars, activeContent, notActiveContent);
        });
      });
    };
    
    const setupStars = (stars, activeContent, notActiveContent) => {
        const parentElement = document.getElementById("w__stars");
      if (!parentElement) {
        return;
      }
      
      renderStars(parentElement, stars, activeContent, notActiveContent);
    };
    
    setupStars(stars, '[X]', '[ ]');
    
    const handleRating = (e) => {
        setInput({
          ...input,
          rating: [...input.rating, e.target.value]
        })
        setErrors(validate({
          ...input,
          rating: [...input.rating, e.target.value]
        }, Article))
    }
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
          value={input.description}
          className={errors.description && 'danger'}
          type="text"
          name="description"
          onChange={handleChange}
        />  
    </div>
    <div >
{/*     <input type="file"  accept="image/*" name="image" id="file"  onChange={loadFile}></input>
    <img id="output" width="200" alt="Sin imagen" />
      </div>        
        <div id='types'> */}



      </div>
      <div class="flex flex-row product-star-con" id="w__stars"></div>

      <button disabled={errors.description || errors.rating || justloaded === true} type="submit" className>Añadir reseña</button>
      { errors.description && (<p className="danger">{errors.description}</p>) }
      { errors.rating && (<p className="danger">{errors.rating}</p>) }

      </form>
      </div>  
      </div> 
      </>
 
  ); 
};

export default AddReview;
