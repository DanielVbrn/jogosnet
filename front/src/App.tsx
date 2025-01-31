import GameDetails from './components/GameDetails/GameDetails';
import HomePage from './pages/home/HomePage';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='home'></Navigate>}/>
        <Route path="/home" element={ <HomePage />} />
        <Route path="/home/game/:id" element={<GameDetails />} />
      </Routes>
    </Router>
  );
}
