import React from "react";
import Sidebar from "./components/Sidebar";
import Content from "./components/Contents";
import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import Wiki from "./pages/Wiki"

const FlexBox = styled.div`
  display: flex;
`;
export default function App() {
  return (
    <>
      <Link to='/wiki/rule'>위키</Link>
      <Routes>
        <Route path="/Wiki/:id" element={<Wiki></Wiki>}></Route>  
      </Routes>
    </>
  );
}
