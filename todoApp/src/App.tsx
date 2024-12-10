import TodoList from './components/TodoList';
import Header from './components/Header';
import Footer from './components/Footer';
import './assets/styles/App.css';
import { Link, Route, Routes } from 'react-router-dom';
import TodoDetail from './components/TodoDetail';

function App() {
  console.log('rendu App');

  return (
    <div className="grid-container">
      <Header />
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/todos">Liste de Taches</Link>
          </li>
        </ul>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<TodoList />}></Route>
          <Route path="/todos/:id" element={<TodoDetail />}></Route>
          <Route path="/todos" element={<TodoList />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
