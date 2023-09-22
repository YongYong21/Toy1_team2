import React, { useEffect, useState, useRef } from 'react';

import firebase, { firestore } from '../../shared/api/firebase';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useAuthState } from '../../shared/contexts/AuthContext';
import { AiOutlineClose } from 'react-icons/ai';

import {
  ContentsContainer,
  TitleDiv,
  TimeStampWrap,
  TimeStampDiv,
  EditBtn,
  CancelBtn,
  AddBtn,
  ContentsDiv,
  PostDiv,
  PostTitleDiv,
  DimDiv,
  PostModal,
  PostTitleContainer,
  LabelDiv,
  Label,
  ButtonContainer,
  ModalContainer,
} from '../../styles/Wiki/ContentsSC';
interface ItemType {
  text: string;
  content: string;
  timeStamp: string;
  url: string;
}

interface PostType {
  title: string;
  contents: string;
  timeStamp: string;
  author: string;
  id: string;
}

function Contents(): JSX.Element {
  const { id } = useParams();
  const [data, setData] = useState<ItemType | null>(null);

  const [markdownText, setMarkdownText] = useState<string>('');
  const authState = useAuthState();

  const [post, setPost] = useState<PostType[]>([]);
  const [postState, setPostState] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContents, setPostContents] = useState('');
  const [username, setUsername] = useState<string>('사용자');
  const [toggleAddBtn, setToggleAddBtn] = useState(false);

  const outside = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  // URL
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    // 건의사항 페이지면
    if (id === 'suggestions') {
      const docRef = firestore.collection('post');
      docRef
        .get()
        .then((querySnapshot) => {
          const copy: PostType[] = [];
          querySnapshot.forEach((doc) => {
            copy.push(doc.data() as PostType);
          });
          setPost(copy);
          setPostState(true);
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
      // 유저 이름 가져오기
      firebase.auth().onAuthStateChanged((user) => {
        if (user !== null) {
          const displayName = user.displayName;
          setUsername(displayName ?? '사용자');
        }
      });
    } else {
      // 건의사항 페이지가 아니면 데이터 가져오기
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
                setPostState(false);
                return;
              }
            }
          });
        })
        .catch((error) => {
          console.error('Error fetching menu data:', error);
        });
    }
  }, [id]);

  // 글 수정 버튼 함수
  function handleClickEditBtn(): void {
    if (authState.state === 'loaded' && authState.isAuthentication) {
      navigate(`/wiki/${id}/edit`);
    } else if (authState.state === 'loaded' && !authState.isAuthentication) {
      alert('해당 기능은 로그인을 해야합니다.');
    }
  }
  // 글 작성 버튼 클릭
  function handleClickAddBtn(): void {
    // 로그인 확인
    if (authState.state === 'loaded' && authState.isAuthentication) {
      setToggleAddBtn(!toggleAddBtn);
    } else if (authState.state === 'loaded' && !authState.isAuthentication) {
      alert('해당 기능은 로그인을 해야합니다.');
    }
  }
  // 모달 타이틀 입력
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPostTitle(e.target.value);
  };
  // 모달 내용 입력
  const handleContentsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setPostContents(e.target.value);
  };
  // 모달 글작성 클릭
  const handlePostAddClick = (): void => {
    // 로그인 했는지 확인
    if (authState.state === 'loaded' && authState.isAuthentication) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const time = `${year}-${month}-${day} ${hours}:${minutes}`;
      const timeId = `${year}${month}${day}${hours}${minutes}${seconds}`;

      let errorTitleMessage = false;
      let errorContentsMessage = false;

      if (postTitle === '') {
        errorTitleMessage = true;
      }

      if (postContents === '') {
        errorContentsMessage = true;
      }

      if (errorTitleMessage || errorContentsMessage) {
        alert('값을 입력하지 않은 부분이 있습니다.');
        return;
      }
      const docRef = firestore.collection('post');
      // 추가 함수
      docRef
        .add({
          timeStamp: time,
          author: username,
          title: postTitle,
          contents: postContents,
          id: timeId,
        })
        .then(() => {
          const newPost = {
            timeStamp: time,
            author: username,
            title: postTitle,
            contents: postContents,
            id: timeId,
          };
          setPost([...post, newPost]);
          setToggleAddBtn(false);
          setPostTitle('');
          setPostContents('');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    } else if (authState.state === 'loaded' && !authState.isAuthentication) {
      alert('해당 기능은 로그인을 해야합니다.');
    }
  };
  // 모달 취소버튼 클릭
  const handleCancelClick = (): void => {
    setToggleAddBtn(false);
    setPostTitle('');
    setPostContents('');
  };
  // 모달 배경화면 클릭
  const handleModalClose = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (toggleAddBtn && outside.current === e.target) {
      setToggleAddBtn(false);
    }
  };
  /**
   * 삭제 버튼 클릭 핸들러
   * @param {string} id - 삭제할 아이템의 ID
   */
  const handleDeleteClick = (id: string): void => {
    if (authState.state === 'loaded' && authState.isAuthentication) {
      const checkDelete = window.confirm('삭제하시겠습니까?');
      if (checkDelete) {
        firestore
          .collection('post')
          .where('id', '==', id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              firestore
                .collection('post')
                .doc(doc.id)
                .delete()
                .then(() => {
                  const updatedPosts = post.filter(
                    (postItem) => postItem.id !== id,
                  );
                  setPost(updatedPosts);
                })
                .catch((error) => {
                  console.error('Error removing document: ', error);
                });
            });
          })
          .catch((error) => {
            console.log('Error getting documents: ', error);
          });
      }
    } else if (authState.state === 'loaded' && !authState.isAuthentication) {
      alert('해당 기능은 로그인을 해야합니다.');
    }
  };
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

  return (
    <>
      {postState ? (
        <>
          {toggleAddBtn ? (
            <>
              <ModalContainer>
                <DimDiv ref={outside} onClick={handleModalClose}></DimDiv>
                <PostModal>
                  <PostTitleContainer>
                    <h1>건의사항</h1>
                    <AiOutlineClose
                      onClick={handleCancelClick}
                    ></AiOutlineClose>
                  </PostTitleContainer>
                  <LabelDiv>
                    <Label>
                      <div>제목:</div>
                      <input
                        type="text"
                        value={postTitle}
                        onChange={handleTitleChange}
                      />
                    </Label>
                    <br />
                    <div>작성자: {username}</div>
                    <Label>
                      <div>내용:</div>
                      <textarea
                        value={postContents}
                        onChange={handleContentsChange}
                      />
                    </Label>
                  </LabelDiv>

                  <ButtonContainer>
                    <EditBtn onClick={handlePostAddClick}>글 작성</EditBtn>
                    <CancelBtn onClick={handleCancelClick}>취소하기</CancelBtn>
                  </ButtonContainer>
                </PostModal>
              </ModalContainer>
            </>
          ) : (
            ''
          )}
          <ContentsContainer>
            <TitleDiv>
              <h1>건의사항</h1>
            </TitleDiv>
            <AddBtn onClick={handleClickAddBtn}>글 작성</AddBtn>
            {post.length === 0 ? <h1>건의사항 글이 없습니다.</h1> : ''}
            {post.map((v: any, i: number) => {
              return (
                <PostDiv key={i}>
                  <PostTitleDiv>
                    {v.title}
                    <AiOutlineClose
                      onClick={() => {
                        handleDeleteClick(v.id);
                      }}
                    ></AiOutlineClose>
                  </PostTitleDiv>
                  <div>작성자: {v.author}</div>
                  <div>작성일: {v.timeStamp}</div>
                  <hr></hr>
                  <div>{v.contents}</div>
                </PostDiv>
              );
            })}
          </ContentsContainer>
        </>
      ) : (
        <ContentsContainer>
          <TitleDiv>
            <h1>{data?.text}</h1>
          </TitleDiv>
          <TimeStampWrap>
            <TimeStampDiv>글작성 날짜: {data?.timeStamp}</TimeStampDiv>
            <EditBtn onClick={handleClickEditBtn}>글 수정</EditBtn>
          </TimeStampWrap>
          <ContentsDiv>
            <MarkdownViewer markdownText={markdownText} />
          </ContentsDiv>
        </ContentsContainer>
      )}
    </>
  );
}

export default Contents;
