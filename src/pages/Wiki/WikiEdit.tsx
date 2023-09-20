import React from 'react';
import Sidebar from '../../components/Aside/Sidebar';
import EditContent from '../../components/Wiki/EditContents';
import styled from 'styled-components';

const FlexBox = styled.div`
  margin-top: 56px;
  display: flex;
`;
export default function WikiEdit(): JSX.Element {
  const url = 'wiki';
  const collectionName = 'sidebarMenu';
  return (
    <>
      <FlexBox>
        <Sidebar url={url} collectionName={collectionName}></Sidebar>
        <EditContent></EditContent>
      </FlexBox>
    </>
  );
}