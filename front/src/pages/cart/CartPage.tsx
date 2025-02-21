import React from "react";
import { useProductContext } from "../../context/ProductContext";
import Cart from "../../components/Cart/Cart";
import styles from "./CartPage.module.css";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const { cart, removeFromCart } = useProductContext();
  const navigate = useNavigate();

  const total = cart.reduce((acc, product) => acc + product.preco, 0);

  return (
    <div className={styles.cartPage}>
      <h1>Meu Carrinho</h1>
      {cart.length > 0 ? (
        <>
          <Cart cart={cart} removeFromCart={removeFromCart} total={total} />
          <button className={styles.backBtn} onClick={() => navigate("/home")}>
            Continuar Comprando
          </button>
        </>
      ) : (
        <p>Seu carrinho está vazio. <button onClick={() => navigate("/home")}>Voltar para a loja</button></p>
      )}
    </div>
  );
};

export default CartPage;
