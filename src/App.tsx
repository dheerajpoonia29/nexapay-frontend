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
import LogoutPage from './pages/LogoutPage';
import type { User } from './helper/TypeConstants';
import CreateAccountPage from './pages/CreateAccountPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BankingPage from './pages/BankingPage';
import Footer from './layout/Footer';
import { DeleteAccount } from './helper/DeleteAccount';
import TransactionPage from './pages/TransactionPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <div className="flex flex-col min-h-screen bg-gray-200">
        {isLoggedIn ? <WelcomePageHeader /> : <HomePageHeader />}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/welcome" element={<WelcomePage user={user} />} />
            <Route path="/account" element={<AccountPage user={user} />} />
            <Route path="/logout" element={<LogoutPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/create-account" element={<CreateAccountPage user={user} setUser={setUser} />} />
            <Route path="/banking" element={<BankingPage user={user} />} />
            <Route path="/banking/delete" element={<DeleteAccount user={user} setUser={setUser} />} />
            <Route path="/banking/transfer" element={<TransactionPage user={user} setUser={setUser} />} />
          </Routes>
        </div>
        <Footer />
      </div>

    </BrowserRouter >
  )
}

export default App
