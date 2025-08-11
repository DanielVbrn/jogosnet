import React from "react";
import Product from "../../model/Product";
import styles from "./CartItem.module.css";

interface CartItemProps {
  product: Product;
  removeFromCart: (item: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, removeFromCart }) => {
  return (
    <div className={styles.cartItem}>
      <img src={product.imgSrc} alt={product.nome} className={styles.productImage} />
      <div className={styles.productDetails}>
        <span className={styles.productName}>{product.nome}</span>
        <span className={styles.productPrice}>R$ {product.preco.toFixed(2)}</span>
      </div>
      <button onClick={() => removeFromCart(product.id)} className={styles.removeBtn}>
        Remover
      </button>
    </div>
  );
};

export default CartItem;
