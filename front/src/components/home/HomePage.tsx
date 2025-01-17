import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Highlight from "../Highlight/Highlight";
import ProductGrid from "../ProductGrid/ProductGrid";
import SearchBar from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import Product from "../../model/Product";
import styles from "./HomePage.module.css";
import ProductService from "../../service/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const HomePage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [highlight, setHighlight] = useState({
    nome: "",
    descricao: "",
    preco: 0,
    imgSrc: "",
    videoSrc: "",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productService = new ProductService();

  const fetchProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);

      if(data.length > 0) {
        const first = data[0];
        setHighlight({
          nome:first.nome,
          descricao:first.descricao,
          preco:first.preco,
          imgSrc: first.imgSrc,
          videoSrc: first.videoSrc
        })
      }
    } catch (error) {
      console.error("Erro ao carregar produtos", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateHighlight = (
    nome: string,
    descricao: string,
    preco: number,
    imgSrc: string,
    videoSrc:string
  ) => {
    setHighlight({ nome, descricao, preco, imgSrc,  videoSrc});
  };

  const handleSearch = (searchTerm: string) => {
    // Adicionar lógica para buscar produtos
    console.log("Buscando por:", searchTerm);
  };

  const loadMoreProducts = () => {
    setCurrentPage(currentPage => currentPage + 1)
  };

  const cartTotal = cart.reduce((total, item) => total + item.preco, 0);

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <h1>
              <a href="./">GAMER CIRCLE</a>
            </h1>
          </div>
          <nav>
            <ul>
              <li>
                <SearchBar onSearch={handleSearch}/>
              </li>
              <li>
                <button className={styles.cartBtn}>
                <FontAwesomeIcon icon={faShoppingCart} />                  <span className={styles.cartCount}>{cart.length}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Seção de destaque */}
      <section className={styles.hero}>
        <Highlight
          nome={highlight.nome}
          descricao={highlight.descricao}
          preco={highlight.preco}
          imgSrc={highlight.imgSrc}
          videoSrc={highlight.videoSrc}
        />
      </section>

      {/* Carrinho */}
      <div id={styles.cartContainer} style={{ display: cart.length > 0 ? "block" : "none" }}>
        <Cart cart={cart} removeFromCart={removeFromCart} total={cartTotal} />
      </div>

      {/* Produtos */}
      <section className={styles.gameGrid}>
        <ProductGrid
          products={products}
          addToCart={addToCart}
          updateHighlight={updateHighlight}
        />
      </section>

      {/* Paginação */}
      <div className={styles.viewMoreContainer}>
        <Pagination currentPage={currentPage} onNextPage={loadMoreProducts} />
      </div>

      {/* Rodapé */}
      <footer className={styles.footer}>
        <p>&copy; 2024 Gamer Circle. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
