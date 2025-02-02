import GameDetails from './components/GameDetails/GameDetails';
import { ProductProvider } from './context/ProductContext';
import HomePage from './pages/home/HomePage';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export default function App() {
  return (
    <ProductProvider>
      <Routes>
        <Route path='/' element={<Navigate to='home' />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/game/:id" element={<GameDetails />} />
      </Routes>
    </ProductProvider>
  );
}
