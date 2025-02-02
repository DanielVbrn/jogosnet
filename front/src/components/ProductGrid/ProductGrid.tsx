import React from 'react';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';
import Product from '../../model/Product';

interface ProductGridProps {
  products: Product[];
  addToCart: (product: Product) => void;
  setHighlight: (product: Product) => void; // Corrigido para setHighlight
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, addToCart, setHighlight }) => (
  <div id={styles.gameGrid} className={styles.gameGrid}>
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        addToCart={addToCart}
        setHighlight={setHighlight} // Passando setHighlight para o ProductCard
      />
    ))}
  </div>
);

export default ProductGrid;
