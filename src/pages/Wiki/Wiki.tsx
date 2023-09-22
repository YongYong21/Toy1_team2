import React, { useEffect } from 'react';
import Sidebar from '../../components/Aside/Sidebar';
import Content from '../../components/Wiki/Contents';
import { Footer } from '../../components/Footer/Footer';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const FlexBox = styled.div`
  min-height: 80vh;
  margin-top: 56px;
  margin-bottom: 56px;
  display: flex;
`;
const FooterContainer = styled.div`
  margin-left: 256px;
`;
export default function Wiki(): JSX.Element {
  const url = 'wiki';
  const collectionName = 'sidebarMenu';

  const page = [
    'rules',
    'information',
    'team',
    'read',
    'must-read',
    'ongoing',
    'scheduled',
    'completed',
    'suggestions',
  ];
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (typeof id === 'string' && !page.includes(id)) {
      navigate('/404');
    }
  }, [id, navigate]);

  return (
    <>
      <FlexBox>
        <Sidebar url={url} collectionName={collectionName}></Sidebar>
        <Content></Content>
      </FlexBox>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </>
  );
}
