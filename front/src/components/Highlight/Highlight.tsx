import React from 'react'
import styles from "./Hightlight.module.css"
import ReactPlayer from 'react-player';


interface HighlightProps {
    nome: string;
    descricao: string;
    preco: number;
    imgSrc: string;     
    videoSrc:string;  
}

const Highlight:React.FC<HighlightProps> = ({nome, descricao, preco, imgSrc, videoSrc}) => {
  return (
    <div className={styles.hightlight}>
        
        <img src={imgSrc} id={styles.highlightImg} />
        <h2 id="highlight-title">{nome}</h2>
        <p id="highlight-info">{descricao}</p>
        <h3 id="highlight-price">${preco.toFixed(2)}</h3>
        {videoSrc ? (
          <ReactPlayer
          url={videoSrc}
          controls
          width="55em"
          height="36em"
        />
        ) : (
          <p></p>
        )}
    </div>
  )
}

export default Highlight