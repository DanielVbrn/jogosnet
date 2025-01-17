import React from 'react'
import Product from '../../model/Product'


interface CartItemProps {
    product:Product;
    removeFromCart: (item:number) => void;  
}


const CartItem:React.FC<CartItemProps> = ({product, removeFromCart}) => {
  return (
    <div>
        <span>{product.nome}</span>
        <span>{product.preco.toFixed(2)}</span>
        <button onClick={() => removeFromCart(product.id)}>Remover</button>
    </div>
  )
}

export default CartItem