import React from "react";
import { useProductContext } from "../../context/ProductContext";
import Cart from "../../components/Cart/Cart";
import Highlight from "../../components/Highlight/Highlight";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

const HomePage: React.FC = () => {
  const { cart, filteredProducts, highlight, addToCart } = useProductContext();
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <Header />

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
        <button onClick={() => navigate(`/home/game/${highlight?.id}`)}>Ver mais</button>
      </section>

      <div id={styles.cartContainer} style={{ display: cart.length > 0 ? "block" : "none" }}>
        <Cart cart={cart} />
      </div>

      <section className={styles.gameGrid}>
        <ProductGrid products={filteredProducts} addToCart={addToCart} />
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 Gamer Circle. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
