import { Routes, Route } from 'react-router-dom';
import Wiki from './pages/Wiki/Wiki';
import WikiEdit from './pages/Wiki/WikiEdit';
import { Header } from './components/Home/Header';

export default function App(): JSX.Element {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/Wiki/:id" element={<Wiki></Wiki>}></Route>
        <Route path="/Wiki/:id/edit" element={<WikiEdit></WikiEdit>}></Route>
      </Routes>
    </>
  );
}
