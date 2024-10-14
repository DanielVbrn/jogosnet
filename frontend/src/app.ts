import ProductUI from './UI/ProductUI';
import './styles/style.css'; // Certifique-se de que este caminho está correto
import './styles/stylecompra.css'; 

document.addEventListener('DOMContentLoaded', () => {
  const productUI = new ProductUI();
  productUI.initializeApp(); // Inicializa o carregamento dos produtos e os eventos da interface
});