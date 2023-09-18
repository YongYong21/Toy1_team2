import React from 'react';
import EditContent from '../components/EditContents';
import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
`;
export default function WikiEdit(): JSX.Element {
  return (
    <>
      {/* <Sidebar></Sidebar> */}
      <FlexBox>
        <EditContent></EditContent>
      </FlexBox>
    </>
  );
}
