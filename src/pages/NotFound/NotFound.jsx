import { useEffect } from "react";
import "./NotFound.css";

export default function NotFound() {
  useEffect(() => {
    document.querySelector(".cont_principal").className = "cont_principal cont_error_active";
  }, []);

  return (
    <div class="cont_principal">
      <div class="cont_error">
        <h1>Oops</h1>
        <p>The Page you're looking for isn't here.</p>
      </div>
      <div class="cont_aura_1"></div>
      <div class="cont_aura_2"></div>
    </div>
  );
}
