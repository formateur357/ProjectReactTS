import TodoList from './components/TodoList';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  console.log('rendu App');

  return (
    <div className="grid-container">
      <Header />
      <main className="main-content">
        <TodoList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
