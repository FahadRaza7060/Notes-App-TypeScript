import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Routes, Route } from 'react-router-dom';

function App() {

  const [token, setToken] = useState<string | false>(false);
  
  if(token) {
    localStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      let data = JSON.parse(localStorage.getItem('token') || '');
      setToken(data)
    }

  }, [])

  
  return (
    <>
      <Navbar token={token} />
      <Routes>
      {token ? <Route path='/notes' element={<Home />} /> : "" }
      <Route path='/' element={<SignUp />} />
      <Route path='/login' element={<Login setToken={setToken} />} />
      </Routes>
    </>
  );
}

export default App;
