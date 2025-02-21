import React from 'react'
import Product from '../../model/Product';
import styles from "./Cart.module.css"
import CartItem from '../CartItem/CartItem';

interface CartProps {
  cart:Product[];
  removeFromCart:(item:number) => void;
  total:number;

}


const Cart:React.FC<CartProps> = ({cart,removeFromCart, total}) => {
  

  return (
    <div className={styles.Container}>
      <h2>Carrinho</h2>
      <div>
        {cart.map((product) => (
          <CartItem key={product.id} product={product} removeFromCart={removeFromCart}/>
        ))}

      </div>
      <div className={styles.cartTotal}>
        <h4>Total: ${total.toFixed(2)}</h4>
      </div>
        <li>
          <button id={styles.cartBtn} className={styles.cartBtn}>
              <i className="fas fa-shopping-cart"></i> 
              <p id="cart-count" className={styles.cartCount}>{cart.length} itens no Carrinho</p>
          </button>
      </li>
    </div>
  )
}

export default Cart