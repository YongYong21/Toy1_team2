import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
// import Gallery from "./pages/Gallery";
export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/gallery" element={<Gallery />} /> */}
      </Routes>
    </>
  );
}
