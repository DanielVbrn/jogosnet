import { Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import HomePage from './pages/home/HomePage';
import GameDetails from './components/GameDetails/GameDetails';
import './App.css'; 
import Header from './components/Header/Header';

export default function App() {
  return (
    <ProductProvider>
        <div className="container">
          <Header/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<GameDetails />} />
          </Routes>
        </div>
    </ProductProvider>
  );
}
