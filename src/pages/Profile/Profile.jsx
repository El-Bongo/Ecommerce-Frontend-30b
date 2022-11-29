import { useParams } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";

export default function Profile() {
  const { id } = useParams();
  const datos = useProfile(id);

  return <div>El email es: {datos.email} </div>;
}
