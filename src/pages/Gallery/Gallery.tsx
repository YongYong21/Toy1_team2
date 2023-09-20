import React from 'react';
import Sidebar from '../../components/Aside/Sidebar';
import GalleryContent from '../../components/Gallery/GalleryContent';
import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
`;

export default function Gallery(): JSX.Element {
  return (
    <FlexBox>
      <Sidebar url="gallery" collectionName="gallery"></Sidebar>
      <GalleryContent></GalleryContent>
    </FlexBox>
  );
}
