<<<<<<< HEAD
import React from 'react';
import Sidebar from '../components/Aside/Sidebar';
import Content from '../components/Contents';
import styled from 'styled-components';
import { Routes, Route, Link } from 'react-router-dom';
=======
import React from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Contents";
import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
>>>>>>> parent of eb21fd2 (현재 작업 임시 저장: main git pull)

const FlexBox = styled.div`
  display: flex;
`;
export default function Wiki() {
  return (
    <>
<<<<<<< HEAD
      {/* <Sidebar></Sidebar> */}
=======
>>>>>>> parent of eb21fd2 (현재 작업 임시 저장: main git pull)
      <FlexBox>
        <Sidebar></Sidebar>
        <Content></Content>
      </FlexBox>
    </>
  );
}
