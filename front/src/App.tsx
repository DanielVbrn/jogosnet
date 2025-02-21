import { Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import HomePage from './pages/home/HomePage';
import GameDetails from './components/GameDetails/GameDetails';
import './App.css'; 
import Header from './components/Header/Header';
import CartPage from './pages/cart/CartPage';

export default function App() {
  return (
    <ProductProvider>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/game/:id" element={<GameDetails />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </div>
    </ProductProvider>
  );
}
