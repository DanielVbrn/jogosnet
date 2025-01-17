import React from 'react'
import styles from "./Pagination.module.css"



interface PaginationProps {
    currentPage:number;
    onNextPage: () => void;
}


const Pagination:React.FC<PaginationProps> = ({currentPage, onNextPage}) => {

    

    return (
        <div className={styles.pagination}>
            <button onClick={onNextPage} id='view-more'>Ver mais</button>
        </div>
    )
}

export default Pagination