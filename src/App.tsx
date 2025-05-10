import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './layout/Header';
import HomePage from './pages/HomePage'
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-gray-200">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
