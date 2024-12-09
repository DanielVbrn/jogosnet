import Product from './product';
import './styles/style.css'; // Certifique-se de que este caminho está correto
import './styles/stylecompra.css'; 
import "./styles/checkout_style.css"
import ProductUI from './UI/ProductUI';

document.addEventListener('DOMContentLoaded', async () => {
    const productUI = new ProductUI();
    
    // Define o updateHighlight no window de maneira segura
    (window as any).updateHighlight = productUI.updateHighlight.bind(productUI);
    
    // Atualizar o carrinho na interface
    productUI.updateCartDisplay();
    
    // Redireciona ao clicar no ícone do carrinho
    const cartBtn = document.getElementById('cart-btn');
    cartBtn?.addEventListener('click', () => {
        console.log('Carrinho clicado!');
        window.location.href = './checkout.html'; // Redireciona para a página de checkout
    });

    // Adiciona um item ao carrinho ao clicar no botão


    // Inicializar a aplicação
    await productUI.initializeApp();
});
