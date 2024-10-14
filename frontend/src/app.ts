import ProductUI from './UI/ProductUI';

document.addEventListener('DOMContentLoaded', () => {
  const productUI = new ProductUI();
  productUI.initializeApp(); // Inicializa o carregamento dos produtos e os eventos da interface
});