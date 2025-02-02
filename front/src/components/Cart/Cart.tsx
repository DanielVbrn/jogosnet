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
        : ${total.toFixed(2)}
      </div>

        <li>
          <button id={styles.cartBtn} className="btn">
              <i className="fas fa-shopping-cart"></i> 
              <span id="cart-count" className="cart-count">0</span>
          </button>
      </li>
    </div>
  )
}

export default Cart