import React, { useEffect, useState } from 'react';
import { firestore } from '../../shared/api/firebase';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useAuthState } from '../../shared/contexts/AuthContext';

import {
  FlexDiv,
  ContentsContainer,
  CenterBorder,
  TitleDiv,
  TimeStampWrap,
  TimeStampDiv,
  ContentsDiv,
  StyledTextarea,
  ButtonDiv,
  EditBtn,
} from '../../styles/Wiki/EditContentsSC';

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
      alert('해당 기능은 로그인을 해야합니다.');
      navigate(newURL);
    }
  }, [authState, id]);

  /**
   * @param {string} markdownText - 마크다운 텍스트
   * @returns {JSX.Element} - 마크다운 뷰어 컴포넌트
   */
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

  /** 글 수정 내용 확인 */
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newText = e.target.value;
    setMarkdownText(newText);
  };
  /** 글 수정 버튼 클릭 */
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
