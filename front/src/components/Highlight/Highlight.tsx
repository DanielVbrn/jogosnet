import React from 'react'
import styles from "./Hightlight.module.css"


interface HighlightProps {
    nome: string;
    descricao?: string;
    preco: number;
    imgSrc: string;     
    videoSrc?:string;  
}

const Highlight:React.FC<HighlightProps> = ({nome, preco, imgSrc}) => {
  return (
    <div className={styles.hightlight}>
        
        <img src={imgSrc} id={styles.highlightImg} />
        <h2 id="highlight-title">{nome}</h2>
        <h3 id="highlight-price">${preco.toFixed(2)}</h3>
 
    </div>
  )
}

export default Highlight