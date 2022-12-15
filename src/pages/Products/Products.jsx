import Articles from "../../components/Articles/Articles";
import Filtro from "../../components/Filtro/Filtro";
import styles from "./Products.module.scss";
import { useLocation } from "react-router-dom";

export default function Products() {
  const history = useLocation();
  const categoria = history.state;

  return (
    <div className={styles.container}>
      <Filtro categoria={categoria?.categoria} />
      <Articles />
    </div>
  );
}
