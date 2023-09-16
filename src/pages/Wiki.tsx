import React from 'react';
import Sidebar from '../components/Aside/Sidebar';
import Content from '../components/Contents';
import styled from 'styled-components';
import { Routes, Route, Link } from 'react-router-dom';

const FlexBox = styled.div`
  display: flex;
`;
export default function Wiki() {
  return (
    <>
      {/* <Sidebar></Sidebar> */}
      <FlexBox>
        <Sidebar></Sidebar>
        <Content></Content>
      </FlexBox>
    </>
  );
}
