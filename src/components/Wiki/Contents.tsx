import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import firebase, { firestore } from '../../api/firebase';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { theme } from '../../styles/Theme';
import { useAuthState } from '../../contexts/AuthContext';
import { AiOutlineClose } from 'react-icons/ai';

const ContentsContainer = styled.div`
  min-width: 1080px;
  width: 1280px;
  padding: 20px 30px 0px;
  margin-left: 256px;
`;
const TitleDiv = styled.div`
  font-size: ${theme.textStyles.subtitle1.fontSize};
  line-height: ${theme.textStyles.subtitle1.lineHeight};
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
const CancelBtn = styled.button`
  color: ${theme.gray700};
  min-width: 92px;
  height: 48px;
  font-size: ${theme.textStyles.button.fontSize};
  line-height: ${theme.textStyles.button.lineHeight};
  background-color: ${theme.gray200};
  border-radius: 12px;
  padding: 12px 32px;
  transition: all 0.3s;
  &:hover {
    background-color: ${theme.gray400};
  }
`;
const AddBtn = styled.button`
  color: white;
  min-width: 92px;
  height: 48px;
  margin-right: auto;
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
  float: right;
`;
const ContentsDiv = styled.div`
  padding: 8px;
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }
  &:hover {
  }
`;
const PostDiv = styled.div`
  width: 70%;
  margin: 0px 16px 16px;
  padding: 16px;
  border: 1px solid black;
  border-radius: 8px;
  & > div {
    margin-bottom: 16px;
  }
  & > div:first-child {
    font-size: ${theme.textStyles.subtitle3.fontSize};
    line-height: ${theme.textStyles.subtitle3.lineHeight};
  }
`;
const PostTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.textStyles.subtitle1.fontSize};
  line-height: ${theme.textStyles.subtitle1.lineHeight};
  svg {
    cursor: pointer;
  }
`;
const DimDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  justify-content: center;
  align-items: center;
`;
const PostModal = styled.div`
  width: 800px;
  background-color: white;
  position: fixed;
  margin: 32px auto;
  textarea {
    resize: none;
  }
`;
const PostTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.textStyles.subtitle2.fontSize};
  line-height: ${theme.textStyles.subtitle2.lineHeight};
  padding: 16px;
  border: 1px solid ${theme.gray300};
  svg {
    cursor: pointer;
  }
`;
const LabelDiv = styled.div`
  padding: 16px;
  div {
    margin-bottom: 8px;
    font-size: ${theme.textStyles.body1.fontSize};
    line-height: ${theme.textStyles.body1.lineHeight};
  }
`;
const Label = styled.label`
  input {
    margin-bottom: 16px;
    border: 1px solid #ccc;
    padding: 8px;
    outline-color: ${theme.blue600};
  }

  textarea {
    border: 1px solid #ccc;
    padding: 8px;
    width: 100%;
    height: 150px;
    outline-color: ${theme.blue600};
  }
`;
const ButtonContainer = styled.div`
  margin: 32px 0;

  padding: 16px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;
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

  const outside = useRef(null);
  const navigate = useNavigate();
  // URL
  useEffect(() => {
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

      firebase.auth().onAuthStateChanged((user) => {
        if (user !== null) {
          const displayName = user.displayName;
          setUsername(displayName ?? '사용자');
        } else {
          console.log('Signed Out'); // 로그인 안 됐을 때
        }
      });
    } else {
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
      alert('글수정 기능은 로그인을 해야합니다.');
    }
  }
  function handleClickAddBtn(): void {
    setToggleAddBtn(!toggleAddBtn);
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
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPostTitle(e.target.value);
  };

  const handleContentsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setPostContents(e.target.value);
  };

  // 건의사항
  const handleAddClick = (): void => {
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

      const docRef = firestore.collection('post');
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
      alert('글수정 기능은 로그인을 해야합니다.');
    }
  };

  const handleCancelClick = (): void => {
    setToggleAddBtn(false);
    setPostTitle('');
    setPostContents('');
  };
  const handleModalClose = (e: React.MouseEvent): void => {
    if (toggleAddBtn && outside.current === e.target) {
      setToggleAddBtn(false);
    }
  };
  const handleDeleteClick = (id: string): void => {
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
              console.log('Document successfully deleted!');
            })
            .catch((error) => {
              console.error('Error removing document: ', error);
            });
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  };
  return (
    <>
      {postState ? (
        <>
          {toggleAddBtn ? (
            <DimDiv ref={outside} onClick={handleModalClose}>
              <PostModal>
                <PostTitleContainer>
                  건의사항
                  <AiOutlineClose onClick={handleCancelClick}></AiOutlineClose>
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
                  <EditBtn onClick={handleAddClick}>글 작성</EditBtn>
                  <CancelBtn onClick={handleCancelClick}>취소하기</CancelBtn>
                </ButtonContainer>
              </PostModal>
            </DimDiv>
          ) : (
            ''
          )}
          <ContentsContainer>
            {post.length === 0 ? <h1>건의사항 글이 없습니다.</h1> : ''}
            <AddBtn onClick={handleClickAddBtn}>글 작성</AddBtn>
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
          <TitleDiv>{data?.text}</TitleDiv>
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
