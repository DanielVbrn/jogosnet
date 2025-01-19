import React from 'react'
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import Product from '../../model/Product';

interface GameDetailsProps {
    products: Product[];
}


const GameDetails: React.FC<GameDetailsProps> = ({products}) => {
    const { id } = useParams< {id: string}>();
    const game = products.find((product) => product.id === Number(id));

    if (!game) {
        return <p>Jogo não encontrado!</p>;
    }

    return (
        <div>
            <h1>{game.nome}</h1>
            <p>{game.descricao}</p>
            <img src={game.imgSrc} alt="" />
            {game.videoSrc ? (
            <ReactPlayer
                url={game.videoSrc}
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

export default GameDetails