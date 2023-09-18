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
// function 함수(): void {
// 생성하는 함수
// firestore.collection("sidebarMenu")
//   .add({
//     id: 0,
//     title: "회사생활",
//     items: [
//       { text: "회사 내규", content: '회사 내규', timeStamp: '2023-09-08 15:00', url:'rule'},
//       { text: "팀 소개", content: '팀 소개', timeStamp: '2023-09-08 15:00',url:'information'},
//       { text: "조직도", content: '조직도', timeStamp: '2023-09-08 15:00',url:'team'}
//     ]
//   })
//   .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch((error) => {
//     console.error("Error adding document: ", error);
//   });
// 가지고오기
// var docRef = firestore.collection("sidebarMenu").doc("test");
// docRef
//   .get()
//   .then((doc) => {
//     if (doc.exists) {
//       console.log("Document data:", doc.data());
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
//   })
//   .catch((error) => {
//     console.log("Error getting document:", error);
//   });
// }
// 함수();
function Contents(): JSX.Element {
  const { id } = useParams();
  const [data, setData] = useState<any | null>(null); // Use a more specific type if possible
  const [idx, setIdx] = useState(0);
  const [docName, setDocName] = useState('');
  const [markdownText, setMarkdownText] = useState<string>('');
  const [toggleEdit, setToggleEdit] = useState(true);
  // let item = [
  //   {
  //     text: '회사 내규',
  //     content: '회사 내규',
  //     timeStamp: '2023-09-08 15:00',
  //     url: 'rule',
  //   },
  //   {
  //     text: '팀 소개',
  //     content: '팀 소개',
  //     timeStamp: '2023-09-08 15:00',
  //     url: 'information',
  //   },
  //   {
  //     text: '조직도',
  //     content: '조직도',
  //     timeStamp: '2023-09-08 15:00',
  //     url: 'team',
  //   },
  // ];
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

  const handleSaveClick = (): void => {
    // 업데이트할 문서의 참조 가져오기
    const docRef = firestore.collection('sidebarMenu').doc(docName);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const items = data?.items;

          // content를 수정하려는 배열 요소의 인덱스 (예: 첫 번째 요소를 수정하려면 0)
          const itemIndex = idx;

          // 새로운 content 값으로 수정
          items[itemIndex].content = markdownText;

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
        <MarkdownViewer
          markdownText={data?.content !== undefined ? data.content : ''}
        />

        <button onClick={handleSaveClick}>저장</button>
      </ContentsDiv>
      <Outlet></Outlet>
    </ContentsContainer>
  );
}

export default Contents;
