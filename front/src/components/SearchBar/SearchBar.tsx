import React, { useRef, useState } from 'react'
import styles from "./SearchBar.module.css"


interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar:React.FC<SearchBarProps> = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState("");
    
    const inputRef =  useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        if (inputRef.current) {
          const searchTerm = inputRef.current.value.trim(); // Remove espaços extras
          if (searchTerm) {
            onSearch(searchTerm);
          } else {
            console.warn("Digite algo para buscar.");
          }
        }
      };

    const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => { 
        const term = event.target.value.trim();   
        setSearchTerm(term);
        onSearch(term);
    }

    return (
        <div className={styles.searchBar}>
            <input 
                className={styles.searchInput} 
                type="text" 
                placeholder='Buscar jogos...' 
                value={searchTerm}
                onChange={handleInputSearch}
            />
            <button id={styles.searchBtn} onClick={handleSearch}>Buscar</button>
        </div>
    )
}

export default SearchBar