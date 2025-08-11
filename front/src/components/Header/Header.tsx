import React, { useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import SearchBar from "../SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { cart, handleSearch } = useProductContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        {/* Botão do menu hamburguer (Mobile) */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        {/* Logo */}
        <div className={styles.logo}>
          <a href="/">
            <img src={logo} alt="Logo" />
          </a>
        </div>

        {/* Navbar centralizada (Desktop) */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><a href="/">Home</a></li>
            <li><a href="/">Sobre</a></li>
            <li><a href="/">Contato</a></li>
          </ul>
        </nav>

        {/* Barra de pesquisa */}
        <div className={styles.searchBarContainer}>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Carrinho */}
        <button className={styles.cartBtn} onClick={() => navigate("/cart")}>
          <span className={styles.cartCount}>{cart.length}</span>
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>

        {/* Navbar lateral (Mobile) */}
        <nav className={`${styles.navMobile} ${menuOpen ? styles.navOpen : ""}`}>
          <ul className={styles.navList}>
            <li><a href="/">Home</a></li>
            <li><a href="/">Sobre</a></li>
            <li><a href="/">Contato</a></li>
          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;
