import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Header from './component/Header';
import Home from './pages/Home';
import ProductPage from './pages/Product';
import {  useRecoilValue } from 'recoil';
import SigninCard from './pages/Signin';
import userAtom from './Atom/userAtom.js';
import SignupCard from './pages/Signup';
import ProductCard from './component/ProductCard';
import Dashboard from './pages/Profile';
import Cart from './component/Cart';
import Footer from './component/Footer';

function App() {
  const user = useRecoilValue(userAtom);
  return (
      <div className="min-h-screen bg-rose-50">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
          <Cart /> <Home />
          </>
          }/>
          <Route path="/profile" element={user?
            <>
           <Dashboard />
          </>:<Navigate to={'/Signin'}/>
          } />  
          <Route path="/Signin" element={!user?<SigninCard />:<Navigate to={"/"}/>} />
          <Route path="/SignUp" element={!user?<SignupCard />:<Navigate to={"/"}/>} />
          <Route path="/Add" element={!user?<SignupCard />:<ProductCard/>} />
          <Route path="/product/:id" element={
            <><ProductPage /><Cart /> </>} />
        </Routes>
        <Footer />

      </div>
  );
}

export default App;

