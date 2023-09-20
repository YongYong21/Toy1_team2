import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../../api/firebase';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { theme } from '../../styles/Theme';
import { useAuthState } from '../../contexts/AuthContext';

const ContentsContainer = styled.div`
  min-width: 1080px;
  width: 1280px;
  padding: 20px 30px 0px;
  margin-left: 256px;
`;
const TitleDiv = styled.div`
  height: 52px;
  font-size: 36px;
  padding: 8px;
  margin-bottom: 16px;
`;
const TimeStampWrap = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
  align-items: center;
`;
const TimeStampDiv = styled.div`
  width: 80%;
  height: 30px;
  font-size: 16px;
  padding: 8px;
`;
const EditBtn = styled.button`
  color: white;
  min-width: 92px;
  height: 48px;
  font-size: ${theme.textStyles.button.fontSize};
  line-height: ${theme.textStyles.button.lineHeight};
  background-color: ${theme.blue700};
  border-radius: 12px;
  padding: 12px 32px;
  transition: all 0.3s;
  &:hover {
    background-color: ${theme.blue800};
    color: #fefefe;
  }
`;
const ContentsDiv = styled.div`
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
  const authState = useAuthState();

  const navigate = useNavigate();
  // URL
  const currentURL = window.location.href;
  const newURL = currentURL
    .replace('http://localhost:3000', '')
    .concat('/edit');

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

  // 글 수정 버튼 함수
  function handleClickEditBtn(): void {
    if (authState.state === 'loaded' && authState.isAuthentication) {
      navigate(newURL);
    } else if (authState.state === 'loaded' && !authState.isAuthentication) {
      alert('글수정 기능은 로그인을 해야합니다.');
    }
  }

  // 마크다운뷰어
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

  return (
    <ContentsContainer>
      <TitleDiv>{data?.text}</TitleDiv>
      <TimeStampWrap>
        <TimeStampDiv>글작성 날짜: {data?.timeStamp}</TimeStampDiv>
        <EditBtn onClick={handleClickEditBtn}>글 수정</EditBtn>
      </TimeStampWrap>
      <ContentsDiv>
        <MarkdownViewer markdownText={markdownText} />
      </ContentsDiv>
    </ContentsContainer>
  );
}

export default Contents;
