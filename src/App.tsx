import './App.css'
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LogoutPage from './pages/LogoutPage';
import WelcomePage from './pages/WelcomePage';
import BankingPage from './pages/BankingPage';
import AccountPage from './pages/AccountPage';
import TransferPage from './pages/TransferPage';
import TransactionPage from './pages/TransactionPage';
import CreateAccountPage from './pages/CreateAccountPage';
import DeleteAccountPage from './pages/DeleteAccountPage';

import Footer from './layout/Footer';
import WelcomePageHeader from './layout/WelcomePageHeader';
import HomePageHeader from './layout/HomePageHeader';

import type { UserType, TransferType, BankType } from './helper/TypeConstants';

import 'react-toastify/dist/ReactToastify.css';
import { getBanks } from './client/BankClient';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState(false);
  
  const [user, setUser] = useState<UserType | null>(null);
  const [transactions, setTransactions] = useState<TransferType[] | null>([]);
  const [banks, setBanks] = useState<BankType[] | null>(null);

  const fetchBanks = async () => {
    console.log("fetching banks");
    const banksList = await getBanks();
    setBanks(banksList);
  };


  useEffect(() => {
    if (isLoggedIn === true) {
      fetchBanks();
    } else {
      setUser(null);
      setTransactions(null);
      setBanks(null);
    }
  }, [isLoggedIn]);

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
            <Route path="/account" element={<AccountPage user={user} setUser={setUser} />} />
            <Route path="/logout" element={<LogoutPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/create-account" element={<CreateAccountPage user={user} setUser={setUser} banks={banks} />} />
            <Route path="/banking" element={<BankingPage user={user} />} />
            <Route path="/banking/delete" element={<DeleteAccountPage user={user} setUser={setUser} />} />
            <Route path="/banking/transfer" element={<TransferPage user={user} setUser={setUser} setTransactions={setTransactions} />} />
            <Route path="/banking/transactions" element={
              <TransactionPage
                user={user}
                transactions={transactions}
                setTransactions={setTransactions}
                hasFetched={hasFetched}
                setHasFetched={setHasFetched}
              />
            } />
          </Routes>
        </div>
        <Footer />
      </div>

    </BrowserRouter >
  )
}

export default App
