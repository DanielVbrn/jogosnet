import React from "react";
import { useProductContext } from "../../context/ProductContext";
import Highlight from "../../components/Highlight/Highlight";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";


const HomePage: React.FC = () => {
  const { filteredProducts, highlight, addToCart, setHighlight } = useProductContext();
  const navigate = useNavigate()

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        {highlight && (
          <Highlight
            nome={highlight.nome}
            descricao={highlight.descricao}
            preco={highlight.preco}
            imgSrc={highlight.imgSrc}
            videoSrc={highlight.videoSrc}
          />
        )}
        <button onClick={() => navigate(`game/${highlight?.id}`)}>Ver mais</button>
      </section>


      <section className={styles.gameGrid}>
        <ProductGrid products={filteredProducts} addToCart={addToCart} setHighlight={setHighlight} />
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 Gamer Circle. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
