import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './CSS/App.css';
import Login from './Component/Login';
import Home from './Component/Home';
import  Map from './Component/Map';
  function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='Map' element={<Map/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
