import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../api/firebase';
import { useParams, Outlet, Link } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';

const ContentsContainer = styled.div`
  width: 1280px;
  padding: 20px 30px 0px;
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
  padding: 8px;
`;
const StyledTextarea = styled.textarea`
  width: 800px; /* 원하는 너비를 지정하세요. */
  height: 500px; /* 원하는 높이를 지정하세요. */
  padding: 10px; /* 여백을 추가하세요. */
  font-size: 16px; /* 원하는 폰트 크기를 지정하세요. */
`;
function EditContent(): JSX.Element {
  const { id } = useParams();
  const [data, setData] = useState<any | null>(null); // Use a more specific type if possible
  const [idx, setIdx] = useState(0);
  const [docName, setDocName] = useState('');
  const [markdownText, setMarkdownText] = useState<string>('');
  const [toggleEdit, setToggleEdit] = useState(true);
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
              setIdx(index); // 해당 요소의 인덱스 출력
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
          // content를 수정하려는 배열 요소의 인덱스 (예: 첫 번째 요소를 수정하려면 0)
          const itemIndex = idx;

          // 새로운 content 값으로 수정
          items[itemIndex].content = markdownText;
          items[itemIndex].timeStamp = time;
          // 수정된 items 배열을 다시 문서에 저장
          docRef
            .update({
              items: items,
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
        <StyledTextarea
          onChange={onChange}
          value={markdownText}
        ></StyledTextarea>
        <MarkdownViewer
          markdownText={markdownText !== '' ? markdownText : ''}
        />
        <Link to={newURL}>
          <button onClick={handleSaveClick}>저장</button>
        </Link>
      </ContentsDiv>
      <Outlet></Outlet>
    </ContentsContainer>
  );
}

export default EditContent;
