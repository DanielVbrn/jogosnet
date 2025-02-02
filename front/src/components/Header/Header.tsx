import React from "react";
import { useProductContext } from "../../context/ProductContext";
import SearchBar from "../SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";

const Header: React.FC = () => {
  const { cart, handleSearch } = useProductContext();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="./">
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <nav>
          <ul>
            <li>
              <SearchBar onSearch={handleSearch} />
            </li>
            <li>
              <button className={styles.cartBtn}>
                <span className={styles.cartCount}>{cart.length}</span>
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <nav>
        <ul className={styles.navList}>
          <li><a href="/">Home</a></li>
          <li><a href="/about">Sobre</a></li>
          <li><a href="/contact">Contato</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
