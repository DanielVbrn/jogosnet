import React from 'react'
import styles from "./SearchBar.module.css"


interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar:React.FC<SearchBarProps> = ({onSearch}) => {

    const handleSearch = () => {
        const searchInput = document.querySelector("#searchInput") as  HTMLInputElement;
        if (searchInput) onSearch(searchInput.value);
    }

    return (
        <div className={styles.searchBar}>
            <input id = {styles.searchInput} type="text" placeholder='Buscar jogos...'/>
            <button id={styles.searchBtn} onClick={handleSearch}>Buscar</button>
        </div>
    )
}

export default SearchBar