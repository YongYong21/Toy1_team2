import { useEffect } from 'react';
import Sidebar from '../../components/Aside/Sidebar';
import GalleryContent from '../../components/Gallery/GalleryContent';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const FlexBox = styled.div`
  display: flex;
  margin-top: 56px;
`;

export default function Gallery(): JSX.Element {
  const page = ['facility', 'partner'];
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (typeof id === 'string' && !page.includes(id)) {
      navigate('/404');
    }
  });
  return (
    <FlexBox>
      <Sidebar url="gallery" collectionName="gallery"></Sidebar>
      <GalleryContent></GalleryContent>
    </FlexBox>
  );
}
