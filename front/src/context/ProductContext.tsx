import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import Product from "../model/Product";
import ProductService from "../service/api";

interface ProductContextProps {
  products: Product[];
  filteredProducts: Product[];
  cart: Product[];
  highlight: Product | undefined;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  handleSearch: (searchTerm: string) => void;
  setHighlight: (product: Product | undefined) => void; // Corrigido
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [highlight, setHighlight] = useState<Product | undefined>(undefined); // Corrigido

  const productService = new ProductService();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
        if (data.length > 0) setHighlight(data[0]);
      } catch (error) {
        console.error("Erro ao carregar produtos", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => setCart((prevCart) => [...prevCart, product]);

  const removeFromCart = (productId: number) =>
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };


  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        cart,
        highlight,
        addToCart,
        removeFromCart,
        handleSearch,
        setHighlight, 
        }}
      >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProductContext must be used within a ProductProvider");
  return context;
};
