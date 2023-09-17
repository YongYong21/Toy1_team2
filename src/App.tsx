import React from "react";
import { Routes, Route } from 'react-router-dom';
import CommuteModal from "./components/CommuteModal/commuteModal";
import Gallery from './pages/Gallery/Gallery';

function App(): JSX.Element {
  return (
    <div>
      <header>
        <CommuteModal /> {/* commuteModal 컴포넌트를 사용합니다. */}
      </header>
      <Routes>
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </div>
  );
}

export default App;
