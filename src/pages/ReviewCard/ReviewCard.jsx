import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviews } from "../../redux/actions";


export default function ReviewCard() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector((state) => state.reviews.reviewList.reviews);
  console.log(reviews)
useEffect(() => {
    dispatch(getReviews(id))
    return() => dispatch(getReviews(id));
  }, [dispatch, id])
  return(<>

  </>)
}

