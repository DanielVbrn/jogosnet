import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import Product from '../../model/Product';
import ProductService from "../../service/api";
import styles from "./GameDetails.module.css"


const GameDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [game, setGame] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const productService = new ProductService();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const products = await productService.getAllProducts();
                const foundGame = products.find((product: Product) => product.id === Number(id));
                if (foundGame) {
                    setGame(foundGame);
                } else {
                    setError('Jogo não encontrado.');
                }
            } catch (err) {
                console.error('Erro ao buscar produtos:', err);
                setError('Erro ao buscar produtos.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.gameDetails}>
            {game && (
                <>
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
                        <p>Sem vídeo disponível.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default GameDetails;
