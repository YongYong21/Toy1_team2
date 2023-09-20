import React from 'react';
import Sidebar from '../../components/Aside/Sidebar';
import Content from '../../components/Wiki/Contents';

import styled from 'styled-components';

const FlexBox = styled.div`
  margin-top: 56px;
  display: flex;
`;
export default function Wiki(): JSX.Element {
  const url = 'wiki';
  const collectionName = 'sidebarMenu';
  return (
    <>
      <FlexBox>
        <Sidebar url={url} collectionName={collectionName}></Sidebar>
        <Content></Content>
      </FlexBox>
    </>
  );
}
