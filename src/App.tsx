import './App.css'
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageHeader from './layout/HomePageHeader';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WelcomePage from './pages/WelcomePage';
import AccountPage from './pages/AccountPage';
import WelcomePageHeader from './layout/WelcomePageHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-gray-200">
        {isLoggedIn ? <WelcomePageHeader /> : <HomePageHeader />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
