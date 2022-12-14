import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteReview, getAllReviews } from "../../redux/actions";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
export default function DeleteReviews() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let reported = []
  const User = useSelector(state => state.user)
  const reviews = useSelector((state) => state.reviews.reviewList.reviews);
  console.log(reviews)
  useEffect(() => {
    dispatch(getAllReviews());
  }, [])
  if(reviews !== null) {
    reported = reviews.filter(review => review.reportedBy.length > 0)} 

      
      function canDelete(item){
        if (document.getElementById("checkedforDelete" + item.username)){return}
        console.log(item.username)
        console.log(User.data.nickname)
        let deleteButton = document.createElement('button')
        deleteButton.innerHTML = "Eliminar"
        deleteButton.id = "checkedforDelete" + item.username
        deleteButton.onclick = () => {
            deleteReview(item.id)
            window.location.reload(false);
        }      
        let reviewDiv = document.getElementById(item.id);
        if (reviewDiv === null){return}
        reviewDiv.appendChild(deleteButton)
        }

    function setRatingImages(rating){
      switch (rating) {
        case 1:
          return (<div><StarIcon/><StarBorderIcon/><StarBorderIcon/><StarBorderIcon/><StarBorderIcon/></div>)
          break;
        case 2:
            return (<div><StarIcon/><StarIcon/><StarBorderIcon/><StarBorderIcon/><StarBorderIcon/></div>)
            break;      
        case 3:
              return (<div><StarIcon/><StarIcon/><StarIcon/><StarBorderIcon/><StarBorderIcon/></div>)
              break;      
        case 4:
                return (<div><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarBorderIcon/></div>)
                break; 
        case 5:
                return (<div><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>)
                break; 
        default:
          break;
      }
    }


  return(<>
          <label>Reportes:</label>
        {
          reported.map(t => {
            return (
              <div class="col-12 text-left" className="types">
              <div className="review" id={t.id}>
              Razones: {t.reports} <br/>
              {t.username}
              <div/>
              {t.review}
              {setRatingImages(t.rating)}
              {canDelete(t)}
               </div>
              </div>
            )
          })
        } 
  </>)
}

