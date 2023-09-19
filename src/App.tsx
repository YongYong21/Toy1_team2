import { Routes, Route } from 'react-router-dom';
import Gallery from './pages/Gallery/Gallery';
import { Home } from './pages/Home/Home';
import { Header } from './components/Home/Header';

export default function App(): JSX.Element {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  );
}
