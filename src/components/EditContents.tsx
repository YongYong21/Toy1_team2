import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../api/firebase';
import { useParams, Link } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';
// import { theme } from '../styles/Theme';

const FlexDiv = styled.div`
  display: flex;
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }
`;
const ContentsContainer = styled.div`
  width: 50%;
  padding: 20px 30px 0px;
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
`;
const TimeStampDiv = styled.div`
  width: 800px;
  height: 30px;
  font-size: 16px;
  padding: 8px;
`;

const ContentsDiv = styled.div`
  padding: 8px;
`;
const StyledTextarea = styled.textarea`
  width: 800px;
  height: 500px;
  padding: 10px;
  font-size: 16px;
`;
interface ItemType {
  text: string;
  content: string;
  timeStamp: string;
  url: string;
}
function EditContent(): JSX.Element {
  const { id } = useParams();
  const [data, setData] = useState<ItemType | null>(null);
  const [idx, setIdx] = useState(0);
  const [docName, setDocName] = useState('');
  const [markdownText, setMarkdownText] = useState<string>('');
  const currentURL = window.location.href;
  const newURL = currentURL.replace(/\/edit$/, '');

  useEffect(() => {
    firestore
      .collection('sidebarMenu')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const items = doc.data().items;

          for (const [index, item] of items.entries()) {
            if (item.url === id) {
              setDocName(doc.id);
              setIdx(index);
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

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newText = e.target.value;
    setMarkdownText(newText);
  };

  const handleSaveClick = (): void => {
    // 업데이트할 문서의 참조 가져오기
    const docRef = firestore.collection('sidebarMenu').doc(docName);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const items = data?.items;
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const day = String(now.getDate()).padStart(2, '0');
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const time = `${year}-${month}-${day} ${hours}:${minutes}`;
          const itemIndex = idx;

          // 새로운 content 값으로 수정
          items[itemIndex].content = markdownText;
          items[itemIndex].timeStamp = time;
          // 수정된 items 배열을 다시 문서에 저장
          docRef
            .update({
              items,
            })
            .then(() => {
              console.log('content 수정 완료');
            })
            .catch((error) => {
              console.error('content 수정 중 오류 발생: ', error);
            });
        } else {
          console.log('문서가 존재하지 않습니다.');
        }
      })
      .catch((error) => {
        console.error('문서 가져오기 중 오류 발생: ', error);
      });
  };

  return (
    <FlexDiv>
      <ContentsContainer>
        <TitleDiv>{data?.text}</TitleDiv>
        <TimeStampWrap>
          <TimeStampDiv>글작성 날짜: {data?.timeStamp}</TimeStampDiv>
        </TimeStampWrap>
        <ContentsDiv>
          <StyledTextarea
            onChange={onChange}
            value={markdownText}
          ></StyledTextarea>
          <Link to={newURL}>
            <button onClick={handleSaveClick}>저장</button>
          </Link>
        </ContentsDiv>
      </ContentsContainer>

      <ContentsContainer>
        <TitleDiv>{data?.text}</TitleDiv>
        <TimeStampWrap>
          <TimeStampDiv>글작성 날짜: {data?.timeStamp}</TimeStampDiv>
        </TimeStampWrap>
        <ContentsDiv>
          <MarkdownViewer
            markdownText={markdownText !== '' ? markdownText : ''}
          />
        </ContentsDiv>
      </ContentsContainer>
    </FlexDiv>
  );
}

export default EditContent;
