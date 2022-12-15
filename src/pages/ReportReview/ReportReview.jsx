import React from 'react';
import { useState } from "react" 
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { reportReview } from "../../redux/actions/index";
import "./ReportReview.module.css"
 var justloaded = true


 const validate = (input) => {
  const errors = {}
  justloaded = false
  if (!input.usuario) {
    errors.usuario = '¡Debes estar logeado para reportar comentarios!'
  }
  if (!input.report) {
    errors.report = '¡Debes escribir el por qué del reporte!'
  }
  if (input.report.length >= 1000) {
    errors.report = '¡El máximo de caracteres es 1000!'
  }

  return errors
}

const ReportReview = () => {
    let { idReview } = useParams(); 
    const User = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Reviews = useSelector((state) => state.reviews.reviewList.reviews);
    const Review = (Reviews.filter(review => review.id === idReview))[0]
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
      reports: ""
 });
    input.reportedBy = User.data.nickname




    let handleChange = (e) => {
      e.preventDefault();
      setInput({
          ...input,
          reports: e.target.value
      })
      setErrors(validate({
        ...input,
        reports: e.target.value
      }))
    }

    const recarga = () => {
      navigate(`/detalles/${Review.articleId}`)
    }

    let handleSubmit = (e) => {
       e.preventDefault();
       dispatch(reportReview(idReview, input))
       setTimeout(recarga, 1000)}
    
    
  return (
    <>
    <div className='background2' id="background2">
    <div/>
{/*     <Nav/>
 */}    <div>
    <form id = "form" onSubmit={handleSubmit}>    

    <div className="review">
        <label htmlFor="name">¿Por qué reportaste este comentario?</label>
        <br/>
        <br/>

        <input
          value={input.reports}
          className={errors.report && 'danger'}
          type="text"
          name="reports"
          onChange={e => handleChange(e)}
        />
    </div>
    <div >

      </div>
       <div class="flex flex-row product-star-con" id="w__stars"></div>
       <button disabled={errors.report || errors.user || justloaded === true} type="submit" className>Reportar</button>
      { errors.review && (<p className="danger">{errors.report}</p>) }
      { errors.user && (<p className="danger">{errors.user}</p>) }

      </form>

      </div>  
      </div> 
      </>
 
  ); 
};

export default ReportReview;
