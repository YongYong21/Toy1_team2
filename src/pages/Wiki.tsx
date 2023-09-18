import React from 'react';
import Sidebar from '../components/Aside/Sidebar';
import Content from '../components/Contents';
import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
`;
export default function Wiki(): JSX.Element {
  const url = 'wiki';
  return (
    <>
      {/* <Sidebar></Sidebar> */}
      <FlexBox>
        <Sidebar url={url}></Sidebar>
        <Content></Content>
      </FlexBox>
    </>
  );
}
