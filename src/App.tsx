import React from 'react';
import { AuthContextProvider } from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Home/Header';
import { Home } from './pages/Home/Home';
import Login from './pages/Authentication/LoginPage';
import Register from './pages/Authentication/RegisterPage';
import FindPwPage from './pages/Authentication/FindPwPage';
import Gallery from './pages/Gallery/Gallery';

export default function App(): JSX.Element {
  return (
    <AuthContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/findpw" element={<FindPwPage />} />
      </Routes>
    </AuthContextProvider>
  );
}
