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
  setHighlight: (product: Product | undefined) => void; 
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [highlight, setHighlightState] = useState<Product | undefined>(undefined); 
  const [, setCartAlert] = useState("")


  const productService = new ProductService();

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const storedCart = localStorage.getItem("cart");
    const storedHighLight = localStorage.getItem("highlight");
  
    if (storedProducts) {
      const parseProducts = JSON.parse(storedProducts);
      setProducts(parseProducts);
      setFilteredProducts(parseProducts);
  
      if (storedHighLight && !highlight) {
        setHighlightState(JSON.parse(storedHighLight));
      }
    } else {
      fetchProducts();
    }
  
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  

  const fetchProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
  
      const storedHighLight = localStorage.getItem("highlight");
      if (!storedHighLight && data.length > 0) {
        setHighlightState(data[0]);
      }
  
      localStorage.setItem("products", JSON.stringify(data));
    } catch (error) {
      console.error("Erro ao carregar produtos", error);
    }
  };
  

  const setHighlight = (product: Product | undefined) => {
    setHighlightState(product);
  };
  

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (highlight) {
      localStorage.setItem("highlight", JSON.stringify(highlight));
    }
  }, [highlight]); 


  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); 
    setCartAlert("Seu item foi adicionado ao carrinho!");
    setTimeout(() => setCartAlert(""), 3000);
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

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
