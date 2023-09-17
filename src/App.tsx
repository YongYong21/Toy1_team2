import { Routes, Route, Link } from 'react-router-dom';
import Wiki from './pages/Wiki';

export default function App(): JSX.Element {
  return (
    <>
      <Link to="/wiki/rule">위키</Link>
      <Routes>
        <Route path="/Wiki/:id" element={<Wiki></Wiki>}></Route>
      </Routes>
    </>
  );
}
