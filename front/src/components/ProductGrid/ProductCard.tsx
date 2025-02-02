import React from 'react';
import styles from './ProductGrid.module.css';
import Product from '../../model/Product';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  setHighlight: (product: Product) => void;  // Adicionando setHighlight
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, setHighlight }) => (
  <div className={styles.card} onClick={() => setHighlight(product)}>
    <img src={product.imgSrc} alt={product.nome} />
    <h3>{product.nome}</h3>
    <p>${product.preco.toFixed(2)}</p>
    <button className={styles.btn} onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
      Adicionar ao Carrinho
    </button>   
  </div>
);

export default ProductCard;
