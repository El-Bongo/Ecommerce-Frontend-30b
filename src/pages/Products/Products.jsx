import Articles from "../../components/Articles/Articles";
import Filtro from "../../components/Filtro/Filtro";
import styles from "./Products.module.scss";

export default function Products() {
  return (
    <div className={styles.container}>
      <Filtro />
      <Articles />
    </div>
  );
}
