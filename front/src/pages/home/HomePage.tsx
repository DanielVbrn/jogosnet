import React from "react";
import { useProductContext } from "../../context/ProductContext";
import Cart from "../../components/Cart/Cart";
import Highlight from "../../components/Highlight/Highlight";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";


const HomePage: React.FC = () => {
  const { cart, filteredProducts, highlight, addToCart, removeFromCart, setHighlight } = useProductContext();
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

      <div id={styles.cartContainer} style={{ display: cart.length > 0 ? "block" : "none" }}>
        <Cart cart={cart} removeFromCart={removeFromCart} total={cart.reduce((acc, product) => acc + product.preco, 0)} />
      </div>

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
