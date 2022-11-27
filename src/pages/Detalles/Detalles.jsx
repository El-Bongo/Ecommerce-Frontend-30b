import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../../redux/actions";
import { cleanDetails } from "../../redux/slices/detailSlice";

export default function Detalles() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const details = useSelector((state) => state.details.detailedArticle);

  useEffect(() => {
    dispatch(getSingleArticle(id));
    return () => dispatch(cleanDetails());
  }, [id, dispatch]);

  return (
    <div>
      <h1>{details.title}</h1>
      <p>{details.description}</p>
      <p>{details.stock}</p>
      <h2>{details.price}</h2>
      <h3>{details.category.name}</h3>
      {details.images.map((x) => (
        <img src={x} alt="product" key={x}></img>
      ))}
    </div>
  );
}
