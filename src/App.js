import './App.css';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Search from './pages/Search';
import Movie from './pages/Movie';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/search' element={<Search />}></Route>
      <Route path='/search/:movie' element={<Movie />}></Route>
      </Routes>
    </div>

    </Router>
  );
}

export default App;
