import { Routes, Route } from 'react-router-dom';
import Gallery from './pages/Gallery/Gallery';

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}
