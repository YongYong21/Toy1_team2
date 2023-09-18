import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/LoginPage';
import Register from './pages/auth/RegisterPage';
import FindPwPage from './pages/auth/FindPwPage';
import AfterLogin from './pages/auth/AfterLogin';
import Gallery from './pages/Gallery/Gallery';
import { AuthContextProvider } from './contexts/AuthContext';
const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/findpw" element={<FindPwPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/after" element={<AfterLogin />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
