import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Homepage from './Homepage';
import Recipe from './Recipe';

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="/:recipeKey" element={ <Recipe /> } />
      </Routes>
    </main>
  );
}

export default App;
