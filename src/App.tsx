import React from "react";
import { Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery/Gallery";

export default function App() {
  return (
    <Routes>
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}
