import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firestore } from '../../api/firebase';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { theme } from '../../styles/Theme';
import { useAuthState } from '../../contexts/AuthContext';

const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  margin-left: 256px;
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }
  textarea {
    resize: none;
  }
`;
const ContentsContainer = styled.div`
  width: 85vh;
  position: relative;
  padding: 20px 30px 0px;
`;
const CenterBorder = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  background-color: ${theme.gray500};
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
  height: 30px;
  font-size: 16px;
  padding: 8px;
`;

const ContentsDiv = styled.div`
  height: 75vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 8px;
`;
const StyledTextarea = styled.textarea`
  min-width: 100%;
  height: 70vh;
  padding: 10px;
  font-size: 16px;
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
`;
const EditBtn = styled.button`
  min-width: 92px;
  height: 48px;
  font-size: ${theme.textStyles.button.fontSize};
  line-height: ${theme.textStyles.button.lineHeight};
  border-radius: 12px;
  padding: 12px 32px;
  transition: all 0.3s;
  /* 첫 번째 버튼 스타일 */
  &.btn1 {
    color: white;
    background-color: ${theme.blue700};
    &:hover {
      background-color: ${theme.blue800};
    }
  }

  /* 두 번째 버튼 스타일 */
  &.btn2 {
    color: ${theme.gray700};
    background-color: ${theme.gray200};
    &:hover {
      background-color: ${theme.gray400};
    }
  }
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

  // authState
  const authState = useAuthState();
  const currentURL = window.location.href;

  // URL
  const newURL = currentURL
    .replace(/\/edit$/, '')
    .replace('http://localhost:3000', '');
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 여부 확인
    if (authState.state === 'loaded' && authState.isAuthentication) {
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
    } else if (authState.state === 'loaded' && !authState.isAuthentication) {
      alert('글수정 기능은 로그인을 해야합니다.');
      navigate(newURL);
    }
  }, [authState, id]);

  // 마크다운 프리뷰
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
              navigate(newURL);
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
  const handleAddClick = (): void => {
    const docRef = firestore.collection('post');
    docRef
      .add({
        title: '제목2',
        contents: '본문2',
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
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
        </ContentsDiv>
        <ButtonDiv>
          <EditBtn className="btn1" onClick={handleSaveClick}>
            글 수정
          </EditBtn>
          <Link to={newURL}>
            <EditBtn className="btn2">취소</EditBtn>
          </Link>
          <EditBtn className="btn1" onClick={handleAddClick}>
            글 작성
          </EditBtn>
        </ButtonDiv>
      </ContentsContainer>

      <ContentsContainer>
        <CenterBorder></CenterBorder>
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
