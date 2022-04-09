import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Home from './Home'
import Tenzies from './TenziesGame'
import Quizzical from './QuizzicalGame'



function App() {
  
  return (
    <Router>
      <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/tenzies' element={ <Tenzies /> } />
          <Route path='/quizzical' element={ <Quizzical /> } />
      </Routes>
    </Router>
  );
}

export default App;
