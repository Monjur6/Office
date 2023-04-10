import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './CSS/App.css';
import Login from './Component/Login';
import Home from './Component/Home';
import  Map from './Component/Map';
import Register from './Component/Register';
  function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='map' element={<Map/>}/>
        <Route path='register' element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
