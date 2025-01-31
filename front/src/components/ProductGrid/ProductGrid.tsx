import React from 'react';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';
import Product from '../../model/Product';

interface ProductGridProps {
  products: Product[];
  addToCart: (product: Product) => void;
  updateHighlight: (id:number, title: string, info: string, price: number, imgSrc: string, videoSrc:string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, addToCart, updateHighlight }) => (
  <div id={styles.gameGrid} className={styles.gameGrid}>
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        addToCart={addToCart}
        updateHighlight={updateHighlight}
      />
    ))}
  </div>
);

export default ProductGrid;
