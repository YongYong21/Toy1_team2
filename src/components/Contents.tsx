import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../api/firebase';
import { useParams, Link } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';

const ContentsContainer = styled.div`
  width: 1280px;
  padding: 20px 30px 0px;
  margin-left: 256px;
`;
const TitleDiv = styled.div`
  width: 1000px;
  height: 52px;
  font-size: 36px;
  padding: 8px;
  margin-bottom: 16px;
`;
const TimeStampWrap = styled.div`
  display: flex;
  margin-bottom: 16px;
`;
const TimeStampDiv = styled.div`
  width: 800px;
  height: 30px;
  font-size: 16px;
  padding: 8px;
`;
const EditBtn = styled.button``;
const ContentsDiv = styled.div`
  height: 2000px;
  padding: 8px;
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }
`;

interface ItemType {
  text: string;
  content: string;
  timeStamp: string;
  url: string;
}
function Contents(): JSX.Element {
  const { id } = useParams();
  const [data, setData] = useState<ItemType | null>(null);

  const [markdownText, setMarkdownText] = useState<string>('');
  const [toggleEdit, setToggleEdit] = useState(true);

  useEffect(() => {
    firestore
      .collection('sidebarMenu')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const items = doc.data().items;

          for (const item of items) {
            if (item.url === id) {
              setData(item);
              setMarkdownText(item.content);
              return;
            }
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching menu data:', error);
      });
  }, [id]);

  const MarkdownViewer = ({
    markdownText,
  }: {
    markdownText: string;
  }): JSX.Element => {
    return (
      <div>
        <MarkdownPreview source={markdownText} />
      </div>
    );
  };

  const handleEditBtn = (): void => {
    setToggleEdit(true);
  };
  return (
    <ContentsContainer>
      <TitleDiv>{data?.text}</TitleDiv>
      <TimeStampWrap>
        <TimeStampDiv>글작성 날짜: {data?.timeStamp}</TimeStampDiv>
        <Link to={`${window.location.pathname}/edit`}>
          {toggleEdit && <EditBtn onClick={handleEditBtn}>글 수정</EditBtn>}
        </Link>
      </TimeStampWrap>
      <ContentsDiv>
        <MarkdownViewer markdownText={markdownText} />
      </ContentsDiv>
    </ContentsContainer>
  );
}

export default Contents;
