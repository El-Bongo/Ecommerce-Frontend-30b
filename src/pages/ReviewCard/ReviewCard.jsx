import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviews } from "../../redux/actions";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from "react-router-dom";
export default function ReviewCard() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams();
  let notReported = []
  const User = useSelector(state => state.user)
  const reviews = useSelector((state) => state.reviews.reviewList.reviews);
  useEffect(() => {
    dispatch(getReviews(id));
  }, [])
  if(reviews !== null) {
    notReported = reviews.filter(review => !review.reportedBy.includes(User.data.nickname))} 

    function canEdit(item){
      //console.log(item)
      //console.log(User)
      if (document.getElementById("checked")){return}
      if(item.username === User.data.nickname){
        let editButton = document.createElement('button')
        editButton.innerHTML = "Editar"
        editButton.id = "checked"
        editButton.onclick = () => navigate(`/review/${item.id}`)
        console.log(editButton)
        
        let reviewDiv = document.getElementById(item.id);
        if (reviewDiv === null){return}
        reviewDiv.appendChild(editButton)
          }
      }
      
      function canReport(item){
        if (document.getElementById("checkedforReport" + item.username)){return}
        console.log(item.username)
        console.log(User.data.nickname)

        if(item.username !== User.data.nickname && User.data.nickname !== "Username"){
          let reportButton = document.createElement('button')
          reportButton.innerHTML = "Reportar"
          reportButton.id = "checkedforReport" + item.username
          reportButton.onclick = () => navigate(`/report/${item.id}`)          
          let reviewDiv = document.getElementById(item.id);
          if (reviewDiv === null){return}
          reviewDiv.appendChild(reportButton)
            }
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
          <label>Reseñas:</label>
        {
          notReported.map(t => {
            return (
              <div class="col-12 text-left" className="types">
              <div className="review" id={t.id}>
              {t.username}
              <div/>
              {t.review}
              {setRatingImages(t.rating)}
              {canEdit(t)}
              {canReport(t)}
               </div>
              </div>
            )
          })
        } 
  </>)
}

