import React, { useEffect } from 'react';
import Sidebar from '../../components/Aside/Sidebar';
import EditContent from '../../components/Wiki/EditContents';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const FlexBox = styled.div`
  margin-top: 56px;
  display: flex;
`;
export default function WikiEdit(): JSX.Element {
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
  ];
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    if (typeof id === 'string' && !page.includes(id)) {
      navigate('/404');
    }
    console.log(id);
  }, [id, navigate]);

  return (
    <>
      <FlexBox>
        <Sidebar url={url} collectionName={collectionName}></Sidebar>
        <EditContent></EditContent>
      </FlexBox>
    </>
  );
}
